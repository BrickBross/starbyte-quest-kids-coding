const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { spawn } = require('node:child_process');
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const server = http.createServer((req, res) => {
  const name = decodeURIComponent(req.url.split('?')[0]);
  const file = path.join(process.cwd(), name === '/' ? 'index.html' : name);
  try {
    res.setHeader('Content-Type', ({ '.svg':'image/svg+xml', '.js':'application/javascript', '.css':'text/css', '.json':'application/json' })[path.extname(file)] || 'text/html');
    res.end(fs.readFileSync(file));
  } catch { res.writeHead(404); res.end(); }
});
async function main() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const runId = `${Date.now()}-${process.pid}`;
  const profile = path.join(process.cwd(), '.browser-test-e2e-'+runId);
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--disable-gpu', '--no-first-run', '--remote-debugging-port=0', '--remote-allow-origins=*',
    '--user-data-dir=' + profile, 'about:blank'
  ], { stdio:'ignore' });
  let socket,closeBrowser; const results = []; const errors = []; const dialogReplies=[]; const dialogLog=[]; const controlIds=new Set(); let dragData=null;
  try {
    let tabs;
    for (let attempt=0; attempt<40; attempt++) {
      try { const port=fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').split('\n')[0];tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; }
      catch { await pause(250); }
    }
    if (!tabs) throw Error('Chrome debugger unavailable');
    socket = new WebSocket(tabs.find(tab => tab.type === 'page').webSocketDebuggerUrl);
    await new Promise(resolve => socket.addEventListener('open', resolve));
    let sequence=0; const pending=new Map();
    socket.addEventListener('message', event => {
      const message=JSON.parse(event.data);
      if (message.id) { pending.get(message.id)?.(message); pending.delete(message.id); }
      if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails);
      if (message.method === 'Input.dragIntercepted') dragData=message.params.data;
      if (message.method === 'Page.javascriptDialogOpening') {
        const details=message.params;dialogLog.push(details);
        const reply=dialogReplies.shift() || {accept:true};
        if(reply.math){const m=details.message.match(/What is (\d+) ([+-]) (\d+)/);reply.promptText=m?String(m[2]==='+'?Number(m[1])+Number(m[3]):Number(m[1])-Number(m[3])):'';delete reply.math;}
        call('Page.handleJavaScriptDialog',reply).catch(()=>{});
      }
    });
    const call=(method, params={}, sessionId)=>new Promise((resolve,reject)=>{
      const id=++sequence;
      const timer=setTimeout(()=>{pending.delete(id);reject(Error('Timed out: '+method));},10000);
      pending.set(id,message=>{clearTimeout(timer);message.error?reject(Error(JSON.stringify(message.error))):resolve(message.result);});
      socket.send(JSON.stringify({id,method,params,...(sessionId?{sessionId}:{})}));
    });
    closeBrowser=()=>call('Browser.close');
    const read=async expression=>{
      const result=await call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});
      if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));
      return result.result.value;
    };
    const readGame=async expression=>{
      const tree=await call('Page.getFrameTree');
      const doc=await call('DOM.getDocument');
      const node=await call('DOM.querySelector',{nodeId:doc.root.nodeId,selector:'#gameFrame'});
      const description=await call('DOM.describeNode',{nodeId:node.nodeId});
      const frameId=description.node.frameId;
      const frame=tree.frameTree.childFrames?.find(child=>child.frame.id===frameId);
      let result;
      if (frame) {
        const world=await call('Page.createIsolatedWorld',{frameId:frame.frame.id,worldName:'e2e-read'});
        result=await call('Runtime.evaluate',{expression,contextId:world.executionContextId,returnByValue:true});
      } else {
        const targets=await call('Target.getTargets');
        const target=targets.targetInfos.find(target=>target.targetId===frameId);
        if(!target)throw Error('Missing game target: '+JSON.stringify(targets.targetInfos));
        const session=await call('Target.attachToTarget',{targetId:target.targetId,flatten:true});
        result=await call('Runtime.evaluate',{expression,returnByValue:true},session.sessionId);
        await call('Target.detachFromTarget',{sessionId:session.sessionId});
      }
      if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));
      return result.result.value;
    };
    const check=async(name,expression)=>{
      const value=await read(expression);results.push({name,passed:!!value});
      if(!value)throw Error('FAIL: '+name);
    };
    // Use hit-tested pointer input and keyboard input, not element.click or game helpers.
    const click=async selector=>{
      let point;
      try {
        point=await read(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});if(!el)throw Error('Missing control: '+${JSON.stringify(selector)});el.scrollIntoView({block:'center',behavior:'instant'});const r=el.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2;const hit=document.elementFromPoint(x,y);if(!hit||!el.contains(hit))throw Error('Control covered: '+${JSON.stringify(selector)}+' by '+hit?.tagName+'#'+hit?.id+' at '+x+','+y);return {x,y,id:el.id};})()`);
      } catch(error) {
        const screenshot=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync('e2e-failure.png',Buffer.from(screenshot.data,'base64'));throw error;
      }
      if(point.id)controlIds.add(point.id);delete point.id;
      await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...point});
      await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...point});
      await pause(100);
    };
    const type=async(selector,text)=>{await click(selector);await call('Input.dispatchKeyEvent',{type:'keyDown',key:'a',code:'KeyA',modifiers:2,commands:['selectAll']});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'a',code:'KeyA',modifiers:2});await call('Input.insertText',{text});};
    const select=async(selector,value)=>{
      const index=await read(`Array.from(document.querySelector(${JSON.stringify(selector)}).options).findIndex(option=>option.value===${JSON.stringify(value)})`);
      if(index<0)throw Error('Missing select value '+value);
      await click(selector);
      for(const key of ['Home',...Array(index).fill('ArrowDown'),'Enter']) {
        await call('Input.dispatchKeyEvent',{type:'keyDown',key});await call('Input.dispatchKeyEvent',{type:'keyUp',key});
      }
      await pause(120);
    };
    await call('Runtime.enable');await call('Page.enable');await call('Network.enable');
    await call('Network.setBypassServiceWorker',{bypass:true});await call('Network.setCacheDisabled',{cacheDisabled:true});
    await call('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
    await call('Page.navigate',{url:origin+'/'});await pause(600);
    await read(`(async()=>{for(const registration of await navigator.serviceWorker.getRegistrations())await registration.unregister();for(const name of await caches.keys())await caches.delete(name);})()`);
    await read('localStorage.clear();location.reload()');await pause(600);
    await click('#startBtn');
    await click('#profilesBtn');await check('Profile chooser opens',`document.querySelector('#profilesModal').classList.contains('show')`);
    await type('#newProfileName','Mia');await click('#addProfileBtn');
    await check('Adding Mia selects the child and closes chooser',`document.querySelector('#profilesBtn').textContent.includes('Mia') && !document.querySelector('#profilesModal').classList.contains('show')`);
    const mia=await read(`Object.values(JSON.parse(localStorage.getItem('starbyteQuest.v1')).profilesById).find(profile=>profile.name==='Mia').id`);
    await click('#profilesBtn');await click('[data-switch="default"]');
    await check('Can switch back to Default',`document.querySelector('#profilesBtn').textContent.includes('Default')`);
    await click('#profilesBtn');
    await click(`[data-switch="${mia}"]`);
    await check('Choosing Mia changes saved active profile',`JSON.parse(localStorage.getItem('starbyteQuest.v1')).activeProfileId===${JSON.stringify(mia)}`);
    await check('Choosing profile closes chooser',`!document.querySelector('#profilesModal').classList.contains('show')`);
    await check('Chosen child is visible in the main interface',`document.querySelector('#profilesBtn').textContent.includes('Mia')`);
    await check('Chosen profile has a fresh pack and lesson',`document.querySelector('#agePackSelect').value==='7-8' && document.querySelector('#levelTitle').textContent.includes('Level 1') && document.querySelector('#codeBox').value===''`);
    await type('#codeBox','say("One");say("Two");say("Three");');await click('#runBtn');await pause(250);
    await check('Mia can complete a quest through the UI',`!document.querySelector('#nextBtn').disabled`);
    await click('#nextBtn');
    await check('Next quest is empty and teaches a new idea',`document.querySelector('#levelTitle').textContent.includes('Level 2') && document.querySelector('#codeBox').value===''`);
    await click('#worldsBtn');await click('[data-world="space"]');
    await click('#exploreMenu > summary');await click('#avatarBtn');
    await check('Avatar chooser opens',`document.querySelector('#avatarModal').classList.contains('show')`);
    await click('#avatarGrid .dashCard:first-child button:nth-child(3)');
    await click('#closeAvatarBtn');
    const face=await readGame(`document.querySelector('.face').textContent`);
    results.push({name:'Choosing avatar updates the sandbox hero',passed:face==='😎'});if(face!=='😎')throw Error('Avatar did not update hero');
    await click('#profilesBtn');await type('#newProfileName','Leo');await select('#newProfileAge','4-5');await click('#addProfileBtn');
    const leo=await read(`Object.values(JSON.parse(localStorage.getItem('starbyteQuest.v1')).profilesById).find(profile=>profile.name==='Leo').id`);
    await check('Leo starts with selected blocks pack and independent progress',`document.querySelector('#profilesBtn').textContent.includes('Leo') && document.querySelector('#agePackSelect').value==='4-5' && JSON.parse(localStorage.getItem('starbyte_quest_profile_'+${JSON.stringify(leo)})).progressStars===0`);
    await click('#blocksPalette [data-type="say"]');await click('#runBtn');await pause(250);
    await check('Block quest completes by picking a block and running',`!document.querySelector('#nextBtn').disabled`);
    await click('#profilesBtn');await click(`[data-switch="${mia}"]`);
    await check('Returning to Mia restores pack, next lesson and world',`document.querySelector('#profilesBtn').textContent.includes('Mia') && document.querySelector('#agePackSelect').value==='7-8' && document.querySelector('#levelTitle').textContent.includes('Level 2') && document.querySelector('#themeSelect').value==='space'`);
    await check('Each child keeps exactly their own earned star',`JSON.parse(localStorage.getItem('starbyte_quest_profile_'+${JSON.stringify(mia)})).progressStars===1 && JSON.parse(localStorage.getItem('starbyte_quest_profile_'+${JSON.stringify(leo)})).progressStars===1`);
    await call('Page.reload');await pause(600);await click('#startBtn');
    await check('Reload retains chosen player, pack and next lesson',`document.querySelector('#profilesBtn').textContent.includes('Mia') && document.querySelector('#agePackSelect').value==='7-8' && document.querySelector('#levelTitle').textContent.includes('Level 2')`);
    await type('#codeBox','setColor("blue");');await click('#copyStarterBtn');
    await check('Clue preserves the child’s code',`document.querySelector('#codeBox').value==='setColor("blue");' && document.querySelector('.missionHint').open`);
    await click('#settingsMenu > summary');await click('#shareBtn');await click('#exportLinkBtn');
    await check('Share button exports a creation link',`document.querySelector('#shareBox').value.includes('#share=')`);
    await click('#importLinkBtn');
    await check('Share link import restores the written program',`document.querySelector('#codeBox').value==='setColor("blue");' && !document.querySelector('#shareModal').classList.contains('show') && document.querySelector('#profilesBtn').textContent.includes('Mia')`);
    await click('#exploreMenu > summary');await click('#dailyBtn');await click('#startDailyBtn');
    await check('Daily challenge starts from its UI',`document.querySelector('#startDailyBtn').disabled && document.querySelector('#dailyStatus').textContent.length>0`);
    await click('#closeDailyBtn');
    await click('#exploreMenu > summary');await click('#trophiesBtn');
    await check('Trophy cabinet renders from its UI',`document.querySelector('#trophiesModal').classList.contains('show') && document.querySelector('#trophiesGrid').children.length>0`);
    await click('#closeTrophiesBtn');
    await click('#exploreMenu > summary');await click('#makerBtn');await select('#makerKind','starCatch');await click('#makerRunBtn');
    await pause(600);
    const target=await readGame(`(()=>{const target=Array.from(document.querySelectorAll('button')).find(button=>button.textContent==='⭐');if(!target)return null;const r=target.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2};})()`);
    results.push({name:'Maker Star Catch creates stars rather than targets',passed:!!target});if(!target)throw Error('Star Catch has no star targets');
    await click('#gameFrame');
    const frameRect=await read(`(()=>{const r=document.querySelector('#gameFrame').getBoundingClientRect();return{x:r.left,y:r.top};})()`);
    await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,x:frameRect.x+target.x,y:frameRect.y+target.y});
    await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,x:frameRect.x+target.x,y:frameRect.y+target.y});
    const score=await readGame(`document.querySelector('#play').textContent`);
    results.push({name:'Clicking a Maker star scores a point',passed:/Score: [1-9]/.test(score)});if(!/Score: [1-9]/.test(score))throw Error('Maker did not score click');
    // Repeat the chooser with a phone viewport and genuine pointer hits.
    await call('Emulation.setDeviceMetricsOverride',{width:375,height:900,deviceScaleFactor:1,mobile:true});
    await click('#profilesBtn');await click(`[data-switch="${leo}"]`);
    await check('Phone profile chooser switches child and pack',`document.querySelector('#profilesBtn').textContent.includes('Leo') && document.querySelector('#agePackSelect').value==='4-5' && document.querySelector('#levelTitle').textContent.includes('Level 2')`);
    await check('Phone profile header has no horizontal overflow',`document.documentElement.scrollWidth<=innerWidth`);
    await click('#profilesBtn');await click('#addProfileBtn');
    await check('Empty profile name shows a visible validation message',`document.querySelector('#profileMessage').textContent.includes('name') && document.activeElement.id==='newProfileName'`);
    await click('#closeProfilesBtn');
    if (process.env.COMPONENT_AUDIT === '1') {
      await require('./component-tests.cjs')({call,read,readGame,click,type,select,check,results,pause,dialogReplies,dialogLog,errors,controlIds,origin,runId,getDragData:()=>dragData});
    }
    await call('Network.setBypassServiceWorker',{bypass:false});
    await read('navigator.serviceWorker.ready.then(registration=>!!registration.active)');
    await call('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:-1,uploadThroughput:-1});
    await call('Page.reload');await pause(700);
    await check('Offline reload retains selected player and renders the lesson',`document.querySelector('#profilesBtn')?.textContent.includes('Leo') && document.querySelector('#agePackSelect')?.value==='4-5' && document.querySelector('#lessonTeaching')?.textContent.length>0`);
    await call('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
    await check('No uncaught browser exceptions',JSON.stringify(errors.length===0));
    if(results.some(result=>!result.passed))throw Error('One or more assertions failed');
    fs.writeFileSync('e2e-results.json',JSON.stringify({runId,results,errors,controls:[...controlIds]},null,2));
  } catch(error) {
    fs.writeFileSync('e2e-results.json',JSON.stringify({runId,results,errors,failure:error.stack},null,2));
    process.exitCode=1;
  } finally {await closeBrowser?.().catch(()=>{});socket?.close();chrome.kill();server.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;server.close();});
