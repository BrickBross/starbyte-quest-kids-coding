const fs=require('node:fs');
module.exports=async function audit(ctx){
  const {call,read,readGame,click,type,select,check,results,pause}=ctx;
  const cases=[];
  const baseline=await read('JSON.stringify({...localStorage})');
  const inventory=await read(`Array.from(document.querySelectorAll('button[id],input[id],select[id],textarea[id]')).map(el=>({id:el.id,label:el.textContent.trim().slice(0,80)||el.placeholder||el.id}))`);
  const setup=async patch=>{
    await call('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
    await call('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
    // Fixture changes are isolated to this test browser; actions below use real UI input.
    await read(`(()=>{const data=JSON.parse(${JSON.stringify(baseline)});localStorage.clear();Object.entries(data).forEach(([k,v])=>localStorage.setItem(k,v));const root=JSON.parse(localStorage.getItem('starbyteQuest.v1'));root.focusModeOn=false;root.parentMode=false;delete root.pinHash;delete root.parentPinHash;root.mathGateOn=false;root.lang='en';localStorage.setItem('starbyteQuest.v1',JSON.stringify(root));const key='starbyte_quest_profile_'+root.activeProfileId;const p=JSON.parse(localStorage.getItem(key));Object.assign(p,${JSON.stringify(patch||{})});localStorage.setItem(key,JSON.stringify(p));location.reload();})()`);
    await pause(450);
    if(await read(`document.querySelector('#homeScreen').getAttribute('aria-hidden')==='false'`))await click('#startBtn');
  };
  const state=()=>read(`JSON.parse(localStorage.getItem('starbyte_quest_profile_'+JSON.parse(localStorage.getItem('starbyteQuest.v1')).activeProfileId))`);
  const settings=async id=>{if(!await read(`document.querySelector('#settingsMenu').open`))await click('#settingsMenu > summary');await click('#'+id);};
  const explore=async id=>{if(!await read(`document.querySelector('#exploreMenu').open`))await click('#exploreMenu > summary');await click('#'+id);};
  const clickGame=async(selector,modifiers=0)=>{
    await read(`document.querySelector('#gameFrame').scrollIntoView({block:'center',behavior:'instant'})`);
    const point=await readGame(`(()=>{const p=document.querySelector('#play');const el=Array.from(document.querySelectorAll(${JSON.stringify(selector)})).find(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&r.top>=0&&r.bottom<=innerHeight;});if(!el)return null;const r=el.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2};})()`);
    if(!point)throw Error('No visible game target '+selector);
    const offset=await read(`(()=>{const r=document.querySelector('#gameFrame').getBoundingClientRect();return{x:r.left,y:r.top};})()`);
    if(modifiers===8)await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Shift',code:'ShiftLeft',modifiers:8});
    for(const type of ['mousePressed','mouseReleased'])await call('Input.dispatchMouseEvent',{type,button:'left',clickCount:1,modifiers,x:point.x+offset.x,y:point.y+offset.y});
    if(modifiers===8)await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Shift',code:'ShiftLeft',modifiers:0});
    await pause(60);
  };
  const fixturePrint=()=>read(`window.__prints=[];window.open=()=>{let html='';return{document:{open(){},write(text){html+=text},close(){window.__prints.push(html)}},focus(){},print(){window.__printCalled=true}}}`);
  // Dialog replies are provided by the runner through Page.javascriptDialogOpening.
  const reply=async answer=>ctx.dialogReplies.push(answer);
  const test=async(name,fn,patch)=>{
    if(process.env.AUDIT_FILTER && !new RegExp(process.env.AUDIT_FILTER).test(name))return;
    try{await setup(patch);ctx.dialogReplies.length=0;const before=ctx.errors.length;await fn();if(ctx.errors.length>before)throw Error('Uncaught browser exception: '+JSON.stringify(ctx.errors.slice(before)));cases.push({component:name,status:'passed'});}
    catch(error){let debug;try{debug=await read(`({story:document.querySelector('#levelStory')?.textContent,editStory:document.querySelector('#editStory')?.value,blocks:typeof blocksProgram==='undefined'?null:blocksProgram,settingsOpen:document.querySelector('#settingsMenu')?.open})`);}catch{}cases.push({component:name,status:'failed',error:String(error.stack),debug});}
    fs.writeFileSync('component-results.json',JSON.stringify({cases,failed:cases.filter(item=>item.status==='failed').length},null,2));
  };
  await test('Home menu and complete onboarding',async()=>{
    await click('#homeBtn');await click('#walkthroughBtn');
    await check('Tour opens above home',`document.querySelector('#onboardModal').classList.contains('show')`);
    await click('#nextOnboardBtn');await click('#prevOnboardBtn');
    for(let i=0;i<9;i++)await click('#nextOnboardBtn');
    await check('Tour finish persists and closes',`!document.querySelector('#onboardModal').classList.contains('show') && JSON.parse(localStorage.getItem('starbyteQuest.v1')).hasSeenOnboarding`);
    await click('#homeBtn');await click('#tileTrophies');await check('Home trophies route works',`document.querySelector('#trophiesModal').classList.contains('show')`);
    await click('#closeTrophiesBtn');
    for(const [tile,modal,close] of [['tilePlay',null,null],['tileLearn','teacherModal','closeTeacherBtn'],['tileMake','makerModal','closeMakerBtn']]){
      await click('#homeBtn');await click('#'+tile);
      await check('Home '+tile+' route',modal?`document.querySelector('#${modal}').classList.contains('show')`:`document.querySelector('#homeScreen').getAttribute('aria-hidden')==='true'`);
      if(close)await click('#'+close);
    }
  });
  await test('Every world selection',async()=>{
    for(const world of ['candy','unicorn','space','dino','castle','pirate','arcade']){
      await click('#worldsBtn');await click(`[data-world="${world}"]`);
      await check('World '+world+' saved',`JSON.parse(localStorage.getItem('starbyte_quest_profile_'+JSON.parse(localStorage.getItem('starbyteQuest.v1')).activeProfileId)).worldId===${JSON.stringify(world)}`);
    }
  });
  await test('Theme, sticker packs and pack changes',async()=>{
    for(const theme of ['ocean','jungle','sunset','rainbow','icecream','neon']){
      await click('#settingsMenu > summary');await select('#themeSelect',theme);await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape'});
      await check('Theme '+theme+' saved',`document.querySelector('#themeSelect').value===${JSON.stringify(theme)}`);
      await check('Theme change does not run exercise '+theme,`lessonPractice.attempts===0 && activeRun===null`);
    }
    await click('#settingsMenu > summary');await select('#stickerPackSelect','animals');await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape'});
    await check('Sticker pack changes shelf',`document.querySelector('#stickerShelf').children.length>0`);
    for(const pack of ['4-5','6-7','7-8','9-10']){
      await click('#settingsMenu > summary');await select('#agePackSelect',pack);await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape'});
      await check('Pack '+pack+' loads correct teaching',`document.querySelector('#agePackSelect').value===${JSON.stringify(pack)} && document.querySelector('#lessonTeaching').textContent.length>20`);
    }
  });
  await test('Block editing, undo, remove, clear and keyboard activation',async()=>{
    await click('#blocksPalette [data-type="say"]');await type('#blocksWorkspace input','A custom greeting');
    await click('#blocksPalette [data-type="star"]');await click('#blocksUndoBtn');
    await check('Undo removes only last block',`document.querySelectorAll('#blocksWorkspace .block').length===1 && document.querySelector('#blocksWorkspace input').value==='A custom greeting'`);
    await click('#blocksWorkspace .xbtn');await check('Block removal empties workspace',`document.querySelectorAll('#blocksWorkspace .block').length===0`);
    await click('#blocksPalette [data-type="color"]');await select('#blocksWorkspace select','purple');
    await click('#blocksClearBtn');await check('Clear blocks restores empty message',`document.querySelector('#blocksEmpty') && document.querySelectorAll('#blocksWorkspace .block').length===0`);
    await click('#blocksPalette [data-type="say"]');
    await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter'});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter'});
    await check('Palette supports keyboard activation',`document.querySelectorAll('#blocksWorkspace .block').length===2`);
    await click('#nextHintBtn');await click('#guidedToggle');await click('#guidedToggle');await click('#ttsToggle');await click('#ttsToggle');
  },{agePack:'4-5',progressByPack:{}});
  await test('Three unsuccessful UI attempts and every clue button',async()=>{
    await type('#codeBox','say("Only one");');for(let i=0;i<3;i++)await click('#runBtn');
    await check('Three attempts reveal support without awarding completion',`!document.querySelector('#practiceHelp').hidden && document.querySelector('#nextBtn').disabled`);
    await click('#practiceClueBtn');await click('#moreClueBtn');
    await check('All clue actions preserve typed work',`document.querySelector('#codeBox').value==='say("Only one");' && document.querySelector('#hintProgress').textContent.includes('3 of 3')`);
    await click('#resetBtn');await check('Start over clears exercise and attempt count',`document.querySelector('#codeBox').value==='' && document.querySelector('#practiceHelp').hidden`);
  },{agePack:'7-8',progressByPack:{}});
  await test('Stickers apply, clear, album and stage placement',async()=>{
    await click('.rewardDrawer > summary');await click('#stickerShelf .sticker:not(.locked)');await click('#useStickerBtn');
    let sticker=await readGame(`document.querySelector('.stickerOnHero')?.textContent`);
    await check('Sticker appears on hero',JSON.stringify(!!sticker));
    await click('#clearStickerBtn');await check('Clear sticker removes hero sticker',JSON.stringify(!(await readGame(`document.querySelector('.hero .stickerOnHero')`))));
    await click('#stickerNote');await check('Album renders stickers',`document.querySelector('#albumModal').classList.contains('show') && document.querySelector('#albumGrid').children.length>0`);
    await click('#closeAlbumBtn');
    await click('#stickerShelf .sticker:not(.locked)');await click('#useStickerBtn');
    await clickGame('#play',8);
    const placed=await readGame(`!!document.querySelector('#play > .stickerOnHero')`);
    await check('Shift-click places a sticker on the stage',JSON.stringify(placed));
  },{progressStars:100});
  await test('Drag blocks into the workspace',async()=>{
    await read(`document.querySelector('#blocksCard').scrollIntoView({block:'center',behavior:'instant'})`);
    const points=await read(`(()=>{const a=document.querySelector('#blocksPalette [data-type="say"]').getBoundingClientRect(),b=document.querySelector('#blocksWorkspace').getBoundingClientRect();return{start:{x:a.left+a.width/2,y:a.top+a.height/2},end:{x:b.left+b.width/2,y:b.top+80}}})()`);
    await call('Input.setInterceptDrags',{enabled:true});
    await call('Input.dispatchMouseEvent',{type:'mouseMoved',...points.start});
    await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...points.start});
    await pause(80);
    for(let step=1;step<=8;step++){
      await call('Input.dispatchMouseEvent',{type:'mouseMoved',button:'left',buttons:1,x:points.start.x+(points.end.x-points.start.x)*step/8,y:points.start.y+(points.end.y-points.start.y)*step/8});await pause(30);
    }
    await pause(100);
    const data=ctx.getDragData() || {items:[],dragOperationsMask:1};
    for(const type of ['dragEnter','dragOver','drop'])await call('Input.dispatchDragEvent',{type,data,...points.end});
    await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...points.end});
    await call('Input.setInterceptDrags',{enabled:false});
    await check('Dragging adds the selected block',`document.querySelectorAll('#blocksWorkspace .block').length===1`);
  },{agePack:'4-5',progressByPack:{}});
  await test('World story and story-mode toggle',async()=>{
    await click('.storyDrawer > summary');await check('World story has content',`document.querySelector('#storyText').textContent.includes('Pack')`);
    await click('#storyToggle');await check('Story toggle turns off',`document.querySelector('#storyToggle').getAttribute('aria-pressed')==='false' && document.querySelector('#storyText').textContent.includes('off')`);
    await click('#storyToggle');await check('Story toggle restores story',`document.querySelector('#storyToggle').getAttribute('aria-pressed')==='true'`);
  });
  await test('Mini-game selection and play',async()=>{
    await click('.rewardDrawer > summary');await click('#openMiniGamesBtn');
    await check('Mini-game list opens without error',`document.querySelectorAll('#miniGamesList [data-minirun]').length===2`);
    await click('[data-minirun="starcatch"]');await pause(450);
    await check('Star Catch stage spawns stars',JSON.stringify(await readGame(`!!document.querySelector('.obj')`)));
    await click('#openMiniGamesBtn');await click('[data-minirun="targettap"]');await pause(500);
    await check('Target Tap stage spawns targets',JSON.stringify(await readGame(`document.querySelector('.obj')?.textContent==='🎯'`)));
  },{progressStars:100});
  await test('Certificates and printable certificate content',async()=>{
    await fixturePrint();await click('.rewardDrawer > summary');await click('#openCertificateBtn');await type('#certNameInput','Audit Coder');await click('#printCertBtn');
    await check('Certificate uses chosen name and print document',`document.querySelector('#certName').textContent==='Audit Coder' && window.__prints[0].includes('Audit Coder') && window.__printCalled`);
  },{progressStars:40,progressByPack:{'4-5':{maxLevelCompleted:9}}});
  await test('Skill tree and progress report',async()=>{
    await explore('skillTreeBtn');await check('Skill tree renders every skill',`document.querySelectorAll('#skillTreeGrid .dashCard').length===8`);await click('#closeSkillTreeBtn');
    await fixturePrint();await settings('reportBtn');await click('#printReportBtn');
    await check('Report renders and produces print content',`document.querySelector('#reportProfile').textContent.length>0 && window.__prints[0].includes('Progress') && window.__printCalled`);
  });
  await test('All teacher lesson routes and lesson print content',async()=>{
    await fixturePrint();await settings('teacherBtn');await click('#printLessonBtn');
    await check('Lesson pack print generated',`window.__prints[0].includes('Lesson Pack') && window.__printCalled`);
    await click('[data-jump="0"]');await check('Blocks teacher route opens block pack',`document.querySelector('#agePackSelect').value==='4-5'`);
    await settings('teacherBtn');await click('[data-jump="1"]');await check('Typing teacher route opens first typing pack',`document.querySelector('#agePackSelect').value==='6-7'`);
    await settings('teacherBtn');
    await click('[data-jump="2"]');await check('Loops teacher route opens loop quest',`document.querySelector('#levelTitle').textContent.includes('Stars')`);
    await settings('teacherBtn');await click('[data-jump="3"]');await check('Buttons teacher route opens event quest',`document.querySelector('#levelTitle').textContent.includes('Button')`);
    await settings('teacherBtn');await click('[data-jump="4"]');await check('Variables teacher route opens variable quest',`document.querySelector('#levelTitle').textContent.includes('Variables')`);
    await settings('teacherBtn');await click('[data-jump="5"]');await check('Maker teacher route opens Maker',`document.querySelector('#makerModal').classList.contains('show')`);
  });
  await test('Language persistence and narration setting',async()=>{
    await click('#settingsMenu > summary');await select('#langSelect','es');await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape'});
    await check('Spanish selection updates labels',`document.querySelector('#teacherBtn').textContent==='Profe 🏫'`);
    await call('Page.reload');await pause(450);await click('#startBtn');
    await check('Language restored after reload',`document.querySelector('#langSelect').value==='es' && document.querySelector('#teacherBtn').textContent==='Profe 🏫'`);
    await settings('narrateBtn');await check('Narration enables persisted setting',`JSON.parse(localStorage.getItem('starbyteQuest.v1')).narrationOn===true`);
    await settings('narrateBtn');await settings('soundToggle');await settings('soundToggle');
  });
  await test('Parent PIN, dashboard, jumping and local edits',async()=>{
    await reply({accept:true,promptText:'1234'});await reply({accept:true});await settings('parentBtn');
    await reply({accept:true,promptText:'wrong'});await reply({accept:true});await settings('parentBtn');
    await check('Wrong parent PIN does not open panel',`!document.querySelector('#parentPanel').classList.contains('enabled')`);
    await reply({accept:true,promptText:'1234'});await settings('parentBtn');
    await check('Parent panel and dashboard open',`document.querySelector('#parentPanel').classList.contains('enabled') && document.querySelectorAll('#dashGrid .dashCard').length===4`);
    await type('#jumpLevelInput','3');await click('#jumpLevelBtn');await check('Jump selects requested quest',`document.querySelector('#levelTitle').textContent.includes('Level 3')`);
    await click('#parentPanel details:first-of-type > summary');await type('#editStory','Edited story');await click('#applyEditsBtn');
    await check('Parent story edit appears',`document.querySelector('#levelStory').textContent==='Edited story'`);
    await click('#revertEditsBtn');await check('Revert restores original story',`document.querySelector('#levelStory').textContent!=='Edited story'`);
    await click('#unlockAllStickersBtn');await reply({accept:true});
  });
  await test('Focus PIN cannot be bypassed by math unlock or PIN replacement',async()=>{
    await settings('lockBtn');await type('#pinInput','1234');await click('#setPinBtn');await click('#toggleFocusBtn');
    await type('#pinUnlockInput','0000');await reply({accept:true});await click('#unlockBtn');
    await check('Wrong focus PIN keeps lock enabled',`document.body.classList.contains('focusMode')`);
    await reply({accept:true,math:true});await click('#mathGateUnlockBtn');
    await check('Math unlock cannot bypass an existing PIN',`document.body.classList.contains('focusMode')`);
    await type('#pinInput','9999');await click('#setPinBtn');
    await check('Locked PIN cannot be replaced',`document.querySelector('#pinInput').disabled && document.body.classList.contains('focusMode')`);
    await type('#pinUnlockInput','1234');await click('#unlockBtn');await check('Correct PIN unlocks focus mode',`!document.body.classList.contains('focusMode')`);
  });
  await test('Install fallback and fullscreen request wiring',async()=>{
    await read('deferredInstallPrompt=null');
    await reply({accept:true});await settings('installBtn');
    await check('Install fallback returns without error',`document.querySelector('#installBtn')!==null`);
    await read(`window.__fullscreenRequested=false;document.documentElement.requestFullscreen=async()=>{window.__fullscreenRequested=true}`);
    await settings('lockBtn');await click('#requestFullscreenBtn');await check('Fullscreen button calls browser API',`window.__fullscreenRequested`);
  });
  await test('Share invalid input, exported QR round trip and import',async()=>{
    await settings('shareBtn');await type('#shareBox','not-a-share-token');await reply({accept:true});await click('#importLinkBtn');
    await check('Bad share token leaves share dialog open',`document.querySelector('#shareModal').classList.contains('show')`);
    await click('#exportLinkBtn');
    const qrPixels=await read(`(()=>{const c=document.querySelector('#qrCanvas');return {width:c.width,height:c.height,data:Array.from(c.getContext('2d').getImageData(0,0,c.width,c.height).data),link:document.querySelector('#shareBox').value};})()`);
    const jsQR=require('./tests/vendor/jsQR.cjs');
    const decoded=jsQR(new Uint8ClampedArray(qrPixels.data),qrPixels.width,qrPixels.height);
    await check('Exported QR decodes independently to exact share link',JSON.stringify(decoded?.data===qrPixels.link));
    await click('#importLinkBtn');await check('Valid share import closes dialog',`!document.querySelector('#shareModal').classList.contains('show')`);
  });
  await test('Share URL startup, malformed blocks and oversized QR',async()=>{
    await click('#settingsMenu > summary');await select('#agePackSelect','7-8');await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape'});
    await type('#codeBox','say("Shared greeting");');await settings('shareBtn');await click('#exportLinkBtn');
    const url=await read(`document.querySelector('#shareBox').value`);
    await call('Page.navigate',{url});await pause(550);
    await check('Opening share URL restores code after initialization',`document.querySelector('#codeBox').value==='say("Shared greeting");' && document.querySelector('#homeScreen').getAttribute('aria-hidden')==='true'`);
    await settings('shareBtn');
    const badToken=Buffer.from(JSON.stringify({v:1,packId:'4-5',mode:'blocks',blocks:[{type:'<b>not-a-block</b>'}]}),'utf8').toString('base64');
    await type('#shareBox',badToken);await click('#importLinkBtn');
    await check('Unknown shared blocks are rejected without changing work',`document.querySelector('#shareModal').classList.contains('show') && document.querySelector('#codeBox').value==='say("Shared greeting");'`);
    await click('#closeShareBtn');await type('#codeBox','say("'+ 'x'.repeat(6000) +'");');await settings('shareBtn');await click('#exportLinkBtn');
    await check('Oversized QR offers link fallback and hides stale code',`document.querySelector('#qrCanvas').hidden && document.querySelector('.qrHelp').textContent.includes('too large') && document.querySelector('#shareBox').value.includes('#share=')`);
  });
  await test('Avatar unlocks, hats, pets and saved portrait',async()=>{
    await explore('avatarBtn');await click('#avatarGrid .dashCard:nth-child(2) button:nth-child(2)');await click('#avatarGrid .dashCard:nth-child(3) button:nth-child(3)');await click('#closeAvatarBtn');
    await check('Unlocked hat and pet saved',JSON.stringify((await state()).avatar.hat==='🎩' && (await state()).avatar.pet==='🐶'));
    const appearance=await readGame(`({hat:document.querySelector('#hat').textContent,pet:document.querySelector('#pet').textContent})`);
    await check('Hat and pet appear in sandbox',JSON.stringify(appearance.hat==='🎩' && appearance.pet==='🐶'));
  },{progressStars:100});
  await test('Locked avatar options remain disabled',async()=>{
    await explore('avatarBtn');await check('Hats and pets require earned stars',`document.querySelector('#avatarGrid .dashCard:nth-child(2) button').disabled && document.querySelector('#avatarGrid .dashCard:nth-child(3) button').disabled`);
  },{progressStars:0});
  await test('Trophy unlocks, reload and printable milestone',async()=>{
    await explore('trophiesBtn');await check('Star milestones unlock trophy printing',`!document.querySelector('#printTrophyCertBtn').disabled`);
    await click('#closeTrophiesBtn');await call('Page.reload');await pause(450);await click('#startBtn');await explore('trophiesBtn');
    await check('Existing trophies retain printable milestone after reload',`!document.querySelector('#printTrophyCertBtn').disabled`);
    await fixturePrint();await click('#printTrophyCertBtn');await check('Trophy certificate print document generated',`window.__prints[0].includes('Trophy') && window.__printCalled`);
  },{progressStars:100});
  await test('Daily reward can be claimed exactly once',async()=>{
    await explore('dailyBtn');const before=(await state()).progressStars;await click('#startDailyBtn');await click('#claimDailyBtn');
    const after=(await state()).progressStars;await check('Daily claim awards bonus',JSON.stringify(after>before));
    await click('#claimDailyBtn');await check('Claim cannot award twice',JSON.stringify((await state()).progressStars===after));
  },{badgeProgress:{talk:100,move:100,stars:100,loops:100},daily:null});
  await test('Every Maker block, editing, clear and Target Tap win',async()=>{
    await explore('makerBtn');
    for(const n of [1,2,3,4,5,6,7])await click(`#makerPalette .block:nth-child(${n})`);
    await check('All Maker blocks can be added',`document.querySelectorAll('#makerWorkspace .block').length===7`);
    await type('#makerWorkspace .block:first-child input','Maker greeting');
    await click('#makerWorkspace .block:last-child .xbtn');await check('Maker block removal works',`document.querySelectorAll('#makerWorkspace .block').length===6`);
    await click('#makerClearBtn');await check('Maker Clear empties script',`document.querySelectorAll('#makerWorkspace .block').length===0`);
    await click('#makerPalette .block:first-child');await select('#makerKind','targetTap');await type('#makerSeconds','10');await type('#makerGoal','1');await click('#makerRunBtn');await pause(550);
    await clickGame('#play button');await check('Maker goal completes after target click',`document.querySelector('#statusBox').textContent.includes('Mini-game finished')`);
  });
  await test('Standalone mini-game scoring, bonus and restart',async()=>{
    await click('.rewardDrawer > summary');await click('#openMiniGamesBtn');await click('[data-minirun="targettap"]');
    const before=(await state()).progressStars;
    for(let i=0;i<5;i++){await pause(450);await clickGame('.obj');}
    await pause(18500);
    await check('Mini-game round awards earned bonus',JSON.stringify((await state()).progressStars===before+1));
    await clickGame('#restart');await check('Restart clears score',JSON.stringify(await readGame(`document.querySelector('#score').textContent==='0'`)));
  },{progressStars:100});
  await test('Custom level builder, objective/hint edits and deletion',async()=>{
    await reply({accept:true,promptText:'1234'});await settings('parentBtn');await reply({accept:true,promptText:'1234'});await settings('parentBtn');
    await type('#newLevelTitle','Custom greeting');await type('#newLevelStory','A custom story');await type('#newLevelObjective','Say your own greeting');await type('#newLevelHint','Think of a greeting');await type('#newLevelStarter','say("Parent reference");');await select('#newLevelCheck','saidSomething');await click('#addLevelBtn');
    await type('#jumpLevelInput','11');await click('#jumpLevelBtn');
    await check('Custom level loads as an empty exercise',`document.querySelector('#levelTitle').textContent.includes('Custom greeting') && document.querySelector('#levelObjective').textContent==='Say your own greeting'`);
    await click('#blocksPalette [data-type="say"]');await click('#runBtn');await check('Custom validation passes correct work',`!document.querySelector('#nextBtn').disabled`);
    await click('#parentPanel details:first-of-type > summary');await type('#editObjective','Edited mission');await type('#editHint','Edited clue');await click('#applyEditsBtn');
    await check('Custom objective edits apply',`document.querySelector('#levelObjective').textContent==='Edited mission'`);
    await click('#clearCustomLevelsBtn');await check('Custom deletion restores built-in count',`document.querySelector('#levelLabel').textContent.includes('of 10')`);
  },{agePack:'4-5',progressByPack:{}});
  await test('All custom-level validation rules',async()=>{
    const samples=[
      ['saidSomething',{messages:['Hello']},{messages:[]}],
      ['changedColor',{colorChanged:true},{colorChanged:false}],
      ['movedRight',{x:240},{x:120}],
      ['madeStars3',{stars:3},{stars:2}],
      ['wiredA',{buttonWires:{A:true}},{buttonWires:{A:false}}],
      ['usedRandom',{usedRandomInt:true},{usedRandomInt:false}],
    ];
    for(const [rule,good,bad] of samples)await check('Custom '+rule+' accepts/rejects correct states',`buildCustomValidate(${JSON.stringify(rule)})(${JSON.stringify(good)}).ok && !buildCustomValidate(${JSON.stringify(rule)})(${JSON.stringify(bad)}).ok`);
  });
  await test('Parent command insertion works in typing and block modes',async()=>{
    await reply({accept:true,promptText:'1234'});await settings('parentBtn');await reply({accept:true,promptText:'1234'});await settings('parentBtn');
    await click('#settingsMenu > summary');await select('#agePackSelect','7-8');await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape'});
    for(let n=1;n<=5;n++)await click(`#insertRow button:nth-child(${n})`);
    await click('#runBtn');await check('Inserted repeat command is valid JavaScript',`!document.querySelector('#statusBox').textContent.includes('Code error')`);
    await check('Inserted code creates expected stars',JSON.stringify(await readGame(`document.querySelector('#starsCount').textContent==='4'`)));
    await click('#settingsMenu > summary');await select('#agePackSelect','4-5');await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape'});
    await click('#insertRow button:first-child');await check('Block-mode insertion creates a block rather than discarded code',`document.querySelectorAll('#blocksWorkspace .block').length===1`);
  });
  await test('Math Gate without PIN and incorrect answer',async()=>{
    await settings('lockBtn');await click('#mathGateToggle');await click('#toggleFocusBtn');
    await reply({accept:true,promptText:'-1'});await click('#mathGateUnlockBtn');await check('Wrong math answer leaves focus locked',`document.body.classList.contains('focusMode')`);
    await reply({accept:true,math:true});await click('#mathGateUnlockBtn');await check('Correct math answer unlocks when no PIN exists',`!document.body.classList.contains('focusMode')`);
  });
  await test('Narration API and install acceptance/cancellation hooks',async()=>{
    await read(`window.__spoken=[];window.speechSynthesis.speak=utterance=>window.__spoken.push({text:utterance.text,lang:utterance.lang});window.speechSynthesis.cancel=()=>{}`);
    await settings('narrateBtn');await check('Narration hands lesson text to speech API',`window.__spoken.length>0 && window.__spoken[0].text.length>20`);await settings('narrateBtn');
    for(const outcome of ['accepted','dismissed']){
      await read(`(()=>{const event=new Event('beforeinstallprompt',{cancelable:true});window.__installPrompted=false;event.prompt=async()=>{window.__installPrompted=true};event.userChoice=Promise.resolve({outcome:${JSON.stringify(outcome)}});window.dispatchEvent(event);})()`);
      await settings('installBtn');await check('Install '+outcome+' branch calls supplied prompt',`window.__installPrompted`);
    }
  });
  await test('Reset progress and clear-data controls on isolated test storage',async()=>{
    await reply({accept:true,promptText:'1234'});await settings('parentBtn');await reply({accept:true,promptText:'1234'});await settings('parentBtn');
    await click('#resetProgressBtn');await check('Progress reset clears child rewards',`JSON.parse(localStorage.getItem('starbyte_quest_profile_default')).progressStars===0`);
    await reply({accept:true,promptText:'1234'});await settings('parentBtn');await reply({accept:true,promptText:'1234'});await settings('parentBtn');
    await click('#clearCacheBtn');await pause(450);await click('#startBtn');await check('Clear saved data creates clean default player',`document.querySelector('#profilesBtn').textContent.includes('Default') && JSON.parse(localStorage.getItem('starbyte_quest_profile_default')).progressStars===0`);
  });
  await test('About page and return navigation',async()=>{
    await settings('aboutBtn');await pause(300);await check('About page loads',`location.pathname.endsWith('/about.html') && document.body.textContent.includes('Starbyte')`);
    await call('Page.navigate',{url:ctx.origin+'/'});await pause(450);await click('#startBtn');
  });
  await test('Every modal close control and backdrop dismissal',async()=>{
    const routes=[
      ['profilesModal',()=>click('#profilesBtn'),'closeProfilesBtn'],['worldsModal',()=>click('#worldsBtn'),'closeWorldsBtn'],
      ['avatarModal',()=>explore('avatarBtn'),'closeAvatarBtn'],['dailyModal',()=>explore('dailyBtn'),'closeDailyBtn'],
      ['skillTreeModal',()=>explore('skillTreeBtn'),'closeSkillTreeBtn'],['makerModal',()=>explore('makerBtn'),'closeMakerBtn'],
      ['trophiesModal',()=>explore('trophiesBtn'),'closeTrophiesBtn'],['reportModal',()=>settings('reportBtn'),'closeReportBtn'],
      ['shareModal',()=>settings('shareBtn'),'closeShareBtn'],['teacherModal',()=>settings('teacherBtn'),'closeTeacherBtn'],['lockModal',()=>settings('lockBtn'),'closeLockBtn'],
    ];
    for(const [modal,open,close] of routes){await open();await click('#'+close);await check(close+' closes its modal',`!document.querySelector('#${modal}').classList.contains('show')`);}
    if(!await read(`document.querySelector('.rewardDrawer').open`))await click('.rewardDrawer > summary');
    for(const [open,close] of [['openMiniGamesBtn','closeMiniGamesBtn'],['openCertificateBtn','closeCertificateBtn'],['stickerNote','closeAlbumBtn']]){await click('#'+open);await click('#'+close);}
    await click('#homeBtn');await click('#walkthroughBtn');await click('#closeOnboardBtn');
    await click('#profilesBtn');await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:3,y:3});for(const type of ['mousePressed','mouseReleased'])await call('Input.dispatchMouseEvent',{type,button:'left',buttons:type==='mousePressed'?1:0,clickCount:1,x:3,y:3});await pause(100);
    await check('Backdrop dismisses modal',`!document.querySelector('#profilesModal').classList.contains('show')`);
  });
  await test('Phone touch input and next-quest control',async()=>{
    await call('Emulation.setDeviceMetricsOverride',{width:375,height:900,deviceScaleFactor:1,mobile:true});
    const tap=async selector=>{
      const p=await read(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});el.scrollIntoView({block:'center',behavior:'instant'});const r=el.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})()`);
      await call('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...p,id:0,radiusX:1,radiusY:1}]});await call('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await pause(100);
    };
    await tap('#blocksPalette [data-type="say"]');await tap('#runBtn');await pause(500);
    await check('Touch input builds and runs a block quest',`!document.querySelector('.mobileNext').disabled`);
    await tap('.mobileNext');await check('Phone next control opens a fresh quest',`document.querySelector('#levelTitle').textContent.includes('Level 2') && document.querySelectorAll('#blocksWorkspace .block').length===0`);
  },{agePack:'4-5',progressByPack:{}});
  await setup();
  const uncovered=inventory.filter(control=>!ctx.controlIds.has(control.id));
  fs.writeFileSync('component-results.json',JSON.stringify({runId:ctx.runId,cases,failed:cases.filter(item=>item.status==='failed').length,inventory,coveredIds:[...ctx.controlIds],uncovered},null,2));
  if(cases.some(item=>item.status==='failed'))throw Error('Component audit failed; see component-results.json');
};
