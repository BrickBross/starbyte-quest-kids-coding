// Arrange existing game controls without replacing their elements or listeners.
(() => {
  const byId = id => document.getElementById(id);
  const layout = document.querySelector('.layout');
  const [questPanel, buildPanel, stagePanel] = layout.children;
  questPanel.classList.add('questPanel');
  buildPanel.classList.add('buildPanel');
  stagePanel.classList.add('stagePanel');
  const mission = questPanel.firstElementChild;
  mission.classList.add('missionCard');
  const step = (text, number) => {
    const label = document.createElement('div');
    label.className = 'stepLabel';
    label.innerHTML = `<span>${number}</span>${text}`;
    return label;
  };
  mission.prepend(step('Meet your mission', '1'));
  const teaching = document.createElement('div');
  teaching.className = 'lessonTeaching';
  teaching.innerHTML = '<strong>Let’s learn first</strong><p id="lessonTeaching"></p><div id="lessonReference" class="lessonReference"></div>';
  mission.append(teaching);
  // Give the learner a single workspace next to the visible result.
  layout.prepend(mission);
  byId('blocksCard').prepend(step('Build your idea', '2'));
  document.querySelector('.editorCard').prepend(step('Build your idea', '2'));
  stagePanel.firstElementChild.prepend(step('See it come alive', '3'));
  const controls = mission.querySelector('.controls');
  controls.classList.add('runControls');
  buildPanel.append(controls);
  buildPanel.append(byId('statusBox'));
  const practice = document.createElement('div');
  practice.className = 'practiceSupport';
  practice.innerHTML = '<p id="attemptNote" aria-live="polite"></p><div id="practiceHelp" hidden><strong>Let’s think it through together.</strong><p>You’ve tried a few ideas. A clue can help you choose the next step. Your program stays just as you wrote it.</p><button id="practiceClueBtn" class="btn">💡 Help me with the next step</button></div>';
  buildPanel.append(practice);
  byId('practiceClueBtn').addEventListener('click', () => requestLessonHint());
  byId('statusBox').setAttribute('aria-atomic', 'true');
  const hint = mission.querySelector('.hint');
  const hintDetails = document.createElement('details');
  hintDetails.className = 'missionHint';
  hintDetails.innerHTML = '<summary>💡 I need a hint</summary>';
  hint.replaceWith(hintDetails); hintDetails.append(hint);
  const hintControls = document.createElement('div');
  hintControls.className = 'hintControls';
  hintControls.innerHTML = '<span id="hintProgress"></span><button id="moreClueBtn" class="btn small">Another clue →</button>';
  hintDetails.append(hintControls);
  byId('moreClueBtn').addEventListener('click', () => requestLessonHint());
  hintDetails.addEventListener('toggle', () => { if (hintDetails.open && lessonPractice.hintStep === 0) requestLessonHint(); });
  // Rewards stay available, but do not interrupt the current quest.
  const rewards = document.createElement('details');
  rewards.className = 'rewardDrawer';
  rewards.innerHTML = '<summary>⭐ My stickers & rewards <span>Open your collection →</span></summary>';
  const stickerCard = byId('stickerShelf').closest('.card');
  rewards.append(stickerCard);
  stagePanel.append(rewards);
  const story = document.createElement('details');
  story.className = 'rewardDrawer storyDrawer';
  story.innerHTML = '<summary>📖 Our adventure</summary><div id="storyCard" class="card"><button id="storyToggle" class="btn small" aria-pressed="true">Story: On</button><p id="storyText" class="tinyNote"></p></div>';
  stagePanel.append(story);
  const gameButtons = questPanel.firstElementChild;
  gameButtons.classList.add('gameButtons');
  stagePanel.firstElementChild.append(gameButtons);
  const mobileNext = document.createElement('button');
  mobileNext.className = 'btn success mobileNext';
  mobileNext.textContent = 'Next quest →';
  mobileNext.disabled = true;
  stagePanel.firstElementChild.append(mobileNext);
  new MutationObserver(() => { mobileNext.disabled = byId('nextBtn').disabled; }).observe(byId('nextBtn'), { attributes:true, attributeFilter:['disabled'] });
  const scrollTo = element => element.scrollIntoView({ block:'start', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  byId('runBtn').addEventListener('click', () => {
    if (matchMedia('(max-width:760px)').matches) queueMicrotask(() => scrollTo(stagePanel));
  });
  mobileNext.addEventListener('click', () => { byId('nextBtn').click(); scrollTo(mission); });
  questPanel.remove();
  const how = stagePanel.querySelector('.card.subtle');
  if (how) {
    how.className = 'playTip';
    how.innerHTML = '<span aria-hidden="true">✦</span> Change something, press Run, and see what happens. You can always try again!';
  }
  // Keep code visible in typing packs; generated code is optional in block mode.
  const codeCard = document.querySelector('.editorCard');
  const preview = document.createElement('details');
  preview.className = 'codePreview';
  preview.innerHTML = '<summary>⌨ Peek at the code</summary>';
  codeCard.replaceWith(preview); preview.append(codeCard);
  let previousBlocks = null;
  const syncMode = () => {
    const blocks = byId('agePackSelect').value === '4-5';
    document.body.classList.toggle('blockMode', blocks);
    if (!blocks) preview.open = true;
    else if (previousBlocks !== true) preview.open = false;
    previousBlocks = blocks;
    byId('runBtn').textContent = blocks ? '▶ Run my blocks' : '▶ Run my code';
    document.querySelector('.questBanner p').textContent = blocks ? 'Pick a block. Make it happen. See what you can create.' : 'Write a little code. Make it happen. See what you can create.';
  };
  byId('agePackSelect').addEventListener('change', syncMode);
  // loadLevel updates block-card visibility for imports, profiles, and lesson links too.
  new MutationObserver(syncMode).observe(byId('blocksCard'), { attributes:true, attributeFilter:['class'] });
  document.addEventListener('DOMContentLoaded', syncMode);
  byId('brandHome').addEventListener('click', event => { event.preventDefault(); byId('homeBtn').click(); });
  let launchingTile = false;
  byId('startBtn').addEventListener('click', () => { if (!launchingTile) selectTile('play'); });
  ['tilePlay','tileLearn','tileMake','tileTrophies'].forEach(id => {
    byId(id).addEventListener('click', () => {
      selectTile(({tilePlay:'play',tileLearn:'learn',tileMake:'make',tileTrophies:'trophies'})[id]);
      launchingTile = true; byId('startBtn').click(); launchingTile = false;
    });
  });
  // Close menu drawers after selecting an action or moving away.
  document.querySelectorAll('.menuDrawer').forEach(menu => {
    menu.addEventListener('toggle', () => {
      if (menu.open) document.querySelectorAll('.menuDrawer').forEach(other => { if (other !== menu) other.open = false; });
    });
    menu.addEventListener('click', event => { if (event.target.closest('button')) menu.open = false; });
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.menuDrawer')) document.querySelectorAll('.menuDrawer').forEach(menu => { menu.open = false; });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') document.querySelectorAll('.menuDrawer[open]').forEach(menu => { menu.open = false; menu.querySelector('summary').focus(); });
  });
  const labelBlocks = () => {
    byId('blocksPalette').querySelectorAll('.block').forEach(block => {
      block.setAttribute('role', 'button'); block.tabIndex = 0;
      block.setAttribute('aria-label', 'Add ' + block.querySelector('.left').textContent.trim() + ' block');
    });
    byId('blocksWorkspace').querySelectorAll('.block').forEach(block => {
      const name = block.querySelector('.left').textContent.trim();
      block.querySelectorAll('input,select').forEach(input => input.setAttribute('aria-label', name + ' value'));
      block.querySelector('.xbtn')?.setAttribute('aria-label', 'Remove ' + name + ' block');
    });
  };
  new MutationObserver(labelBlocks).observe(byId('blocksCard'), { childList:true, subtree:true });
  byId('blocksPalette').addEventListener('keydown', event => {
    if (event.target.matches('.block') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault(); event.target.click();
    }
  });
})();
