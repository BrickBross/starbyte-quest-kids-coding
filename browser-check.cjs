const fs = require('node:fs');
const http = require('node:http');
const {spawn} = require('node:child_process');
const path = require('node:path');
const server = http.createServer((req,res)=>{const p=path.join(process.cwd(),decodeURIComponent(req.url.split('?')[0])==='/'?'index.html':decodeURIComponent(req.url.split('?')[0])); try{res.setHeader('Content-Type',p.endsWith('.svg')?'image/svg+xml':p.endsWith('.js')?'application/javascript':p.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(p));}catch{res.statusCode=404;res.end();}});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
async function main(){
await new Promise(r=>server.listen(8765,'127.0.0.1',r));
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--remote-debugging-port=9224','--remote-allow-origins=*','--user-data-dir='+path.join(process.cwd(),'.browser-test-verified'),'about:blank'],{stdio:'ignore'});
let socket;
try {
let tabs; for(let i=0;i<40;i++){try{tabs=await(await fetch('http://127.0.0.1:9224/json')).json();break;}catch{await delay(250);}}
if(!tabs) throw Error('Chrome debugging unavailable');
socket=new WebSocket(tabs.find(x=>x.type==='page').webSocketDebuggerUrl);
await new Promise(r=>socket.addEventListener('open',r));
let id=0; const pending=new Map(); const errors=[];
socket.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m);pending.delete(m.id);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);});
const call=(method,params={})=>new Promise(r=>{const n=++id;pending.set(n,r);socket.send(JSON.stringify({id:n,method,params}));});
const evaluate=async expression=>{const m=await call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(m.result.exceptionDetails)throw Error(JSON.stringify(m.result.exceptionDetails));return m.result.result.value;};
await call('Runtime.enable');await call('Page.enable');
await call('Network.enable');
await call('Network.setCacheDisabled',{cacheDisabled:true});
await call('Network.setBypassServiceWorker',{bypass:true});
await call('Page.navigate',{url:'http://127.0.0.1:8765/'});await delay(1000);
await evaluate('localStorage.clear(); location.reload()'); await delay(700);
const results=[];const check=async(name,expression)=>{const value=await evaluate(expression);results.push({name,value});if(!value)throw Error('FAIL '+name);};
await check('startup renders lesson',`levelTitle.textContent.includes('Level 1')`);
await check('no automatic rewards',`getStars()===0 && nextBtn.disabled`);
await evaluate(`agePackSelect.value='4-5';loadLevel(3);runCode()`);await delay(100);
await check('empty blocks cannot solve move-left',`nextBtn.disabled`);
await evaluate(`agePackSelect.value='7-8';loadLevel(0)`);
await check('lesson teaches before empty exercise',`codeBox.value==='' && document.getElementById('lessonTeaching').textContent.length>50 && lessonPractice.hintStep===0`);
await evaluate(`codeBox.value='say("My first try");';copyStarterBtn.click()`);
await check('clue preserves work and does not complete',`codeBox.value==='say("My first try");' && lessonPractice.hintStep===1 && nextBtn.disabled`);
await evaluate(`loadLevel(0);codeBox.value='say("Only one message");';runCode()`);await delay(150);
await check('one message does not solve three-message quest',`nextBtn.disabled && getStars()===0 && lessonPractice.attempts===1`);
await evaluate('runCode()');await delay(150);await evaluate('runCode()');await delay(150);
await check('third unsuccessful attempt offers help without pass',`lessonPractice.attempts===3 && !document.getElementById('practiceHelp').hidden && nextBtn.disabled && getStars()===0 && codeBox.value==='say("Only one message");'`);
await evaluate(`hideHome(); codeBox.value='say("One");say("Two");say("Three");'; runCode()`);await delay(250);
await check('run earns one star',`getStars()===1 && !nextBtn.disabled`);
await evaluate('nextBtn.click()');
await check('next quest has new teaching and no answer',`currentLevel===1 && codeBox.value==='' && lessonPractice.attempts===0 && lessonPractice.hintStep===0 && nextBtn.disabled`);
await evaluate(`loadLevel(0);codeBox.value='say("One");say("Two");say("Three");';`);
await evaluate('runCode()');await delay(250);await check('rerun does not duplicate star',`getStars()===1`);
await evaluate(`codeBox.value='say("Hi"); throw Error("broken")';runCode()`);await delay(250);
await check('runtime error survives final state',`nextBtn.disabled && statusBox.textContent.includes('broken')`);
await evaluate(`codeBox.value='say(';runCode()`);await delay(250);
await check('syntax error is shown',`nextBtn.disabled && statusBox.textContent.includes('Code error')`);
await evaluate(`codeBox.value='onButton("A",()=>say("Button works"))';runCode()`);await delay(250);await evaluate(`sendGameCommand('press','A')`);await delay(250);
await check('sandbox button bridge works',`lastState.messages.includes('Button works')`);
await evaluate(`agePackSelect.value='4-5';loadLevel(4)`);await delay(150);
await check('size block exists',`BLOCK_DEFS.some(b=>b.type==='size') && expectedBlocksForLevel()[0]==='size'`);
await check('new block quest does not reveal choice',`blocksProgram.length===0 && !blocksPalette.querySelector('.guided')`);
await evaluate('requestLessonHint()');
await check('first block clue encourages thinking',`blocksProgram.length===0 && !blocksPalette.querySelector('.guided')`);
await evaluate('requestLessonHint()');
await check('later block clue guides without building answer',`blocksProgram.length===0 && !!blocksPalette.querySelector('.guided')`);
await evaluate(`blocksProgram=[defaultBlock('size')];runCode()`);await delay(250);
await check('size lesson can complete',`!nextBtn.disabled`);
await evaluate(`renderDaily();renderDaily()`);await check('daily check survives storage',`typeof getDaily().picked.check==='function'`);
await evaluate(`makerKind.value='targettap';makerProgram=[{type:'celebrate'}];runMaker()`);await delay(250);
await check('maker runs',`!activeRun.failed`);
await evaluate(`agePackSelect.value='7-8';loadLevel(6);codeBox.value='onButton("A",()=>say("Wrong action"));';runCode()`);await delay(100);
await check('wiring alone does not complete button quest',`nextBtn.disabled && lessonPractice.attempts===0`);
await evaluate(`sendGameCommand('press','A')`);await delay(100);
await check('wrong button action gets useful feedback',`nextBtn.disabled && lessonPractice.attempts===1`);
await evaluate(`agePackSelect.value='7-8';loadLevel(5);codeBox.value='addStar();addStar();addStar();';runCode()`);await delay(100);
await check('loop lesson requires learning loop concept',`nextBtn.disabled`);
for (const pack of ['4-5','6-7','7-8','9-10']) {
  for(let level=0;level<10;level++){
    await evaluate(`agePackSelect.value=${JSON.stringify(pack)};loadLevel(${level});makerRunning=true;codeBox.value=getPack(agePackSelect.value)[${level}].starter;runCode();activeRun.maker=false;`);
    await delay(100);
    await evaluate(`['A','B','C'].forEach(key=>sendGameCommand('press',key))`);await delay(80);
    await check(`starter solves ${pack} level ${level+1}`,`!nextBtn.disabled`);
  }
}
await evaluate(`saveState({activeProfileId:'test-child',profilesById:{...loadState().profilesById,'test-child':{id:'test-child',name:'Test'}}});initFromStorage()`);
await check('new child has separate progress',`getStars()===0 && getPackProgress('7-8').maxLevelCompleted===-1`);
await evaluate(`codeBox.value='say("Hello");say("Hi");say("Hey");';runCode()`);await delay(150);
await check('new child saves own reward',`getStars()===1`);
await evaluate(`location.reload()`);await delay(500);
await check('progress survives reload',`getStars()===1 && getPackProgress('7-8').maxLevelCompleted===0`);
await evaluate(`soundToggle.click();soundToggle.click();ttsToggle.click();ttsToggle.click()`);
await check('settings toggle both ways',`!loadState().soundOn && !loadState().ttsOn`);
for(let level=0;level<10;level++){
  await evaluate(`agePackSelect.value='4-5';loadLevel(${level});blocksProgram=expectedBlocksForLevel().map(defaultBlock);runCode()`);
  await delay(100);
  await check(`guided blocks solve level ${level+1}`,`!nextBtn.disabled`);
}
await call('Emulation.setDeviceMetricsOverride',{width:375,height:740,deviceScaleFactor:1,mobile:true});
await evaluate(`agePackSelect.value='9-10';loadLevel(1);codeBox.value=getPack('9-10')[1].starter;runCode()`);await delay(200);
await check('coordinate lesson works on phone',`!nextBtn.disabled`);
await check('phone has no horizontal overflow',`document.documentElement.scrollWidth <= innerWidth`);
await check('child menus replace crowded toolbar',`!!document.querySelector('#settingsMenu #agePackSelect') && !!document.querySelector('#exploreMenu #makerBtn')`);
await evaluate(`homeBtn.click();tileMake.click()`);await delay(100);
await check('home tiles open their activity directly',`homeScreen.getAttribute('aria-hidden')==='true' && makerModal.classList.contains('show')`);
await evaluate(`hideModal(makerModal);agePackSelect.value='4-5';loadLevel(0)`);await delay(100);
await check('block mode has primary run action',`document.body.classList.contains('blockMode') && getComputedStyle(runBtn).display!=='none'`);
await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1100,deviceScaleFactor:1,mobile:false});
await evaluate(`agePackSelect.value='7-8';loadLevel(0);hideHome();document.getElementById('confetti').replaceChildren()`);await delay(150);
await check('new logo loads correctly',`document.querySelector('.brand img').complete && document.querySelector('.brand img').naturalWidth>0`);
let screenshot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('ui-desktop.png',Buffer.from(screenshot.result.data,'base64'));
await evaluate('showHome()');screenshot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('ui-home.png',Buffer.from(screenshot.result.data,'base64'));
await call('Emulation.setDeviceMetricsOverride',{width:375,height:900,deviceScaleFactor:1,mobile:true});
await evaluate(`hideHome();agePackSelect.value='4-5';loadLevel(0)`);await delay(150);
screenshot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('ui-phone.png',Buffer.from(screenshot.result.data,'base64'));
await check('no uncaught browser errors',JSON.stringify(errors.length===0));
fs.writeFileSync('browser-results.json',JSON.stringify({results,errors},null,2));
console.log(JSON.stringify({results,errors},null,2));
} finally {socket?.close();chrome.kill();server.close();}
}
main().catch(e=>{fs.writeFileSync('browser-results.json',String(e.stack));console.error(e);process.exitCode=1;server.close();});
