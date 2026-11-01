/* Starbyte Quest: browser-only, no external content.
   - Runs kid-friendly code in a sandbox iframe
   - 10 levels per age pack
   - Stickers & unlocks (emoji) + apply sticker to hero
   - Parent mode (local only, simple PIN)
   - Theme selector (CSS variables)
*/

const $ = (id) => document.getElementById(id);

const levelLabel = $("levelLabel");
const barInner = $("barInner");
const levelTitle = $("levelTitle");
const levelStory = $("levelStory");
const levelObjective = $("levelObjective");
const levelHint = $("levelHint");
const statusBox = $("statusBox");
const codeBox = $("codeBox");
const runBtn = $("runBtn");
const resetBtn = $("resetBtn");
const nextBtn = $("nextBtn");
const copyStarterBtn = $("copyStarterBtn");
const gameFrame = $("gameFrame");

const themeSelect = $("themeSelect");
const stickerPackSelect = $("stickerPackSelect");
const soundToggle = $("soundToggle");
const agePackSelect = $("agePackSelect");
const parentBtn = $("parentBtn");
const aboutBtn = $("aboutBtn");
const homeBtn = $("homeBtn");
const homeScreen = $("homeScreen");
const tilePlay = $("tilePlay");
const tileLearn = $("tileLearn");
const tileMake = $("tileMake");
const tileTrophies = $("tileTrophies");
const startBtn = $("startBtn");
const walkthroughBtn = $("walkthroughBtn");

const onboardModal = $("onboardModal");
const closeOnboardBtn = $("closeOnboardBtn");
const onboardSteps = $("onboardSteps");
const prevOnboardBtn = $("prevOnboardBtn");
const nextOnboardBtn = $("nextOnboardBtn");
const profilesBtn = $("profilesBtn");
const worldsBtn = $("worldsBtn");
const skillTreeBtn = $("skillTreeBtn");
const dailyBtn = $("dailyBtn");
const reportBtn = $("reportBtn");
const avatarBtn = $("avatarBtn");
const shareBtn = $("shareBtn");
const makerBtn = $("makerBtn");
const trophiesBtn = $("trophiesBtn");
const installBtn = $("installBtn");
const teacherBtn = $("teacherBtn");
const langSelect = $("langSelect");
const narrateBtn = $("narrateBtn");
const lockBtn = $("lockBtn");
const lockModal = $("lockModal");
const closeLockBtn = $("closeLockBtn");
const toggleFocusBtn = $("toggleFocusBtn");
const requestFullscreenBtn = $("requestFullscreenBtn");
const pinInput = $("pinInput");
const setPinBtn = $("setPinBtn");
const pinUnlockInput = $("pinUnlockInput");
const unlockBtn = $("unlockBtn");
const mathGateToggle = $("mathGateToggle");
const mathGateUnlockBtn = $("mathGateUnlockBtn");

const teacherModal = $("teacherModal");
const closeTeacherBtn = $("closeTeacherBtn");
const printLessonBtn = $("printLessonBtn");
const lessonGrid = $("lessonGrid");
const printTrophyCertBtn = $("printTrophyCertBtn");

const shareModal = $("shareModal");
const closeShareBtn = $("closeShareBtn");
const exportLinkBtn = $("exportLinkBtn");
const importLinkBtn = $("importLinkBtn");
const shareBox = $("shareBox");
const shareModeLabel = $("shareModeLabel");
const qrCanvas = $("qrCanvas");

const makerModal = $("makerModal");
const closeMakerBtn = $("closeMakerBtn");
const makerKind = $("makerKind");
const makerSeconds = $("makerSeconds");
const makerGoal = $("makerGoal");
const makerPalette = $("makerPalette");
const makerWorkspace = $("makerWorkspace");
const makerEmpty = $("makerEmpty");
const makerRunBtn = $("makerRunBtn");
const makerClearBtn = $("makerClearBtn");

const trophiesModal = $("trophiesModal");
const closeTrophiesBtn = $("closeTrophiesBtn");
const trophiesGrid = $("trophiesGrid");
const confettiEl = $("confetti");

const storyToggle = $("storyToggle");
const storyText = $("storyText");

const stickerShelf = $("stickerShelf");
const stickerNote = $("stickerNote");
const useStickerBtn = $("useStickerBtn");
const clearStickerBtn = $("clearStickerBtn");

const openMiniGamesBtn = $("openMiniGamesBtn");
const openCertificateBtn = $("openCertificateBtn");

const miniGamesModal = $("miniGamesModal");
const closeMiniGamesBtn = $("closeMiniGamesBtn");
const miniGamesList = $("miniGamesList");

const certificateModal = $("certificateModal");
const closeCertificateBtn = $("closeCertificateBtn");
const certNameInput = $("certNameInput");
const certName = $("certName");
const certPack = $("certPack");
const certStars = $("certStars");
const certDate = $("certDate");
const printCertBtn = $("printCertBtn");
const certArea = $("certArea");

const albumModal = $("albumModal");
const profilesModal = $("profilesModal");
const closeProfilesBtn = $("closeProfilesBtn");
const newProfileName = $("newProfileName");
const addProfileBtn = $("addProfileBtn");
const profilesGrid = $("profilesGrid");

const worldsModal = $("worldsModal");
const closeWorldsBtn = $("closeWorldsBtn");
const worldsGrid = $("worldsGrid");

const skillTreeModal = $("skillTreeModal");
const closeSkillTreeBtn = $("closeSkillTreeBtn");
const skillTreeGrid = $("skillTreeGrid");

const dailyModal = $("dailyModal");
const closeDailyBtn = $("closeDailyBtn");
const dailyTitle = $("dailyTitle");
const dailyDesc = $("dailyDesc");
const startDailyBtn = $("startDailyBtn");
const claimDailyBtn = $("claimDailyBtn");
const dailyStatus = $("dailyStatus");

const reportModal = $("reportModal");
const closeReportBtn = $("closeReportBtn");
const reportArea = $("reportArea");
const reportProfile = $("reportProfile");
const reportWorld = $("reportWorld");
const reportStars = $("reportStars");
const reportLevels = $("reportLevels");
const reportSkills = $("reportSkills");
const reportDate = $("reportDate");
const printReportBtn = $("printReportBtn");

const avatarModal = $("avatarModal");
const closeAvatarBtn = $("closeAvatarBtn");
const avatarGrid = $("avatarGrid");
const closeAlbumBtn = $("closeAlbumBtn");
const albumGrid = $("albumGrid");

const parentPanel = $("parentPanel");

const blocksCard = $("blocksCard");
const blocksPalette = $("blocksPalette");
const blocksWorkspace = $("blocksWorkspace");
const blocksEmpty = $("blocksEmpty");
const blocksRunBtn = $("blocksRunBtn");
const blocksUndoBtn = $("blocksUndoBtn");
const blocksClearBtn = $("blocksClearBtn");
const coachText = $("coachText");
const ttsToggle = $("ttsToggle");
const guidedToggle = $("guidedToggle");
const nextHintBtn = $("nextHintBtn");
const jumpLevelInput = $("jumpLevelInput");
const jumpLevelBtn = $("jumpLevelBtn");
const unlockAllStickersBtn = $("unlockAllStickersBtn");
const resetProgressBtn = $("resetProgressBtn");
const clearCacheBtn = $("clearCacheBtn");

const editStory = $("editStory");
const editObjective = $("editObjective");
const editHint = $("editHint");
const applyEditsBtn = $("applyEditsBtn");
const revertEditsBtn = $("revertEditsBtn");

const dashGrid = $("dashGrid");

const newLevelTitle = $("newLevelTitle");
const newLevelStory = $("newLevelStory");
const newLevelObjective = $("newLevelObjective");
const newLevelHint = $("newLevelHint");
const newLevelStarter = $("newLevelStarter");
const newLevelCheck = $("newLevelCheck");
const addLevelBtn = $("addLevelBtn");
const clearCustomLevelsBtn = $("clearCustomLevelsBtn");

const insertRow = $("insertRow");

let currentLevel = 0;
let lastState = null;
let activeRun = null;
let runSequence = 0;
let makerRunning = false;
let selectedStickerId = null;

let blocksProgram = []; // array of block objects for Ages 4–5
let draggingBlockType = null;

const STORAGE_KEY = "starbyteQuest.v1";
const APP_VERSION = "2026-11-01.1";

// ---------------------- Skill Tree / Badges ----------------------
const SKILLS = [
  { id:"talker", name:"Talker", emoji:"💬", desc:"Used say() at least 3 times", need:{talk:3} },
  { id:"mover",  name:"Mover",  emoji:"➡️", desc:"Moved around 10 times", need:{move:10} },
  { id:"star",   name:"Star Maker", emoji:"⭐", desc:"Created 10 stars", need:{stars:10} },
  { id:"looper", name:"Loop Master", emoji:"🔁", desc:"Used repeat() 3 times", need:{loops:3} },
  { id:"button", name:"Button Boss", emoji:"🎛️", desc:"Wired buttons 3 times", need:{buttons:3} },
  { id:"vars",   name:"Variable Wizard", emoji:"🧠", desc:"Used variables 3 times", need:{vars:3} },
  { id:"func",   name:"Function Hero", emoji:"🧩", desc:"Wrote functions 2 times", need:{funcs:2} },
  { id:"rand",   name:"Random Ranger", emoji:"🎲", desc:"Used randomInt() 2 times", need:{random:2} },
];

let ensuringProfile = false;

// ---------------------- Themes (generic, kid-friendly) ----------------------
const THEMES = {
  candy:    { bg:"#0b1020", accent:"#ff6bd6", accent2:"#6be2ff", chip:"#ffd35a" },
  ocean:    { bg:"#071427", accent:"#2ce28c", accent2:"#44a7ff", chip:"#60f0ff" },
  jungle:   { bg:"#061a14", accent:"#39f08b", accent2:"#9bff5a", chip:"#ffd35a" },
  space:    { bg:"#0a0618", accent:"#b67cff", accent2:"#59f7ff", chip:"#ffd35a" },
  sunset:   { bg:"#1a0a06", accent:"#ffb84d", accent2:"#ff4d8a", chip:"#ffd35a" },
  rainbow:  { bg:"#0b1020", accent:"#ff4d8a", accent2:"#59f7ff", chip:"#ffd35a" },

  fairy:    { bg:"#07141a", accent:"#7cffb2", accent2:"#ff7cf6", chip:"#ffd35a" },
  icecream: { bg:"#0b1020", accent:"#a7fffb", accent2:"#ffb6d9", chip:"#ffd35a" },
  dino:     { bg:"#05150c", accent:"#9bff5a", accent2:"#39f08b", chip:"#ffd35a" },
  pirate:   { bg:"#0c0b06", accent:"#ffb84d", accent2:"#ff4d8a", chip:"#ffd35a" },
  castle:   { bg:"#0b0818", accent:"#b67cff", accent2:"#6be2ff", chip:"#ffd35a" },
  neon:     { bg:"#05040e", accent:"#59f7ff", accent2:"#ff4d8a", chip:"#ffd35a" }
};

function applyTheme(themeName){
  const t = THEMES[themeName] || THEMES.candy;
  const root = document.documentElement;
  root.style.setProperty("--bg", t.bg);
  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--accent2", t.accent2);
  root.style.setProperty("--chip", t.chip);
  sendGameCommand('theme', t);
  // also tint background gradients a bit by letting CSS use variables (already does)
}

// ---------------------- Stickers & unlocks ----------------------
// Packs are emoji-only (no external images).
const STICKER_PACKS = {
  mix: [
    { id:"sparkle", emoji:"✨", need:0,  name:"Sparkle" },
    { id:"unicorn", emoji:"🦄", need:3,  name:"Unicorn" },
    { id:"dragon",  emoji:"🐉", need:5,  name:"Dragon" },
    { id:"rocket",  emoji:"🚀", need:7,  name:"Rocket" },
    { id:"robot",   emoji:"🤖", need:9,  name:"Robot" },
    { id:"trophy",  emoji:"🏆", need:10, name:"Trophy" },
    { id:"star",    emoji:"🌟", need:12, name:"Star" },
    { id:"crown",   emoji:"👑", need:14, name:"Crown" },
    { id:"cat",     emoji:"🐱", need:16, name:"Cat" },
    { id:"rainbow", emoji:"🌈", need:18, name:"Rainbow" },
  ],
  animals: [
    { id:"puppy", emoji:"🐶", need:0, name:"Puppy" },
    { id:"kitty", emoji:"🐱", need:2, name:"Kitty" },
    { id:"bunny", emoji:"🐰", need:4, name:"Bunny" },
    { id:"panda", emoji:"🐼", need:6, name:"Panda" },
    { id:"fox",   emoji:"🦊", need:8, name:"Fox" },
    { id:"koala", emoji:"🐨", need:10, name:"Koala" },
    { id:"dino",  emoji:"🦖", need:12, name:"Dino" },
    { id:"whale", emoji:"🐳", need:14, name:"Whale" },
    { id:"octo",  emoji:"🐙", need:16, name:"Octopus" },
    { id:"butter",emoji:"🦋", need:18, name:"Butterfly" },
  ],
  fantasy: [
    { id:"sparkle2", emoji:"✨", need:0, name:"Sparkle" },
    { id:"fairy",    emoji:"🧚", need:2, name:"Fairy" },
    { id:"unicorn2", emoji:"🦄", need:4, name:"Unicorn" },
    { id:"mermaid",  emoji:"🧜", need:6, name:"Mermaid" },
    { id:"dragon2",  emoji:"🐉", need:8, name:"Dragon" },
    { id:"crown2",   emoji:"👑", need:10, name:"Crown" },
    { id:"castle",   emoji:"🏰", need:12, name:"Castle" },
    { id:"wand",     emoji:"🪄", need:14, name:"Magic Wand" },
    { id:"rainbow2", emoji:"🌈", need:16, name:"Rainbow" },
    { id:"star2",    emoji:"🌟", need:18, name:"Star" },
  ],
  space: [
    { id:"rocket2", emoji:"🚀", need:0, name:"Rocket" },
    { id:"planet",  emoji:"🪐", need:2, name:"Planet" },
    { id:"alien",   emoji:"👽", need:4, name:"Alien" },
    { id:"moon",    emoji:"🌙", need:6, name:"Moon" },
    { id:"star3",   emoji:"⭐", need:8, name:"Star" },
    { id:"comet",   emoji:"☄️", need:10, name:"Comet" },
    { id:"astro",   emoji:"🧑‍🚀", need:12, name:"Astronaut" },
    { id:"robot2",  emoji:"🤖", need:14, name:"Robot" },
    { id:"ufo",     emoji:"🛸", need:16, name:"UFO" },
    { id:"galaxy",  emoji:"🌌", need:18, name:"Galaxy" },
  ],
  sweet: [
    { id:"donut",  emoji:"🍩", need:0, name:"Donut" },
    { id:"cupcake",emoji:"🧁", need:2, name:"Cupcake" },
    { id:"ice",    emoji:"🍦", need:4, name:"Ice Cream" },
    { id:"cookie", emoji:"🍪", need:6, name:"Cookie" },
    { id:"candy",  emoji:"🍬", need:8, name:"Candy" },
    { id:"pizza",  emoji:"🍕", need:10, name:"Pizza" },
    { id:"burger", emoji:"🍔", need:12, name:"Burger" },
    { id:"fries",  emoji:"🍟", need:14, name:"Fries" },
    { id:"pop",    emoji:"🍿", need:16, name:"Popcorn" },
    { id:"cake",   emoji:"🍰", need:18, name:"Cake" },
  ],
  achieve: [
    { id:"medal", emoji:"🏅", need:0, name:"Medal" },
    { id:"trophy2",emoji:"🏆", need:2, name:"Trophy" },
    { id:"target",emoji:"🎯", need:4, name:"Target" },
    { id:"light", emoji:"💡", need:6, name:"Bright Idea" },
    { id:"brain", emoji:"🧠", need:8, name:"Big Brain" },
    { id:"crown3",emoji:"👑", need:10, name:"Crown" },
    { id:"star4", emoji:"🌟", need:12, name:"Star" },
    { id:"fire",  emoji:"🔥", need:14, name:"On Fire" },
    { id:"check", emoji:"✅", need:16, name:"All Done" },
    { id:"party", emoji:"🥳", need:18, name:"Party" },
  ],
};

function getActiveStickers(){
  const pack = readActiveProfile().stickerPack || "mix";
  return STICKER_PACKS[pack] || STICKER_PACKS.mix;
}

function renderStickers(){
  const state = readActiveProfile();
  updateProfileIdentity();
  const stars = state.progressStars || 0;
  const unlockedAll = !!state.parentUnlockAllStickers;

  stickerShelf.innerHTML = "";
  getActiveStickers().forEach(s => {
    const unlocked = unlockedAll || stars >= s.need;
    const div = document.createElement("div");
    div.className = "sticker" + (unlocked ? "" : " locked") + (selectedStickerId === s.id ? " selected" : "");
    div.title = unlocked ? `${s.name} (unlocked)` : `${s.name} (need ${s.need}⭐)`;
    div.textContent = s.emoji;

    div.addEventListener("click", () => {
      if (!unlocked) return;
      selectedStickerId = s.id;
      useStickerBtn.disabled = false;
      renderStickers();
      stickerNote.textContent = `Selected: ${s.name}. Click "Use Sticker" to put it on the hero.`;
    });

    stickerShelf.appendChild(div);
  });

  if (!selectedStickerId){
    useStickerBtn.disabled = true;
    stickerNote.textContent = `You have ${stars}⭐ total. Keep going to unlock more! (Tip: double-tap stickers to open the album.)`;
  }
}

function getSelectedStickerEmoji(){
  const s = getActiveStickers().find(x => x.id === selectedStickerId) || Object.values(STICKER_PACKS).flat().find(x => x.id === selectedStickerId);
  return s ? s.emoji : null;
}

// ---------------------- Sound (Web Audio) ----------------------
let audioCtx = null;
function ensureAudio(){
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}
function playSound(type){
  const st = loadState();
  if (!st.soundOn) return;
  try{
    ensureAudio();
    const t0 = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const presets = {
      click:   { f: 440, dur: 0.05 },
      star:    { f: 660, dur: 0.08 },
      success: { f: 880, dur: 0.12 },
      fail:    { f: 220, dur: 0.10 },
      open:    { f: 520, dur: 0.06 },
    };
    const p = presets[type] || presets.click;

    osc.type = "sine";
    osc.frequency.setValueAtTime(p.f, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.25, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + p.dur);

    osc.start(t0);
    osc.stop(t0 + p.dur + 0.02);
  }catch{}
}

function updateSoundButton(){
  const on = !!loadState().soundOn;
  soundToggle.setAttribute("aria-pressed", String(on));
  soundToggle.textContent = on ? "Sound: On 🔊" : "Sound: Off 🔇";
}

soundToggle.addEventListener("click", async () => {
  const st = loadState();
  saveState({ soundOn: !st.soundOn });
  updateSoundButton();
  playSound("open");
});

// ---------------------- Save / Load (local browser only) ----------------------
function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { theme:"candy", agePack:"7-8", stickerPack:"mix", soundOn:false, ttsOn:false, guidedBlocks:true, parentMode:false, lang:"en", narrationOn:false, progressByPack:{}, progressStars:0, parentUnlockAllStickers:false, editsByPack:{}, customLevelsByPack:{}, skillsByPack:{}, profilesById:{}, activeProfileId:"default", worldId:"candy", storyOn:true, historyLog:[], avatar:{ base:"🙂", hat:"", pet:"" } };
    const parsed = JSON.parse(raw);
    // basic shape
    parsed.progressByPack ||= {};
    parsed.editsByPack ||= {};
    return parsed;
  }catch{
    return { theme:"candy", agePack:"7-8", stickerPack:"mix", soundOn:false, ttsOn:false, guidedBlocks:true, parentMode:false, lang:"en", narrationOn:false, progressByPack:{}, progressStars:0, parentUnlockAllStickers:false, editsByPack:{}, customLevelsByPack:{}, skillsByPack:{}, profilesById:{}, activeProfileId:"default", worldId:"candy", storyOn:true, historyLog:[], avatar:{ base:"🙂", hat:"", pet:"" } };
  }
}
function saveState(patch){
  const st = loadState();
  const next = { ...st, ...patch };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

function getPackProgress(packId){
  const st = readActiveProfile();
  const p = st.progressByPack?.[packId] || { maxLevelCompleted: -1 };
  return p;
}
function setPackProgress(packId, patch){
  const st = readActiveProfile();
  const next = { ...(st.progressByPack || {}) };
  next[packId] = { ...(next[packId] || { maxLevelCompleted:-1 }), ...patch };
  writeActiveProfile({ progressByPack: next });
}

// ---------------------- Modals ----------------------
function showModal(el){
  hideHome();
  el.classList.add("show");
  el.setAttribute("aria-hidden", "false");
  playSound("open");
}
function hideModal(el){
  el.classList.remove("show");
  el.setAttribute("aria-hidden", "true");
}

closeMiniGamesBtn.addEventListener("click", () => hideModal(miniGamesModal));
closeCertificateBtn.addEventListener("click", () => hideModal(certificateModal));
closeAlbumBtn.addEventListener("click", () => hideModal(albumModal));

openMiniGamesBtn.addEventListener("click", () => {
  renderMiniGames();
  showModal(miniGamesModal);
});
openCertificateBtn.addEventListener("click", () => {
  renderCertificate();
  showModal(certificateModal);
});

// Double click sticker shelf opens album
stickerShelf.addEventListener("dblclick", () => {
  renderAlbum();
  showModal(albumModal);
});

function renderAlbum(){
  const st = readActiveProfile();
  const stars = st.progressStars || 0;
  const unlockedAll = !!st.parentUnlockAllStickers;
  const pack = st.stickerPack || "mix";
  const list = STICKER_PACKS[pack] || STICKER_PACKS.mix;

  albumGrid.innerHTML = "";
  list.forEach(s => {
    const unlocked = unlockedAll || stars >= s.need;
    const div = document.createElement("div");
    div.className = "albumSticker" + (unlocked ? "" : " locked");
    div.innerHTML = `<span class="emo">${s.emoji}</span><b>${s.name}</b><div class="tinyNote">${unlocked ? "Unlocked" : `Need ${s.need}⭐`}</div>`;
    albumGrid.appendChild(div);
  });

}

function renderCertificate(){
  const st = readActiveProfile();
  const packId = agePackSelect.value;
  const prog = getPackProgress(packId);
  const completed = (prog.maxLevelCompleted ?? -1) >= (getLevelsWithEdits(packId).length - 1);

  certName.textContent = (certNameInput.value || "Awesome Coder").trim() || "Awesome Coder";
  certPack.textContent = `Ages ${packId} Pack`;
  certStars.textContent = String(st.progressStars || 0);
  certDate.textContent = new Date().toLocaleDateString();

  // Stamp
  const existing = certArea.querySelector(".certStamp");
  if (existing) existing.remove();
  if (completed){
    const stamp = document.createElement("div");
    stamp.className = "certStamp";
    stamp.textContent = "COMPLETED ✅";
    certArea.appendChild(stamp);
  }
}

certNameInput.addEventListener("input", renderCertificate);

printCertBtn.addEventListener("click", () => {
  renderCertificate();
  // Print just the certificate area
  const w = window.open("", "_blank");
  if (!w) return alert("Popup blocked. Allow popups to print.");
  const html = `
<!doctype html><html><head><meta charset="utf-8" />
<title>Starbyte Quest Certificate</title>
<style>
  body{font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; padding:16px; background:#fff;}
  .cert{max-width:900px; margin:0 auto; border:2px solid #111; border-radius:18px; padding:20px; text-align:center;}
  .certTop{font-weight:900; letter-spacing:.5px; margin-bottom:10px;}
  .certBig{font-weight:900; font-size:26px; margin:6px 0 10px;}
  .certLine{color:#333; margin-top:8px;}
  .certName{font-weight:900; font-size:30px; margin-top:8px;}
  .certPack{font-weight:800; font-size:16px; margin-top:6px;}
  .certStars{font-weight:900; font-size:20px; margin-top:6px;}
  .certFooter{display:flex; justify-content:space-between; margin-top:16px; color:#333; font-size:12px;}
  .certStamp{display:inline-block; margin-top:10px; padding:6px 10px; border-radius:999px; border:2px solid #1a7f37; background:#d1fadf; font-weight:900;}
</style>
</head><body>${certArea.outerHTML}</body></html>`;
  w.document.open(); w.document.write(html); w.document.close();
  w.focus();
  w.print();
});

function renderDashboard(){
  if (!isParentMode()) { dashGrid.innerHTML = ""; return; }
  const st = readActiveProfile();
  const packs = ["4-5","6-7","7-8","9-10"];
  dashGrid.innerHTML = "";
  packs.forEach(pid => {
    const prog = getPackProgress(pid);
    const levelsCount = getLevelsWithEdits(pid).length;
    const done = Math.min(levelsCount, (prog.maxLevelCompleted ?? -1) + 1);
    const skills = st.skillsByPack?.[pid] || {};
    const card = document.createElement("div");
    card.className = "dashCard";
    card.innerHTML = `
      <h4>Ages ${pid}</h4>
      <div class="dashRow"><span>Levels completed</span><b>${done}/${levelsCount}</b></div>
      <div class="dashRow"><span>Loops used</span><b>${skills.loops||0}</b></div>
      <div class="dashRow"><span>Buttons wired</span><b>${skills.buttons||0}</b></div>
      <div class="dashRow"><span>Variables used</span><b>${skills.vars||0}</b></div>
      <div class="dashRow"><span>Functions used</span><b>${skills.funcs||0}</b></div>
      <div class="dashRow"><span>Random used</span><b>${skills.random||0}</b></div>
    `;
    dashGrid.appendChild(card);
  });
}

// ---------------------- Parent mode (simple PIN) ----------------------
function pinHash(pin){
  // light obfuscation only (local app). Not meant as real security.
  return String(pin).trim().toLowerCase().split("").reverse().join("") + "::sbq";
}
function isParentMode(){
  return !!loadState().parentMode;
}
function setParentMode(on){
  saveState({ parentMode: !!on });
  parentPanel.classList.toggle("enabled", !!on);
  parentBtn.textContent = on ? "Parent Mode: On" : "Parent Mode: Off";
  renderStickers();
  refreshParentEditors();
  renderDashboard();
}

function toggleParentMode(){
  const st = loadState();
  const existing = st.parentPinHash;

  if (st.parentMode){
    setParentMode(false);
    return;
  }

  if (!existing){
    const pin = prompt("Set a Parent PIN (4+ digits). This stays only on this device:");
    if (!pin || String(pin).trim().length < 4) return alert("PIN needs to be at least 4 characters.");
    saveState({ parentPinHash: pinHash(pin) });
    alert("Parent PIN set! Now click Parent Mode again to unlock.");
    return;
  }

  const attempt = prompt("Enter Parent PIN:");
  if (!attempt) return;
  if (pinHash(attempt) === existing){
    setParentMode(true);
  } else {
    alert("Wrong PIN.");
  }
}

// ---------------------- Level packs (Ages 4–10) ----------------------
function makePack_4_5(){
  return [
    L("Talk!", "Your hero is sleepy. Say hello to wake them up!",
      "Use say(\"...\") to make the hero talk.",
      "Try: say(\"Hello!\")",
`// Level 1
say("Hello!");`,
      s => ok(s.messages?.some(message=>message.trim()), "Nice talking! ✅", "Add say(\"...\") then Run.")
    ),
    L("Colour!", "Paint time! Pick your favourite colour.",
      "Change colour with setColor(\"pink\") (or any word).",
      "Try: setColor(\"blue\")",
`// Level 2
setColor("blue");`,
      s => ok(!!s.colorChanged, "Beautiful colour! 🎨✅", "Use setColor(\"...\") then Run.")
    ),
    L("Move Right", "A cookie is on the right. Go get it!",
      "Move right with moveRight(100).",
      "Try: moveRight(120)",
`// Level 3
moveRight(120);`,
      s => ok(s.x >= 220, "You reached the cookie! 🍪✅", "Try a bigger number in moveRight(...).")
    ),
    L("Move Left", "Oops, it rolled left!",
      "Move left with moveLeft(80).",
      "Try: moveLeft(80)",
`// Level 4
moveLeft(80);`,
      s => ok(s.moves?.left > 0 && s.x <= 120, "Got it! ✅", "Use moveLeft(...).")
    ),
    L("Big Hero", "Be big like a dinosaur!",
      "Make the hero bigger with setSize(120).",
      "Try: setSize(140)",
`// Level 5
setSize(140);`,
      s => ok(s.size >= 120, "ROAR! 🦖✅", "Use setSize(120+).")
    ),
    L("Stars!", "Stars are fun. Add one star.",
      "Call addStar() at least once.",
      "Try: addStar()",
`// Level 6
addStar();`,
      s => ok(s.stars >= 1, "Shiny! ⭐✅", "Call addStar(); then Run.")
    ),
    L("Two Stars", "Can you add two stars?",
      "Add at least 2 stars.",
      "Try: addStar(); addStar();",
`// Level 7
addStar();
addStar();`,
      s => ok(s.stars >= 2, "Two stars! ⭐⭐✅", "Add two stars.")
    ),
    L("Move Up", "A balloon is above you!",
      "Move up with moveUp(60).",
      "Try: moveUp(80)",
`// Level 8
moveUp(80);`,
      s => ok(s.y <= 180, "Balloon reached! 🎈✅", "Use moveUp(...).")
    ),
    L("Say + Star", "Tell the star it’s pretty.",
      "Use say(...) AND addStar().",
      "Try both lines then Run",
`// Level 9
say("Pretty star!");
addStar();`,
      s => ok((s.messages?.length||0) >= 1 && s.stars >= 1, "A talking star! ✅", "Add say(...) and addStar().")
    ),
    L("Finish!", "Final mini quest: move and talk!",
      "Say something AND move right.",
      "Try say(...) then moveRight(...).",
`// Level 10
say("I did it!");
moveRight(120);`,
      s => ok((s.messages?.length||0) >= 1 && s.x >= 220, "You finished Ages 4–5! 🎉✅", "Say something and move right.")
    )
  ];
}

function makePack_6_7(){
  return [
    L("Talk!", "Code Land opens when you say the magic words.",
      "Use say(\"...\") at least once.",
      "Try: say(\"I can code!\")",
`// Level 1
say("Hello!");
say("I can code!");
say("Let’s explore!");`,
      s => ok((s.messages?.filter(message=>message.trim()).length||0) >= 3, "Three messages! You taught your hero to talk. ✅", "Add three messages, then Run.")
    ),
    L("Colour Magic", "Choose your hero colour.",
      "Use setColor(\"...\").",
      "Try: setColor(\"purple\")",
`// Level 2
say("Colour time!");
setColor("purple");`,
      s => ok(!!s.colorChanged, "Great colour! ✅", "Use setColor(\"...\").")
    ),
    L("Move Right", "Walk to the treasure.",
      "Move right using moveRight(120).",
      "Try: moveRight(140)",
`// Level 3
moveRight(140);`,
      s => ok(s.x >= 240, "Treasure reached! ✅", "Try a bigger moveRight number.")
    ),
    L("Two Moves", "Go right, then up.",
      "Use moveRight(...) AND moveUp(...).",
      "Try: moveRight(80); moveUp(60);",
`// Level 4
moveRight(90);
moveUp(70);`,
      s => ok(s.x >= 190 && s.y <= 190, "Perfect two-step! ✅", "Do one right and one up.")
    ),
    L("Make Stars", "Stars are points!",
      "Add 3 stars using repeat(3, () => { addStar(); }).",
      "Use repeat(3, () => { addStar(); });",
`// Level 5
repeat(3, () => {
  addStar();
});`,
      s => ok(s.loopStars >= 3, "Stars! ⭐⭐⭐✅", "Use a loop to make three stars.")
    ),
    L("Button A", "Make your hero respond to a button.",
      "Wire button A to moveRight(60).",
      "onButton(\"A\", () => { moveRight(60); });",
`// Level 6
say("Press A!");
onButton("A", () => {
  moveRight(60);
});`,
      s => ok(s.buttonEffects?.A?.right > 0, "You made A move your hero! ✅", "Connect A to a right move, Run, then press A.")
    ),
    L("B Button", "Now wire button B to add a star.",
      "When you press B, addStar().",
      "onButton(\"B\", () => { addStar(); });",
`// Level 7
say("Press B!");
onButton("B", () => {
  addStar();
});`,
      s => ok(s.buttonEffects?.B?.stars > 0, "B makes a star! ✅", "Connect B to a star, Run, then press B.")
    ),
    L("Variables", "Use a variable called steps.",
      "Create steps then moveRight(steps).",
      "let steps = 90; moveRight(steps);",
`// Level 8
let steps = 90;
moveRight(steps);`,
      s => ok(!!s.usedVariableSteps && s.moves?.right > 0, "Variable used! ✅", "Make sure you use moveRight(steps).")
    ),
    L("Size + Colour", "Power up your hero style!",
      "Use setSize(120) and setColor(\"...\")",
      "Try both lines then Run",
`// Level 9
setSize(130);
setColor("pink");`,
      s => ok(s.size >= 120 && s.colorChanged, "Styled up! ✅", "Use setSize(120+) and setColor(...).")
    ),
    L("Random Surprise", "Make 1–3 stars randomly.",
      "Use randomInt(1,3) and repeat.",
      "let n = randomInt(1,3); repeat(n, () => addStar());",
`// Level 10
let n = randomInt(1, 3);
repeat(n, () => addStar());`,
      s => ok(s.lastRandom?.min===1 && s.lastRandom?.max===3 && s.stars===s.lastRandom.value && s.loopStars===s.stars, "Random win! 🎉✅", "Use randomInt(1,3) and repeat.")
    ),
  ];
}

function makePack_7_8(){
  // The “recommended” pack: 10 levels covering events/loops/vars/functions/random
  return [
    L("Talk!", "Your hero woke up in Starbyte City. Say hello so the world knows you’re here!",
      "Make the hero say something using say(\"...\").",
      "Try: say(\"Hi! I’m coding!\")",
`// Level 1
say("Hi!");
say("I'm learning code!");
say("What shall we make?");`,
      s => ok((s.messages?.filter(message=>message.trim()).length||0) >= 3, "Three messages! You taught your hero to talk. ✅", "Add three messages in one program, then Run.")
    ),
    L("Colour Magic", "A rainbow cloud floats by. Pick a colour to power-up your hero!",
      "Change the hero colour using setColor(\"pink\") (or any colour).",
      "Try: setColor(\"purple\")",
`// Level 2
say("I can change colour!");
setColor("pink");`,
      s => ok(!!s.colorChanged, "Colour changed! 🌈✅", "Use setColor(\"...\") then Run.")
    ),
    L("Move Right", "There’s a shiny button on the right. Move over to it!",
      "Move the hero right using moveRight(80) (or more).",
      "Try: moveRight(120)",
`// Level 3
say("Going right!");
moveRight(120);`,
      s => ok(s.x >= 220, "You moved right! 🏃➡️✅", "Not far enough — try a bigger number in moveRight(...).")
    ),
    L("Two Moves", "A flying cookie is above you. Go up and right to catch it!",
      "Move right AND up (two commands).",
      "Try: moveRight(80) then moveUp(60)",
`// Level 4
say("Two moves!");
moveRight(80);
moveUp(80);`,
      s => ok(s.x >= 180 && s.y <= 180, "Great! Two directions. ✅", "Do two moves: one right and one up. Then Run.")
    ),
    L("Bigger Hero", "A giant door appears. You need to power up!",
      "Make the hero bigger using setSize(120) (or more) and say something.",
      "Try: setSize(140)",
`// Level 5
say("POWER UP!");
setSize(140);`,
      s => ok(s.size >= 120 && (s.messages?.length||0) >= 1, "Big hero unlocked! 💪✅", "Use setSize(120+) and say(\"...\").")
    ),
    L("Stars!", "Stars give you points. Let’s add 3 stars using a loop!",
      "Create at least 3 stars using repeat(3, () => { addStar(); }).",
      "repeat(3, () => { addStar(); });",
`// Level 6
say("Stars incoming!");
repeat(3, () => {
  addStar();
});`,
      s => ok(s.loopStars >= 3, "Stars collected! ⭐⭐⭐✅", "Make three stars using a loop.")
    ),
    L("Button A", "Now your hero listens to YOU. Press A to move!",
      "Make Button A move the hero right when pressed.",
      "onButton(\"A\", () => { moveRight(60); });",
`// Level 7
say("Press A to move!");
onButton("A", () => {
  moveRight(60);
});`,
      s => ok(s.buttonEffects?.A?.right > 0, "You made A move your hero! ✅", "Connect A to a right move, Run, then press A.")
    ),
    L("Variables", "A secret number powers your hero. Let’s use a variable!",
      "Create a variable called steps and use it to move right.",
      "let steps = 50; moveRight(steps);",
`// Level 8
say("Variables are magic!");
let steps = 90;
moveRight(steps);`,
      s => ok(!!s.usedVariableSteps && s.moves?.right > 0, "Variable used! 🧠✅", "Make sure you have let steps = ...; then moveRight(steps);")
    ),
    L("Functions", "Teach the computer a trick and reuse it. That’s a function!",
      "Create a function named jump() that moves up then down, and call it.",
      "function jump(){ moveUp(60); moveDown(60); } jump();",
`// Level 9
say("I can make my own commands!");

function jump() {
  moveUp(70);
  moveDown(70);
}

jump();`,
      s => ok(!!s.calledJumpFunction && s.moves?.up > 0 && s.moves?.down > 0, "Function jump() worked! 🚀✅", "Make jump() and call it: jump();")
    ),
    L("Random Surprise", "Final level! Create a surprise using randomness!",
      "Use randomInt(1, 5) to add that many stars.",
      "let n = randomInt(1,5); repeat(n, () => addStar());",
`// Level 10
say("Random surprise time!");

let n = randomInt(1, 5);
repeat(n, () => {
  addStar();
});

say("I made " + n + " star(s)!");`,
      s => ok(s.lastRandom?.min===1 && s.lastRandom?.max===5 && s.stars===s.lastRandom.value && s.loopStars===s.stars, "You finished Ages 7–8! 🎉✅", "Use randomInt(1,5) and create that many stars.")
    )
  ];
}

function makePack_9_10(){
  return [
    L("Talk + Variables", "Older kids pack: show a message and use variables.",
      "Use a variable name and say(\"Hi \" + name).",
      "let name = \"Ava\"; say(\"Hi \" + name);",
`// Level 1
let name = "Coder";
say("Hi " + name + "!");`,
      s => ok(s.usedGreetingVariable && (s.messages?.length||0) >= 1, "Nice string + variable! ✅", "Use a variable and say with +.")
    ),
    L("Coordinates", "Move to a spot using a few moves.",
      "Use moveRight and moveDown to reach the lower-right.",
      "Try moveRight(180); moveDown(120);",
`// Level 2
moveRight(180);
moveDown(120);`,
      s => ok(s.x >= 300 && s.y >= 300, "Great navigation! ✅", "Go further down and right.")
    ),
    L("Loop Pattern", "Make a star line using a loop.",
      "Use repeat(5, ...) to add 5 stars.",
      "repeat(5, () => { addStar(); });",
`// Level 3
repeat(5, () => {
  addStar();
});`,
      s => ok(s.loopStars >= 5, "Loop complete! ✅", "Use a loop to add five stars.")
    ),
    L("Event Control", "Wire A to moveRight and B to moveLeft.",
      "Use onButton for A and B.",
      "Two onButton(...) blocks.",
`// Level 4
onButton("A", () => { moveRight(50); });
onButton("B", () => { moveLeft(50); });`,
      s => ok(s.buttonEffects?.A?.right > 0 && s.buttonEffects?.B?.left > 0, "Great controls! ✅", "Connect and test both A and B.")
    ),
    L("Function Builder", "Write a function to draw a square path.",
      "Make function square() and call it.",
      "Use moves inside the function.",
`// Level 5
function square(){
  moveRight(60);
  moveDown(60);
  moveLeft(60);
  moveUp(60);
}
square();`,
      s => ok(s.calledSquareFunction && s.moves?.right > 0 && s.moves?.down > 0 && s.moves?.left > 0 && s.moves?.up > 0, "Square path complete! ✅", "Write square() and call it to move in all four directions.")
    ),
    L("Random Game", "Make random stars and say how many.",
      "Use randomInt(3,8), repeat, and say.",
      "let n = randomInt(3,8); repeat(n,...); say(...);",
`// Level 6
let n = randomInt(3, 8);
repeat(n, () => addStar());
say("Stars: " + n);`,
      s => ok(s.lastRandom?.min===3 && s.lastRandom?.max===8 && s.stars===s.lastRandom.value && s.loopStars===s.stars && s.messages?.some(message => message.includes(String(s.stars))), "Random game complete! ✅", "Use randomInt(3,8), repeat, and say how many stars.")
    ),
    L("Size Rules", "Change size based on a number.",
      "Use if (n > 5) setSize(140) else setSize(90).",
      "Add an if/else.",
`// Level 7
let n = randomInt(1, 10);
if (n > 5) {
  setSize(140);
} else {
  setSize(90);
}
say("n was " + n);`,
      s => ok(s.usedIfElse && s.lastRandom?.min===1 && s.lastRandom?.max===10 && s.size===(s.lastRandom.value>5 ? 140 : 90), "Conditional logic! ✅", "Use if/else with a random number.")
    ),
    L("Multi-event", "Wire C to add 2 stars with a loop.",
      "onButton(\"C\", () => repeat(2, () => addStar()));",
      "Use onButton + repeat.",
`// Level 8
onButton("C", () => {
  repeat(2, () => addStar());
});`,
      s => ok(s.buttonEffects?.C?.stars >= 2 && s.buttonEffects?.C?.loops > 0, "C creates stars with a loop! ✅", "Connect C, then test its star loop.")
    ),
    L("Challenge", "Make a little dance move using a function.",
      "Write function dance() and call it twice.",
      "dance(); dance();",
`// Level 9
function dance(){
  moveLeft(20);
  moveRight(40);
  moveLeft(20);
}
dance();
dance();`,
      s => ok(s.calledDanceFunction && s.moves?.left >= 4 && s.moves?.right >= 2, "Dance party! ✅", "Make a function and call it twice.")
    ),
    L("Finish!", "Final challenge: style + movement + stars.",
      "Use setColor, setSize, move, and add at least 3 stars.",
      "Do 4 different kinds of actions.",
`// Level 10
setColor("pink");
setSize(130);
moveRight(120);
repeat(3, () => addStar());
say("I beat the challenge pack!");`,
      s => ok(s.colorChanged && s.size >= 120 && s.x >= 220 && s.stars >= 3, "Ages 9–10 finished! 🏆✅", "Do colour + size + move + 3 stars.")
    )
  ];
}

function getPack(packId){
  if (packId === "4-5") return makePack_4_5();
  if (packId === "6-7") return makePack_6_7();
  if (packId === "9-10") return makePack_9_10();
  return makePack_7_8();
}

// Helper to create levels
function L(title, story, objective, hint, starter, validate){
  return { title, story, objective, hint, starter, validate };
}
function ok(condition, goodMsg, badMsg){
  return condition ? { ok:true, message:goodMsg } : { ok:false, message:badMsg };
}

// ---------------------- Iframe HTML template ----------------------
function buildGameSrcdoc(userCode) {
  const safeCode = JSON.stringify(userCode).replace(/</g, "\\u003c");
  const theme = THEMES[themeSelect.value] || THEMES.candy;

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
  :root{--bg:${theme.bg};--accent2:${theme.accent2}}
  html,body{height:100%; margin:0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;}
  body{
    background: radial-gradient(900px 500px at 30% 0%, rgba(255,255,255,.12), transparent 60%), var(--bg, #0a0f22);
    color:#e9ecff;
  }
  .stage{
    height:100%;
    display:grid;
    grid-template-rows: 1fr auto;
  }
  .play{
    position:relative;
    overflow:hidden;
    border-radius:16px;
    margin:12px;
    background: rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.12);
  }
  .hud{
    margin: 0 12px 12px;
    padding:10px 12px;
    border-radius:14px;
    background: rgba(0,0,0,.22);
    border:1px solid rgba(255,255,255,.12);
    display:flex; gap:14px; flex-wrap:wrap;
    font-size:14px;
  }
  .hero{
    position:absolute;
    left:120px; top:220px;
    width:80px; height:80px;
    border-radius:22px;
    background: var(--accent2, #7f8cff);
    border:2px solid rgba(255,255,255,.25);
    box-shadow: 0 18px 40px rgba(0,0,0,.25);
    display:grid; place-items:center;
    font-weight:900;
    user-select:none;
  }
  .bubble{
    position:absolute;
    left:0; top:-52px;
    background: rgba(255,255,255,.92);
    color:#0a0f22;
    padding:8px 10px;
    border-radius:14px;
    min-width: 120px;
    max-width: 220px;
    font-weight:900;
    font-size:13px;
    box-shadow: 0 10px 30px rgba(0,0,0,.25);
  }
  .stickerOnHero{
    position:absolute;
    right:-8px; bottom:-8px;
    width:40px; height:40px;
    border-radius:16px;
    background: rgba(255,255,255,.9);
    display:grid; place-items:center;
    font-size:22px;
    color:#0a0f22;
    box-shadow: 0 10px 26px rgba(0,0,0,.25);
    border:1px solid rgba(0,0,0,.12);
  }
  .star{
    position:absolute;
    width:24px; height:24px;
    border-radius:8px;
    background: rgba(255,211,90,.95);
    display:grid; place-items:center;
    font-weight:900;
    color:#0a0f22;
    border:1px solid rgba(0,0,0,.15);
  }
</style>
</head>
<body>
  <div class="stage">
    <div class="play" id="play">
      <div class="hero" id="hero"><span class="face">☺</span></div>
    </div>
    <div class="hud" id="hud">
      <div><b>Stars:</b> <span id="starsCount">0</span></div>
      <div><b>X:</b> <span id="xVal">0</span></div>
      <div><b>Y:</b> <span id="yVal">0</span></div>
    </div>
  </div>

<script>
(() => {
  const hero = document.getElementById("hero");
  const play = document.getElementById("play");
  const starsCountEl = document.getElementById("starsCount");
  const xVal = document.getElementById("xVal");
  const yVal = document.getElementById("yVal");

  const runId = ${activeRun?.id ?? 0};
  let executing = true;
  let loopDepth = 0;
  const state = {
    x: 120,
    y: 220,
    size: 80,
    color: getComputedStyle(document.documentElement).getPropertyValue("--accent2") || "#7f8cff",
    messages: [],
    moves: { right:0, left:0, up:0, down:0 },
    stars: 0,
    colorChanged: false,
    usedVariableSteps: false,
    calledJumpFunction: false,
    usedRandomInt: false,
    buttonWires: { A:false, B:false, C:false },
    buttonEffects: {},
    testedButtons: {},
    loopRuns: 0,
    loopStars: 0,
    sticker: null
  };

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function render() {
    const scale = Math.min(play.clientWidth / 520, play.clientHeight / 440, 1);
    hero.style.left = (state.x * scale) + "px";
    hero.style.top = (state.y * scale) + "px";
    hero.style.width = (state.size * scale) + "px";
    hero.style.height = (state.size * scale) + "px";
    hero.style.background = state.color;
    starsCountEl.textContent = String(state.stars);
    xVal.textContent = String(state.x);
    yVal.textContent = String(state.y);
  }

  new ResizeObserver(render).observe(play);

  function clearBubble() {
    const b = hero.querySelector(".bubble");
    if (b) b.remove();
  }

  function setSticker(emoji){
    const existing = hero.querySelector(".stickerOnHero");
    if (existing) existing.remove();
    if (!emoji) return;
    const div = document.createElement("div");
    div.className = "stickerOnHero";
    div.textContent = emoji;
    hero.appendChild(div);
  }

  function addBubble(text) {
    clearBubble();
    const div = document.createElement("div");
    div.className = "bubble";
    div.textContent = text;
    hero.appendChild(div);
  }

  // -------- Kid API (simple functions) --------
  window.say = (text) => {
    if (text === undefined) throw Error('Put your message inside the say parentheses.');
    const t = String(text);
    state.messages.push(t);
    addBubble(t);
    sendState();
  };

  window.setColor = (color) => {
    if (!CSS.supports('color', String(color))) throw Error('Choose a valid colour word or colour code.');
    state.color = String(color);
    state.colorChanged = true;
    render();
    sendState();
  };

  window.setSize = (px) => {
    const n = Number(px);
    if (Number.isFinite(n)) state.size = clamp(Math.round(n), 40, 160);
    render();
    sendState();
  };

  window.moveRight = (px) => {
    state.moves.right++;
    const n = Number(px);
    if (Number.isFinite(n)) state.x = clamp(state.x + Math.round(n), 0, 520 - state.size);
    render();
    sendState();
  };
  window.moveLeft = (px) => {
    state.moves.left++;
    const n = Number(px);
    if (Number.isFinite(n)) state.x = clamp(state.x - Math.round(n), 0, 520 - state.size);
    render();
    sendState();
  };
  window.moveUp = (px) => {
    state.moves.up++;
    const n = Number(px);
    if (Number.isFinite(n)) state.y = clamp(state.y - Math.round(n), 0, 440 - state.size);
    render();
    sendState();
  };
  window.moveDown = (px) => {
    state.moves.down++;
    const n = Number(px);
    if (Number.isFinite(n)) state.y = clamp(state.y + Math.round(n), 0, 440 - state.size);
    render();
    sendState();
  };

  window.addStar = () => {
    state.stars += 1;
    if (loopDepth > 0) state.loopStars++;
    const s = document.createElement("div");
    s.className = "star";
    s.textContent = "★";
    const pad = 10;
    const maxX = Math.max(pad, play.clientWidth - 24 - pad);
    const maxY = Math.max(pad, play.clientHeight - 24 - pad);
    const rx = pad + Math.floor(Math.random() * (maxX - pad + 1));
    const ry = pad + Math.floor(Math.random() * (maxY - pad + 1));
    s.style.left = rx + "px";
    s.style.top = ry + "px";
    play.appendChild(s);
    render();
    sendState();
  };

  window.celebrate = () => { say("You did it! 🎉"); setColor("gold"); };
  window.startMiniGame = (kind, options = {}) => {
    const seconds = Math.max(10, Math.min(90, Number(options.seconds) || 30));
    const goal = Math.max(1, Math.min(50, Number(options.goal) || 10));
    let score = 0, remaining = seconds, ended = false;
    const label = document.createElement("div");
    label.style.cssText = "position:absolute;top:8px;left:8px;z-index:5;background:#0a0f22;padding:8px;border-radius:8px";
    play.appendChild(label);
    const update = () => { label.textContent = "Score: " + score + " / " + goal + " • " + remaining + "s"; };
    update();
    const spawn = setInterval(() => {
      if (ended) return;
      const target = document.createElement("button");
      target.textContent = kind === "starcatch" ? "⭐" : "🎯";
      target.style.cssText = "position:absolute;width:44px;height:44px;font-size:24px;border:0;border-radius:12px;cursor:pointer;z-index:4";
      target.style.left = Math.random() * Math.max(0, play.clientWidth - 44) + "px";
      target.style.top = 44 + Math.random() * Math.max(0, play.clientHeight - 88) + "px";
      play.appendChild(target);
      target.onclick = () => { if (ended) return; score++; update(); target.remove(); if (score >= goal) finish(); };
      setTimeout(() => target.remove(), 1400);
    }, 450);
    const timer = setInterval(() => { remaining--; update(); if (remaining <= 0) finish(); }, 1000);
    function finish(){
      if (ended) return;
      ended = true; clearInterval(spawn); clearInterval(timer);
      label.textContent = (score >= goal ? "Goal reached! 🎉 " : "Time up! ") + "Score: " + score;
      parent.postMessage({ type:"MINIGAME_DONE", kind, score }, "*");
    }
  };

  window.repeat = (times, fn) => {
    state.loopRuns++;
    const n = Number(times);
    const count = (Number.isFinite(n) ? Math.max(0, Math.min(40, Math.floor(n))) : 0);
    loopDepth++;
    try { for (let i = 0; i < count; i++) fn(); } finally { loopDepth--; }
    sendState();
  };

  window.onButton = (name, fn) => {
    const key = String(name).toUpperCase();
    if (key === "A" || key === "B" || key === "C") {
      state.buttonWires[key] = true;
      window.__buttonHandlers[key] = fn;
      sendState();
    }
  };

  window.randomInt = (min, max) => {
    state.usedRandomInt = true;
    const a = Math.floor(Number(min));
    const b = Math.floor(Number(max));
    const lo = Math.min(a,b);
    const hi = Math.max(a,b);
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) throw Error('randomInt needs two number limits.');
    const r = lo + Math.floor(Math.random() * (hi - lo + 1));
    state.lastRandom = {min:lo,max:hi,value:r};
    return r;
  };

  // Called by parent:
  window.__buttonHandlers = { A:null, B:null, C:null };
  window.__pressButton = (key) => {
    const k = String(key).toUpperCase();
    state.testedButtons[k] = true;
    const fn = window.__buttonHandlers[k];
    if (typeof fn === "function") {
      const before = { ...state.moves, stars:state.stars, loops:state.loopRuns };
      executing = true;
      try { fn(); } finally { executing = false; }
      state.buttonEffects[k] = {
        right:state.moves.right - before.right, left:state.moves.left - before.left,
        stars:state.stars - before.stars, loops:state.loopRuns - before.loops
      };
    }
    sendState();
  };

  window.__setAvatar = (base, hat, pet) => {
    state.avatar = { base: base||'🙂', hat: hat||'', pet: pet||'' };
    // update visuals
    let face = hero.querySelector('.face');
    if (!face){ face = document.createElement('span'); face.className = 'face'; hero.prepend(face); }
    face.textContent = state.avatar.base || '🙂';
    setSticker(state.sticker);
    // hat/pet elements
    let hatEl = document.getElementById('hat');
    let petEl = document.getElementById('pet');
    if (!hatEl){ hatEl = document.createElement('div'); hatEl.id='hat'; hatEl.style.position='absolute'; hatEl.style.left='0'; hatEl.style.top='-22px'; hatEl.style.width='100%'; hatEl.style.textAlign='center'; hatEl.style.fontSize='20px'; hero.appendChild(hatEl); }
    if (!petEl){ petEl = document.createElement('div'); petEl.id='pet'; petEl.style.position='absolute'; petEl.style.right='-26px'; petEl.style.bottom='-6px'; petEl.style.fontSize='20px'; hero.appendChild(petEl); }
    hatEl.textContent = state.avatar.hat || '';
    petEl.textContent = state.avatar.pet || '';
    sendState();
  };

  window.__applySticker = (emoji) => {
    state.sticker = emoji || null;
    setSticker(state.sticker);
    sendState();
  };
  window.__setTheme = (theme) => {
    document.documentElement.style.setProperty('--bg', theme.bg);
    document.documentElement.style.setProperty('--accent2', theme.accent2);
    if (!state.colorChanged) state.color = theme.accent2;
    render();
  };

  window.__placeSticker = (emoji, x, y) => {
    if (!emoji) return;
    const d = document.createElement('div');
    d.className = 'stickerOnHero';
    d.style.right = 'auto';
    d.style.bottom = 'auto';
    d.style.left = Math.max(0, Math.min(play.clientWidth-40, Math.floor(x)-20)) + 'px';
    d.style.top = Math.max(0, Math.min(play.clientHeight-40, Math.floor(y)-20)) + 'px';
    d.textContent = emoji;
    d.style.position = 'absolute';
    d.style.background = 'rgba(255,255,255,.9)';
    play.appendChild(d);
    sendState();
  };

  function sendState(extraError) {
    const payload = { type: "STATE", runId, complete: !executing, state: { ...state }, error: extraError || null };
    parent.postMessage(payload, "*");
  }

  render();
  sendState();

  window.addEventListener("message", (event) => {
    if (event.source !== parent || event.data?.type !== "GAME_COMMAND") return;
    const { command, args = [] } = event.data;
    const allowed = { press: window.__pressButton, sticker: window.__applySticker, place: window.__placeSticker, avatar: window.__setAvatar, theme:window.__setTheme };
    try { if (allowed[command]) allowed[command](...args); } catch (err) { sendState(String(err.message || err)); }
  });
  play.addEventListener("pointerdown", (event) => {
    if (event.shiftKey && state.sticker) {
      const rect = play.getBoundingClientRect();
      window.__placeSticker(state.sticker, event.clientX - rect.left, event.clientY - rect.top);
    }
  });
  try {
    eval(${safeCode});
  } catch (err) {
    sendState(String(err && err.message ? err.message : err));
  }

  executing = false;
  sendState();
})();
</script>
</body>
</html>`;
}

function bumpSkill(packId, patch){
  const st = readActiveProfile();
  const skillsByPack = { ...(st.skillsByPack || {}) };
  const cur = { ...(skillsByPack[packId] || {}) };
  for (const k of Object.keys(patch)){
    cur[k] = (cur[k] || 0) + patch[k];
  }
  skillsByPack[packId] = cur;
  writeActiveProfile({ skillsByPack });
}

function detectSkillsFromCode(code){
  return {
    loops: /repeat\s*\(/.test(code) ? 1 : 0,
    buttons: /onButton\s*\(/.test(code) ? 1 : 0,
    vars: /let\s+\w+/.test(code) ? 1 : 0,
    funcs: /function\s+\w+\s*\(/.test(code) ? 1 : 0,
    random: /randomInt\s*\(/.test(code) ? 1 : 0,
  };
}

function sendGameCommand(command, ...args){
  gameFrame.contentWindow.postMessage({ type:"GAME_COMMAND", command, args }, "*");
}
gameFrame.addEventListener("load", applyAvatar);

// ---------------------- Runner / Messaging ----------------------
window.addEventListener("message", (ev) => {
  if (ev.source !== gameFrame.contentWindow || !ev.data || ev.data.type !== "STATE") return;
  if (!activeRun || ev.data.runId !== activeRun.id || activeRun.maker || activeRun.failed) return;
  if (activeRun.packId !== agePackSelect.value || activeRun.level !== currentLevel || activeRun.profileId !== loadState().activeProfileId) return;
  lastState = ev.data.state;
  const err = ev.data.error;

  if (err) {
    activeRun.failed = true;
    setStatus(`⚠️ Code error: ${err}`, "warn");
    nextBtn.disabled = true;
    recordLessonAttempt(activeRun);
    return;
  }
  if (!ev.data.complete) return;

  const packId = agePackSelect.value;
  const levels = getLevelsWithEdits(packId);
  const result = levels[currentLevel].validate(lastState);

  if (result.ok) {
    setStatus(result.message, "good");
    nextBtn.disabled = false;
    document.getElementById('attemptNote').textContent = "You worked it out! Try a different idea, or choose Next quest when you’re ready.";
    document.getElementById('practiceHelp').hidden = true;

    // Update progress: completed this level
    const prog = getPackProgress(packId);
    if (currentLevel > (prog.maxLevelCompleted ?? -1)) {
      setPackProgress(packId, { maxLevelCompleted: currentLevel });
      // earn 1⭐ per new level completion
      const st = readActiveProfile();
      writeActiveProfile({ progressStars: (st.progressStars || 0) + 1 });
      renderStickers();
      // Skills tracking (approx)
      const sk = detectSkillsFromCode(codeBox.value || "");
      bumpSkill(packId, sk);
      renderDashboard();
      playSound("success");
  try{ maybeUnlockTrophies(true); }catch{}
      // Badge metrics
      const bm = detectBadgeFromCode(codeBox.value || "");
      Object.entries(bm).forEach(([k,v]) => { if (v) bumpBadgeMetric(k, v); });
      // History
      logHistory({ type:"LEVEL_COMPLETE", packId, level: currentLevel, starsEarned: 1 });
      // Daily check refresh
      try{ renderDaily(); }catch{}
    }
  } else {
    const guide = getLessonGuide(packId, currentLevel, levels[currentLevel]);
    if (guide.topics.includes('event') && Object.values(lastState.buttonWires || {}).some(Boolean) && !Object.keys(lastState.testedButtons || {}).length) {
      setStatus("Your program is running. Press the mission’s A, B or C button in your little world to test it. Need help? Ask for a clue.", "neutral");
      nextBtn.disabled = true;
      return;
    }
    setStatus(lessonFeedback(lastState, guide), "neutral");
    nextBtn.disabled = true;
    recordLessonAttempt(activeRun);
  }
});

function setStatus(text, kind) {
  statusBox.textContent = text;
  statusBox.style.borderColor =
    kind === "good" ? "rgba(44,226,140,.45)" :
    kind === "warn" ? "rgba(255,211,90,.45)" :
    kind === "bad"  ? "rgba(255,93,122,.45)" :
                      "rgba(255,255,255,.12)";
}

// Concept detection (simple heuristics)
function buildWrappedUserCode(raw) {
  let wrapped = raw;

  const usedSteps = /(?:let|const)\s+steps\s*=/.test(raw) && /moveRight\s*\(\s*steps\s*\)/.test(raw);
  const hasJumpDef = /function\s+jump\s*\(/.test(raw);
  const callsJump = /jump\s*\(\s*\)\s*;/.test(raw);

  const flags = [];
  const variableNames = Array.from(raw.matchAll(/(?:let|const|var)\s+([A-Za-z_$][\w$]*)\s*=/g), match => match[1]);
  if (variableNames.some(name => new RegExp('say\\s*\\([^)]*\\b' + name + '\\b').test(raw))) flags.push('state.usedGreetingVariable = true;');
  if (/function\s+square\s*\(/.test(raw) && /square\s*\(\s*\)\s*;/.test(raw)) flags.push('state.calledSquareFunction = true;');
  if (/function\s+dance\s*\(/.test(raw) && (raw.match(/dance\s*\(\s*\)\s*;/g)||[]).length>=2) flags.push('state.calledDanceFunction = true;');
  if (/\bif\s*\(/.test(raw) && /\belse\b/.test(raw)) flags.push('state.usedIfElse = true;');
  if (usedSteps) flags.push("state.usedVariableSteps = true;");
  if (hasJumpDef && callsJump) flags.push("state.calledJumpFunction = true;");

  if (flags.length) {
    wrapped += `\n// (Auto-check flags)\ntry { ${flags.join(" ")} } catch(e) { }\n`;
  }
  return wrapped;
}

function runCode() {
  if (agePackSelect.value === "4-5" && !makerRunning) codeBox.value = blocksToProgramCode();
  activeRun = { id: ++runSequence, packId: agePackSelect.value, level: currentLevel, profileId: loadState().activeProfileId, failed: false, maker: makerRunning };
  const raw = codeBox.value || "";
  const wrapped = buildWrappedUserCode(raw);
  const srcdoc = buildGameSrcdoc(wrapped);
  gameFrame.srcdoc = srcdoc;
  setStatus("Running…", "neutral");
  nextBtn.disabled = true;
}

// ---------------------- Level edits per pack (Parent Mode) ----------------------
function getLevelsWithEdits(packId){
  const base = getPack(packId);
  const st = readActiveProfile();
  const edits = st.editsByPack?.[packId] || {};
  // apply edits by level index if present
  const edited = base.map((lvl, idx) => {
    const e = edits[String(idx)];
    if (!e) return lvl;
    return { ...lvl, story: e.story ?? lvl.story, objective: e.objective ?? lvl.objective, hint: e.hint ?? lvl.hint, lessonEdits:e };
  });

  const custom = getCustomLevels(packId).map((c) => ({
    title: c.title,
    story: c.story,
    objective: c.objective,
    hint: c.hint,
    starter: c.starter,
    validate: buildCustomValidate(c.checkRule)
  }));
  custom.forEach((level,index) => {
    const edit = edits[String(base.length + index)];
    if (edit) Object.assign(level, {story:edit.story ?? level.story, objective:edit.objective ?? level.objective, hint:edit.hint ?? level.hint});
  });

  return [...edited, ...custom];
}

function saveEditForCurrentLevel(){
  const packId = agePackSelect.value;
  const st = readActiveProfile();
  const editsByPack = { ...(st.editsByPack || {}) };
  const packEdits = { ...(editsByPack[packId] || {}) };
  packEdits[String(currentLevel)] = {
    story: editStory.value,
    objective: editObjective.value,
    hint: editHint.value
  };
  editsByPack[packId] = packEdits;
  writeActiveProfile({ editsByPack });
}

function revertEditForCurrentLevel(){
  const packId = agePackSelect.value;
  const st = readActiveProfile();
  const editsByPack = { ...(st.editsByPack || {}) };
  const packEdits = { ...(editsByPack[packId] || {}) };
  delete packEdits[String(currentLevel)];
  editsByPack[packId] = packEdits;
  writeActiveProfile({ editsByPack });
}

function refreshParentEditors(){
  if (!isParentMode()) return;
  const packId = agePackSelect.value;
  const levels = getLevelsWithEdits(packId);
  editStory.value = levels[currentLevel].story;
  editObjective.value = levels[currentLevel].objective;
  editHint.value = levels[currentLevel].hint;
}

// ---------------------- UI / Level control ----------------------
function loadLevel(i) {
  const packId = agePackSelect.value;
  const levels = getLevelsWithEdits(packId);

  currentLevel = Math.max(0, Math.min(levels.length - 1, i));
  const lvl = levels[currentLevel];
  lessonPractice = { attempts:0, hintStep:0 };

  levelTitle.textContent = `Level ${currentLevel + 1}: ${lvl.title}`;
  levelStory.textContent = lvl.story;
  levelObjective.textContent = lvl.objective;
  levelHint.textContent = lvl.hint;

  levelLabel.textContent = `Level ${currentLevel + 1} of ${levels.length} • Pack ${packId}`;
  barInner.style.width = `${Math.round(((currentLevel) / (levels.length)) * 100)}%`;

  blocksProgram = [];
  makerRunning = false;
  codeBox.value = "";
  updateModeForPack();
  if (agePackSelect.value === "4-5"){
    // Keep blocks as the source of truth
    renderBlocksWorkspace();
  }
  nextBtn.disabled = true;
  setStatus("Read the mini-lesson, then try your own idea. Clues are here if you need them.", "neutral");
  refreshParentEditors();
  lastState = null;
  activeRun = null;
  gameFrame.srcdoc = buildGameSrcdoc("");
  renderStory();
  renderLessonTeaching(lvl);
}

runBtn.addEventListener("click", runCode);
resetBtn.addEventListener("click", () => loadLevel(currentLevel));

copyStarterBtn.addEventListener("click", () => {
  requestLessonHint();
});

nextBtn.addEventListener("click", () => {
  const packId = agePackSelect.value;
  const levels = getLevelsWithEdits(packId);

  if (currentLevel < levels.length - 1) {
    loadLevel(currentLevel + 1);
    barInner.style.width = `${Math.round(((currentLevel) / (levels.length)) * 100)}%`;
  } else {
    setStatus("You finished this pack! 🎉 Try another age pack or collect stickers!", "good");
  }
});

// Wire buttons A/B/C to iframe presses:
document.querySelectorAll("[data-gamebtn]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-gamebtn");
    try {
      sendGameCommand("press", key);
      playSound("click");
    } catch (e) {
      setStatus("Press Run first, then try the buttons.", "warn");
    }
  });
});

// Stickers: apply to hero inside iframe
useStickerBtn.addEventListener("click", () => {
  const emoji = getSelectedStickerEmoji();
  if (!emoji) return;
  try {
    sendGameCommand("sticker", emoji);
    playSound("click");
  } catch (e) {
    setStatus("Press Run first, then apply a sticker.", "warn");
  }
});

clearStickerBtn.addEventListener("click", () => {
  selectedStickerId = null;
  renderStickers();
  try { sendGameCommand("sticker", null); } catch {}
});

// Theme & pack selectors
stickerPackSelect.addEventListener("change", () => {
  const name = stickerPackSelect.value;
  saveState({ stickerPack: name });
  writeActiveProfile({ stickerPack: name });
  selectedStickerId = null;
  renderStickers();
  renderAlbum();
});
themeSelect.addEventListener("change", () => {
  const name = themeSelect.value;
  saveState({ theme: name });
  writeActiveProfile({ theme: name });
  applyTheme(name);
  // Theme changes update the stage without executing or grading the child’s code.
});

agePackSelect.addEventListener("change", () => {
  updateModeForPack();
  const packId = agePackSelect.value;
  writeActiveProfile({ agePack: packId });
  const prog = getPackProgress(packId);
  // start at next uncompleted level (or 0)
  const start = Math.max(0, Math.min((prog.maxLevelCompleted ?? -1) + 1, getLevelsWithEdits(packId).length - 1));
  loadLevel(start);
});

// Parent mode button
parentBtn.addEventListener("click", toggleParentMode);
aboutBtn.addEventListener("click", () => { window.location.href = "./about.html"; });

// Parent panel actions
jumpLevelBtn.addEventListener("click", () => {
  if (!isParentMode()) return;
  const n = Number(jumpLevelInput.value);
  if (!Number.isFinite(n)) return;
  loadLevel(Math.max(0, n - 1));
});

unlockAllStickersBtn.addEventListener("click", () => {
  if (!isParentMode()) return;
  writeActiveProfile({ parentUnlockAllStickers: true });
  renderStickers();
  alert("All stickers unlocked on this device.");
});

resetProgressBtn.addEventListener("click", () => {
  if (!isParentMode()) return;
  if (!confirm("Reset all progress and stars on this device?")) return;
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith("starbyte_quest_profile_")) localStorage.removeItem(key);
  }
  localStorage.removeItem(STORAGE_KEY);
  initFromStorage();
  alert("Progress reset.");
});
clearCacheBtn?.addEventListener("click", () => {
  if (!confirm("Clear all local Starbyte Quest data on this device?")) return;
  try{ localStorage.removeItem(STORAGE_KEY); }catch{}
  try{
    for (let i = localStorage.length - 1; i >= 0; i--){
      const k = localStorage.key(i);
      if (k && k.startsWith("starbyte_quest_profile_")) localStorage.removeItem(k);
    }
  }catch{}
  location.reload();
});

// Parent edits
applyEditsBtn.addEventListener("click", () => {
  if (!isParentMode()) return;
  saveEditForCurrentLevel();
  loadLevel(currentLevel);
});

revertEditsBtn.addEventListener("click", () => {
  if (!isParentMode()) return;
  revertEditForCurrentLevel();
  loadLevel(currentLevel);
});

// ---------------------- Init ----------------------
function initFromStorage(){
  const st = readActiveProfile();
  themeSelect.value = st.theme || "candy";
  stickerPackSelect.value = st.stickerPack || "mix";
  agePackSelect.value = st.agePack || "7-8";
  applyTheme(themeSelect.value);
  updateSoundButton();
  updateModeForPack();

  setParentMode(!!loadState().parentMode);

  renderStickers();
  renderAlbum();
  renderDashboard();

  const packId = agePackSelect.value;
  const prog = getPackProgress(packId);
  const start = Math.max(0, Math.min((prog.maxLevelCompleted ?? -1) + 1, getLevelsWithEdits(packId).length - 1));
  loadLevel(start);
  updateProfileIdentity();
  applyLanguage();
}

window.addEventListener("DOMContentLoaded", () => { initFromStorage(); renderStory(); });
console.log("Starbyte Quest app version", APP_VERSION);


// ---------------------- Mini-games ----------------------
const MINI_GAMES = [
  { id:"starcatch", title:"Star Catch", need:0, desc:"Click falling stars as fast as you can!", run: runMiniGameStarCatch },
  { id:"targettap", title:"Target Tap", need:6, desc:"Tap targets that pop up around the screen.", run: runMiniGameTargetTap },
];

function renderMiniGames(){
  const st = readActiveProfile();
  const stars = st.progressStars || 0;
  miniGamesList.innerHTML = "";
  MINI_GAMES.forEach(g => {
    const unlocked = stars >= g.need || isParentMode();
    const tile = document.createElement("div");
    tile.className = "miniTile" + (unlocked ? "" : " miniTileLocked");
    tile.innerHTML = `
      <div class="miniTileTitle">${g.title}</div>
      <div class="tinyNote">${g.desc}</div>
      <div class="tinyNote">Unlock: ${g.need}⭐</div>
      <div class="controls" style="margin-top:10px;">
        <button class="btn small" ${unlocked ? "" : "disabled"} data-minirun="${g.id}">Play</button>
      </div>`;
    miniGamesList.appendChild(tile);
  });

  miniGamesList.querySelectorAll("[data-minirun]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-minirun");
      const g = MINI_GAMES.find(x => x.id === id);
      if (!g) return;
      hideModal(miniGamesModal);
      g.run();
    });
  });

}

function runMiniGameStarCatch(){
  playSound("open");
  gameFrame.srcdoc = buildMiniGameSrcdoc("starcatch");
  setStatus("Mini-game: Star Catch — click the stars!", "neutral");
}
function runMiniGameTargetTap(){
  playSound("open");
  gameFrame.srcdoc = buildMiniGameSrcdoc("targettap");
  setStatus("Mini-game: Target Tap — tap the targets!", "neutral");
}

function buildMiniGameSrcdoc(kind){
  return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
  <style>
    html,body{height:100%;margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;}
    body{background: radial-gradient(900px 500px at 30% 0%, rgba(255,255,255,.12), transparent 60%), var(--bg, #0a0f22); color:#e9ecff;}
    .wrap{height:100%;display:grid;grid-template-rows:1fr auto;}
    .play{position:relative;overflow:hidden;border-radius:16px;margin:12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);}
    .hud{margin:0 12px 12px;padding:10px 12px;border-radius:14px;background:rgba(0,0,0,.22);border:1px solid rgba(255,255,255,.12);display:flex;gap:14px;flex-wrap:wrap;font-size:14px;align-items:center;justify-content:space-between;}
    .btn{background:rgba(255,255,255,.07);color:#e9ecff;border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:8px 10px;font-weight:900;cursor:pointer}
    .obj{position:absolute;width:34px;height:34px;border-radius:14px;display:grid;place-items:center;font-weight:900;user-select:none;border:1px solid rgba(0,0,0,.15);box-shadow:0 14px 30px rgba(0,0,0,.25)}
  </style></head><body>
  <div class="wrap">
    <div class="play" id="play"></div>
    <div class="hud">
      <div><b>${kind==="starcatch" ? "Stars" : "Hits"}:</b> <span id="score">0</span></div>
      <div class="tiny"><span id="timer">20</span>s</div>
      <button class="btn" id="restart">Restart</button>
    </div>
  </div>
  <script>
    const play = document.getElementById("play");
    const scoreEl = document.getElementById("score");
    const timerEl = document.getElementById("timer");
    const restart = document.getElementById("restart");
    let score=0, t=20, tick=null, spawn=null;

    function rand(min,max){ return min + Math.random()*(max-min); }
    function spawnObj(){
      const d=document.createElement("div");
      d.className="obj";
      if (${JSON.stringify(kind)}==="starcatch"){
        d.textContent="★";
        d.style.background="rgba(255,211,90,.95)";
        d.style.left = rand(10, play.clientWidth-44) + "px";
        d.style.top = "-40px";
        const speed = rand(1.2, 2.6);
        let y=-40;
        const move = setInterval(()=>{
          y += speed*6;
          d.style.top = y+"px";
          if (y > play.clientHeight+60){ clearInterval(move); d.remove(); }
        }, 50);
        d.addEventListener("click", ()=>{
          score++; scoreEl.textContent=score;
          d.remove(); clearInterval(move);
        });
      } else {
        d.textContent="🎯";
        d.style.background="rgba(117,146,255,.85)";
        d.style.left = rand(10, play.clientWidth-44) + "px";
        d.style.top = rand(10, play.clientHeight-44) + "px";
        d.addEventListener("click", ()=>{
          score++; scoreEl.textContent=score;
          d.remove();
        });
        setTimeout(()=>{ if (d.isConnected) d.remove(); }, 900);
      }
      play.appendChild(d);
    }

    function start(){
      score=0; t=20;
      scoreEl.textContent=score; timerEl.textContent=t;
      play.innerHTML="";
      clearInterval(tick); clearInterval(spawn);
      spawn = setInterval(spawnObj, ${kind === "starcatch" ? 350 : 420});
      tick = setInterval(()=>{
        t--; timerEl.textContent=t;
        if (t<=0){
          clearInterval(tick); clearInterval(spawn);
          // report back to parent (stars as bonus)
          parent.postMessage({type:"MINIGAME_DONE", kind:${JSON.stringify(kind)}, score}, "*");
        }
      }, 1000);
    }
    restart.addEventListener("click", start);
    start();
  </script>
  </body></html>`;
}

window.addEventListener("message", (ev) => {
  if (ev.source === gameFrame.contentWindow && ev.data && ev.data.type === "MINIGAME_DONE" && Number.isFinite(ev.data.score)){
    const st = readActiveProfile();
    const bonus = Math.max(0, Math.min(5, Math.floor(ev.data.score/5))); // small bonus
    if (bonus > 0){
      writeActiveProfile({ progressStars: (st.progressStars||0) + bonus });
      renderStickers();
    }
    setStatus(`Mini-game finished! Score: ${ev.data.score}. Bonus ⭐: ${bonus}`, "good");
    if (bonus>0) logHistory({ type:"MINIGAME_BONUS", kind: ev.data.kind, bonus });
    playSound("success");
  try{ maybeUnlockTrophies(true); }catch{}

  }
}, { passive:true });


// ---------------------- Custom Levels (Parent Builder) ----------------------
function getCustomLevels(packId){
  const st = readActiveProfile();
  const list = st.customLevelsByPack?.[packId] || [];
  return Array.isArray(list) ? list : [];
}
function setCustomLevels(packId, list){
  const st = readActiveProfile();
  const customLevelsByPack = { ...(st.customLevelsByPack || {}) };
  customLevelsByPack[packId] = list;
  writeActiveProfile({ customLevelsByPack });
}

function buildCustomValidate(rule){
  const r = String(rule);
  return (s) => {
    if (r === "saidSomething") return ok((s.messages?.length||0) >= 1, "Nice! ✅", "Use say(\"...\") and Run.");
    if (r === "changedColor") return ok(!!s.colorChanged, "Colour changed! ✅", "Use setColor(\"...\") and Run.");
    if (r === "movedRight") return ok(s.x >= 220, "Moved right! ✅", "Use moveRight(120+) and Run.");
    if (r === "madeStars3") return ok(s.stars >= 3, "Stars made! ✅", "Make 3 stars (repeat or addStar).");
    if (r === "wiredA") return ok(!!s.buttonWires?.A, "Button A wired! ✅", "Use onButton(\"A\", () => {...}).");
    if (r === "usedRandom") return ok(!!s.usedRandomInt, "Random used! ✅", "Use randomInt(...) and Run.");
    return ok(true, "Done! ✅", "Try again.");
  };
}

addLevelBtn.addEventListener("click", () => {
  if (!isParentMode()) return;
  const packId = agePackSelect.value;
  const title = (newLevelTitle.value || "Custom Level").trim();
  const story = (newLevelStory.value || "Custom story").trim();
  const objective = (newLevelObjective.value || "Do something cool!").trim();
  const hint = (newLevelHint.value || "Try a small step first.").trim();
  const starter = (newLevelStarter.value || 'say("Hello!");').trim();
  const rule = newLevelCheck.value;

  const custom = getCustomLevels(packId);
  custom.push({
    title,
    story,
    objective,
    hint,
    starter,
    checkRule: rule
  });
  setCustomLevels(packId, custom);

  // clear fields
  newLevelTitle.value = "";
  newLevelStory.value = "";
  newLevelObjective.value = "";
  newLevelHint.value = "";
  newLevelStarter.value = "";

  alert("Custom level added! It appears after the built-in levels.");
  loadLevel(currentLevel); // refresh counts
});

clearCustomLevelsBtn.addEventListener("click", () => {
  if (!isParentMode()) return;
  if (!confirm("Clear all custom levels for this age pack on this device?")) return;
  const packId = agePackSelect.value;
  setCustomLevels(packId, []);
  const profile = readActiveProfile();
  const editsByPack = { ...(profile.editsByPack || {}) };
  editsByPack[packId] = Object.fromEntries(Object.entries(editsByPack[packId] || {}).filter(([index]) => Number(index) < getPack(packId).length));
  writeActiveProfile({editsByPack});
  alert("Custom levels cleared.");
  loadLevel(0);
});


// ---------------------- Insert Buttons (Young Learners) ----------------------
insertRow.querySelectorAll("[data-insert]").forEach(btn => {
  btn.addEventListener("click", () => {
    if (agePackSelect.value === '4-5') {
      const types = ['say','color','right','star','stars3'];
      const index = Array.from(insertRow.querySelectorAll('[data-insert]')).indexOf(btn);
      const block = defaultBlock(types[index]);
      if (block.type === 'right') block.px = 80;
      blocksProgram.push(block);
      renderBlocksWorkspace();
      return;
    }
    const text = btn.getAttribute("data-insert").replace(/\\+n/g, '\n');
    const current = codeBox.value || "";
    codeBox.value = current + (current.endsWith("\n") || current.length===0 ? "" : "\n") + text + "\n";
    playSound("click");
  });
});


// Place sticker on stage: hold Shift and click the Game Screen
gameFrame.addEventListener("load", () => {
  applyAvatar();
});
document.addEventListener("keydown", (e) => {
  // Just a hint in status when parent is placing
  if (e.key === "Shift") {
    // optional
  }
});
const gameWrap = document.querySelector(".gameWrap");
if (gameWrap){
  gameWrap.addEventListener("click", (ev) => {
    const emoji = getSelectedStickerEmoji();
    if (!emoji) return;
    if (!ev.shiftKey) return; // hold Shift to place on stage (prevents accidental)
    const rect = gameWrap.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    try{
      sendGameCommand("place", emoji, x, y);
      playSound("click");
      setStatus("Sticker placed! (Tip: hold Shift and click to place.)", "good");
    }catch{
      setStatus("Press Run first, then Shift+click to place stickers.", "warn");
    }
  });
}

stickerNote.addEventListener("click", () => {
  renderAlbum();
  showModal(albumModal);
});

document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener("click", (e) => {
    if (e.target === m) hideModal(m);
  });
});


// ---------------------- Block Mode (Ages 4–5) ----------------------
// For very young learners: drag/drop or tap blocks; blocks generate code.
const BLOCK_DEFS = [
  { type:"say", icon:"💬", label:"Say", fields:[{k:"text", kind:"text", placeholder:"Hello!", default:"Hello!"}] },
  { type:"color", icon:"🎨", label:"Colour", fields:[{k:"color", kind:"select", options:["pink","blue","purple","green","orange","yellow"], default:"pink"}] },
  { type:"right", icon:"➡️", label:"Move Right", fields:[{k:"px", kind:"number", placeholder:"80", default:120}] },
  { type:"left", icon:"⬅️", label:"Move Left", fields:[{k:"px", kind:"number", placeholder:"80", default:80}] },
  { type:"up", icon:"⬆️", label:"Move Up", fields:[{k:"px", kind:"number", placeholder:"60", default:80}] },
  { type:"down", icon:"⬇️", label:"Move Down", fields:[{k:"px", kind:"number", placeholder:"60", default:80}] },
  { type:"size", icon:"🦖", label:"Size", fields:[{k:"px", kind:"number", default:140}] },
  { type:"star", icon:"⭐", label:"Add Star", fields:[] },
  { type:"stars3", icon:"✨", label:"Add 3 Stars", fields:[] },
];

function defaultBlock(type){
  const d = BLOCK_DEFS.find(b => b.type === type);
  const obj = { type };
  (d?.fields || []).forEach(f => obj[f.k] = f.default);
  return obj;
}

function blockToCode(b){
  if (b.type === "say") return `say(${JSON.stringify(String(b.text ?? "Hello!"))});`;
  if (b.type === "color") return `setColor(${JSON.stringify(String(b.color||"pink"))});`;
  if (b.type === "right") return `moveRight(${Number.isFinite(Number(b.px)) ? Number(b.px) : 80});`;
  if (b.type === "left") return `moveLeft(${Number.isFinite(Number(b.px)) ? Number(b.px) : 80});`;
  if (b.type === "up") return `moveUp(${Number.isFinite(Number(b.px)) ? Number(b.px) : 60});`;
  if (b.type === "down") return `moveDown(${Number.isFinite(Number(b.px)) ? Number(b.px) : 60});`;
  if (b.type === "size") return `setSize(${Number(b.px) || 140});`;
  if (b.type === "star") return `addStar();`;
  if (b.type === "stars3") return `repeat(3, () => { addStar(); });`;
  return `// unknown block`;
}

function blocksToProgramCode(){
  const lines = blocksProgram.map(blockToCode);
  return `// Blocks Program (Ages 4–5)\n` + lines.join("\n");
}

function renderBlocksPalette(){
  blocksPalette.innerHTML = "";
  BLOCK_DEFS.forEach(def => {
    const el = document.createElement("div");
    el.className = "block";
    el.setAttribute("data-type", def.type);
    el.setAttribute("draggable", "true");
    el.innerHTML = `
      <div class="left">
        <div class="icon">${def.icon}</div>
        <div>${def.label}</div>
      </div>
      <div class="tinyNote">drag / tap</div>
    `;
    el.addEventListener("dragstart", (event) => {
      draggingBlockType = def.type;
      event.dataTransfer.setData('application/x-starbyte-block', def.type);
      event.dataTransfer.effectAllowed = 'copy';
    });
    el.addEventListener("click", () => {
      // tap to add
      blocksProgram.push(defaultBlock(def.type));
      renderBlocksWorkspace();
      playSound("click");
    });
    blocksPalette.appendChild(el);
  });
  highlightNextExpectedBlock();
}

function renderBlocksWorkspace(){
  blocksWorkspace.innerHTML = "";
  if (!blocksProgram.length){
    blocksWorkspace.appendChild(blocksEmpty);
  }
  blocksProgram.forEach((b, idx) => {
    const def = BLOCK_DEFS.find(x => x.type === b.type);
    const row = document.createElement("div");
    row.className = "block small";
    row.innerHTML = `
      <div class="left">
        <div class="icon">${def?.icon || "🧩"}</div>
        <div>${def?.label || b.type}</div>
      </div>
    `;
    // fields
    (def?.fields || []).forEach(f => {
      if (f.kind === "text" || f.kind === "number"){
        const inp = document.createElement("input");
        inp.type = f.kind === "number" ? "number" : "text";
        inp.placeholder = f.placeholder || "";
        inp.value = b[f.k] ?? f.default ?? "";
        inp.addEventListener("input", () => {
          b[f.k] = (inp.type === "number") ? Number(inp.value) : inp.value;
        });
        row.appendChild(inp);
      } else if (f.kind === "select"){
        const sel = document.createElement("select");
        (f.options||[]).forEach(opt => {
          const o = document.createElement("option");
          o.value = opt; o.textContent = opt;
          sel.appendChild(o);
        });
        sel.value = b[f.k] ?? f.default ?? (f.options?.[0] || "");
        sel.addEventListener("change", () => { b[f.k] = sel.value; });
        row.appendChild(sel);
      }
    });

    const x = document.createElement("button");
    x.className = "xbtn";
    x.textContent = "✕";
    x.addEventListener("click", () => {
      blocksProgram.splice(idx, 1);
      renderBlocksWorkspace();
      playSound("click");
    });
    row.appendChild(x);

    blocksWorkspace.appendChild(row);
  });

  // Sync generated code into editor (read-only)
  codeBox.value = blocksToProgramCode();
  const exp = expectedBlocksForLevel();
  if (agePackSelect.value === "4-5"){
    if (!blocksProgram.length) setCoach("Drag blocks here ✨ (or tap a block on the left)");
    else if (exp.length) setCoach("You’re building an idea! Run it to see what happens, or ask for a clue.");
    else setCoach("Looking good! Add another block or press Run Blocks.");
    highlightNextExpectedBlock();
  }
}

blocksWorkspace.addEventListener("dragover", (e) => { e.preventDefault(); blocksWorkspace.classList.add("snapReady"); });
blocksWorkspace.addEventListener("dragleave", () => blocksWorkspace.classList.remove("snapReady"));
blocksWorkspace.addEventListener("drop", (e) => {
  blocksWorkspace.classList.remove("snapReady");
  e.preventDefault();
  const type = e.dataTransfer.getData('application/x-starbyte-block') || draggingBlockType;
  if (!BLOCK_DEFS.some(block => block.type === type)) return;
  blocksProgram.push(defaultBlock(type));
  draggingBlockType = null;
  renderBlocksWorkspace();
  playSound("click");
});

blocksUndoBtn.addEventListener("click", () => {
  blocksProgram.pop();
  renderBlocksWorkspace();
  playSound("click");
});
blocksClearBtn.addEventListener("click", () => {
  blocksProgram = [];
  renderBlocksWorkspace();
  playSound("click");
});
blocksRunBtn.addEventListener("click", () => {
  // ensure codeBox matches blocks
  codeBox.value = blocksToProgramCode();
  const exp = expectedBlocksForLevel();
  if (agePackSelect.value === "4-5"){
    if (!blocksProgram.length) setCoach("Drag blocks here ✨ (or tap a block on the left)");
    else if (exp.length) setCoach("Run your idea and compare it with the mission. You can always try again.");
    else setCoach("Looking good! Add another block or press Run Blocks.");
    highlightNextExpectedBlock();
  }
  runCode();
});


function updateModeForPack(){
  const packId = agePackSelect.value;
  const blockMode = (packId === "4-5");
  blocksCard.classList.toggle("enabled", blockMode);

  // In block mode, make code read-only so typing isn't required (parents can still change packs).
  codeBox.readOnly = blockMode;
  if (blockMode){
    // Begin with an empty workspace; hints guide without filling it in.
    renderBlocksPalette();
    if (!blocksProgram.length){
      blocksProgram = [];
    }
    renderBlocksWorkspace();
    updateTTSButton();
    updateGuidedButton();
    nextCoachTip();
  }
}


// ---------------------- Coach Voice (TTS) ----------------------
function canSpeak(){
  return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}
function speakCoach(text){
  const st = loadState();
  if (!st.ttsOn) return;
  if (!canSpeak()) return;
  try{
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text || ""));
    u.rate = 1.0;
    u.pitch = 1.1;
    u.volume = 1.0;
    window.speechSynthesis.speak(u);
  }catch{}
}
function setCoach(msg){
  if (!coachText) return;
  coachText.textContent = msg;
  speakCoach(msg);
}

function updateTTSButton(){
  const on = !!loadState().ttsOn;
  ttsToggle?.setAttribute("aria-pressed", String(on));
  if (ttsToggle) ttsToggle.textContent = on ? "Voice: On 🔊" : "Voice: Off 🔇";
}
function updateGuidedButton(){
  const on = !!loadState().guidedBlocks;
  guidedToggle?.setAttribute("aria-pressed", String(on));
  if (guidedToggle) guidedToggle.textContent = on ? "Guided: On ✅" : "Guided: Off ⛔";
}

ttsToggle?.addEventListener("click", () => {
  const st = loadState();
  saveState({ ttsOn: !st.ttsOn });
  updateTTSButton();
  setCoach(loadState().ttsOn ? "Voice is on! I can read the tips." : "Voice is off.");
  playSound("open");
});

guidedToggle?.addEventListener("click", () => {
  const st = loadState();
  saveState({ guidedBlocks: !st.guidedBlocks });
  updateGuidedButton();
  highlightNextExpectedBlock();
  setCoach(loadState().guidedBlocks ? "Guided mode is on. I will highlight the next block." : "Guided mode is off.");
  playSound("open");
});


// ---------------------- Guided Block Challenges (Ages 4–5) ----------------------
function expectedBlocksForLevel(){
  // Very simple mapping for the first 10 levels of 4–5 pack.
  // If custom levels exist, we don't enforce strict guidance.
  const packId = agePackSelect.value;
  if (packId !== "4-5") return [];
  if (isParentMode() && getCustomLevels("4-5").length) return [];

  const lvl = currentLevel;
  const map = {
    0: ["say"],
    1: ["color"],
    2: ["right"],
    3: ["left"],
    4: ["size"],
    5: ["star"],
    6: ["star","star"],
    7: ["up"],
    8: ["say","star"],
    9: ["say","right"],
  };
  return map[lvl] || [];
}

let coachHintIndex = 0;
function nextCoachTip(){
  setCoach("Read the mini-lesson, then choose your own blocks. Ask for a clue if you get stuck.");
  highlightNextExpectedBlock();
}

nextHintBtn?.addEventListener("click", () => {
  requestLessonHint();
  playSound("click");
});

function highlightNextExpectedBlock(){
  if (agePackSelect.value !== "4-5") return;
  const st = loadState();
  const guided = !!st.guidedBlocks;
  // Remove existing highlights
  blocksPalette?.querySelectorAll(".block").forEach(b => b.classList.remove("guided"));
  if (!guided || lessonPractice.hintStep < 2) return;

  const exp = expectedBlocksForLevel();
  if (!exp.length) return;
  const nextType = exp[Math.min(blocksProgram.length, exp.length-1)];
  // Highlight block in palette that matches nextType
  blocksPalette?.querySelectorAll(".block").forEach(el => {
    const t = el.getAttribute("data-type");
    if (t === nextType) el.classList.add("guided");
  });
}


// ---------------------- Profiles (local multi-kid) ----------------------
function getProfileKey(profileId){
  return `starbyte_quest_profile_${profileId}`;
}
function loadProfile(profileId){
  try{
    const raw = localStorage.getItem(getProfileKey(profileId));
    if (!raw) return null;
    return JSON.parse(raw);
  }catch{ return null; }
}
function saveProfile(profileId, data){
  try{
    localStorage.setItem(getProfileKey(profileId), JSON.stringify(data));
    return true;
  }catch{ return false; }
}


function ensureDefaultProfile(){
  if (ensuringProfile) return;
  ensuringProfile = true;
  let st = loadState();
  const profilesById = { ...(st.profilesById || {}) };
  if (!profilesById.default){
    profilesById.default = { id:"default", name:"Default", createdAt: Date.now() };
    st = { ...st, profilesById, activeProfileId: "default" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
  }
  // Ensure per-profile storage exists by cloning global into profile on first run
  if (!profilesById[st.activeProfileId]) {
    st = { ...st, activeProfileId:"default" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
  }
  const pid = st.activeProfileId || "default";
  if (!loadProfile(pid)){
    // Create a clean per-profile state bucket
    saveProfile(pid, {
      agePack: st.agePack || "7-8",
      progressByPack: pid === "default" ? (st.progressByPack || {}) : {},
      progressStars: pid === "default" ? (st.progressStars || 0) : 0,
      editsByPack: pid === "default" ? (st.editsByPack || {}) : {},
      customLevelsByPack: pid === "default" ? (st.customLevelsByPack || {}) : {},
      skillsByPack: pid === "default" ? (st.skillsByPack || {}) : {},
      stickerPack: st.stickerPack || "mix",
      theme: st.theme || "candy",
      worldId: st.worldId || "candy",
      storyOn: st.storyOn !== false,
      historyLog: [],
      avatar: st.avatar || { base:"🙂", hat:"", pet:"" },
    });
  }
  ensuringProfile = false;
}

function readActiveProfile(){
  if (ensuringProfile){
    const pid = loadState().activeProfileId || "default";
    return loadProfile(pid) || {};
  }
  ensureDefaultProfile();
  const pid = loadState().activeProfileId || "default";
  return loadProfile(pid) || {};
}
function writeActiveProfile(patch){
  if (ensuringProfile){
    const pid = loadState().activeProfileId || "default";
    const cur = loadProfile(pid) || {};
    const next = { ...cur, ...patch };
    saveProfile(pid, next);
    return next;
  }
  ensureDefaultProfile();
  const pid = loadState().activeProfileId || "default";
  const cur = readActiveProfile();
  const next = { ...cur, ...patch };
  saveProfile(pid, next);
  return next;
}

function getStars(){
  return (readActiveProfile().progressStars || 0);
}
function setStars(n){
  writeActiveProfile({ progressStars: Math.max(0, Number(n)||0) });
}


// ---------------------- Worlds & Story Mode ----------------------
const WORLDS = [
  { id:"candy",   name:"Candy World",     emoji:"🍭", theme:"candy",   stickers:"sweet",  story:"The Candy Stars are missing! Help sprinkle stars across Candy World." },
  { id:"unicorn", name:"Unicorn Valley",  emoji:"🦄", theme:"fairy",   stickers:"fantasy",story:"Unicorn Valley needs your code magic. Make sparkles and guide the hero!" },
  { id:"space",   name:"Space Station",   emoji:"🚀", theme:"space",   stickers:"space",  story:"Launch into Space Station! Collect stars to power the rocket engines." },
  { id:"dino",    name:"Dino Jungle",     emoji:"🦖", theme:"dino",    stickers:"animals",story:"Dino Jungle is wild! Use code to explore and earn shiny stars." },
  { id:"castle",  name:"Princess Castle", emoji:"🏰", theme:"castle",  stickers:"fantasy",story:"Princess Castle needs a Code Knight. Bring stars back to the towers!" },
  { id:"pirate",  name:"Pirate Treasure", emoji:"🏴‍☠️", theme:"pirate", stickers:"achieve",story:"Ahoy! Use code to find treasure. Stars are the map clues!" },
  { id:"arcade",  name:"Neon Arcade",     emoji:"🕹️", theme:"neon",    stickers:"achieve",story:"Neon Arcade is glitchy. Your code fixes it—one level at a time!" },
];

function getWorld(){
  const pid = loadState().activeProfileId || "default";
  const p = readActiveProfile();
  const worldId = p.worldId || loadState().worldId || "candy";
  return WORLDS.find(w => w.id === worldId) || WORLDS[0];
}

function applyWorldToUI(){
  const w = getWorld();
  // Prefer world theme + stickers unless user changed manually
  themeSelect.value = w.theme;
  stickerPackSelect.value = w.stickers;
  applyTheme(w.theme);
  saveState({ theme: w.theme, stickerPack: w.stickers, worldId: w.id });
  writeActiveProfile({ theme: w.theme, stickerPack: w.stickers, worldId: w.id });
  renderStickers();
  renderAlbum();
  renderStory();
  try{ maybeUnlockTrophies(true); }catch{}
}

function renderStory(){
  const p = readActiveProfile();
  const on = p.storyOn !== false;
  if (!storyText) return;
  if (!storyToggle) return;

  storyToggle.setAttribute("aria-pressed", String(on));
  storyToggle.textContent = on ? t("storyOn") : t("storyOff");

  if (!on){
    storyText.textContent = "Story Mode is off. Turn it on for adventures!";
    return;
  }
  const w = getWorld();
  const packId = agePackSelect.value;
  const lvl = currentLevel + 1;
  const msg = `${w.emoji} ${w.story}  •  Pack ${packId} • Level ${lvl}`;
  storyText.textContent = msg;
  // Narrate on level load/toggle
  try{ if (narrationEnabled()) speak(msg); }catch{}
}

storyToggle?.addEventListener("click", () => {
  const p = readActiveProfile();
  const next = !(p.storyOn !== false);
  writeActiveProfile({ storyOn: next });
  saveState({ storyOn: next });
  renderStory();
  try{ maybeUnlockTrophies(true); }catch{}
  playSound("open");
});


function updateProfileIdentity(){
  const st = loadState();
  const meta = st.profilesById?.[st.activeProfileId || "default"];
  const name = meta?.name || "Default";
  if (profilesBtn) {
    profilesBtn.textContent = `👤 ${name}`;
    profilesBtn.title = `Playing as ${name}. Choose a different player.`;
    profilesBtn.setAttribute("aria-label", `Playing as ${name}. Choose player`);
  }
  const eyebrow = document.querySelector('.questBanner .eyebrow');
  if (eyebrow) eyebrow.textContent = `${name}’s coding adventure`;
}

function chooseProfile(id){
  const st = loadState();
  if (!st.profilesById?.[id]) return false;
  try {
    saveState({ activeProfileId:id });
    selectedStickerId = null;
    makerProgram = [];
    initFromStorage();
    renderProfiles();
    hideModal(profilesModal);
    const name = st.profilesById[id].name;
    setStatus(`Playing as ${name}. Read the mini-lesson, then try your own idea.`, "neutral");
    profilesBtn.focus();
    playSound("open");
    return true;
  } catch (error) {
    $("profileMessage").textContent = "Your browser could not save this player. Check that storage is allowed, then try again.";
    return false;
  }
}

function renderProfiles(){
  const st = loadState();
  const profilesById = st.profilesById || {};
  const active = st.activeProfileId || "default";
  profilesGrid.innerHTML = "";
  Object.values(profilesById).forEach(p => {
    const card = document.createElement("div");
    card.className = "dashCard";
    const prof = loadProfile(p.id) || {};
    const stars = prof.progressStars || 0;
    card.innerHTML = `<h4></h4>
      <div class="dashRow"><span>Stars</span><b>${stars}⭐</b></div>
      <div class="dashRow"><span>World</span><b>${(WORLDS.find(w=>w.id==(prof.worldId||"candy"))||WORLDS[0]).emoji}</b></div>
      <div class="controls" style="margin-top:10px;">
        <button class="btn small" data-switch="${p.id}" aria-pressed="${p.id===active}"></button>
      </div>`;
    card.querySelector('h4').textContent = `${p.name} ${p.id===active ? "✅" : ""}`;
    card.querySelector('button').textContent = p.id===active ? `Continue as ${p.name}` : `Play as ${p.name}`;
    profilesGrid.appendChild(card);
  });
  profilesGrid.querySelectorAll("[data-switch]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-switch");
      chooseProfile(id);
    });
  });
}

profilesBtn?.addEventListener("click", () => {
  ensureDefaultProfile();
  $("profileMessage").textContent = "Choose a player to continue their own adventure.";
  renderProfiles(); showModal(profilesModal);
});
closeProfilesBtn?.addEventListener("click", () => hideModal(profilesModal));

addProfileBtn?.addEventListener("click", () => {
  const name = (newProfileName.value || "").trim().slice(0,32);
  if (!name) { $("profileMessage").textContent = "Type a player’s name first."; newProfileName.focus(); return; }
  const id = "p_" + Math.random().toString(36).slice(2,8);
  const st = loadState();
  const profilesById = { ...(st.profilesById || {}) };
  profilesById[id] = { id, name, createdAt: Date.now() };
  // create fresh profile bucket
  const saved = saveProfile(id, {
    agePack: $("newProfileAge").value,
    progressByPack: {}, progressStars: 0, editsByPack: {}, customLevelsByPack: {}, skillsByPack: {},
    stickerPack: "mix", theme: "candy", worldId: "candy", storyOn: true, historyLog: [], avatar:{ base:"🙂", hat:"", pet:"" }
  });
  if (!saved) { $("profileMessage").textContent = "Your browser could not save this player. Check that storage is allowed."; return; }
  try { saveState({ profilesById }); }
  catch { $("profileMessage").textContent = "Could not save the player list. Check browser storage and try again."; return; }
  newProfileName.value = "";
  chooseProfile(id);
});
newProfileName?.addEventListener('keydown', event => {
  if (event.key === 'Enter') { event.preventDefault(); addProfileBtn.click(); }
});


function renderWorlds(){
  worldsGrid.innerHTML = "";
  const cur = getWorld().id;
  WORLDS.forEach(w => {
    const tile = document.createElement("div");
    tile.className = "worldTile";
    tile.innerHTML = `<h4>${w.emoji} ${w.name} ${w.id===cur ? "✅" : ""}</h4>
      <p class="tinyNote">${w.story}</p>
      <div class="worldBadgeRow">
        <span class="worldBadge">Theme: ${w.theme}</span>
        <span class="worldBadge">Stickers: ${w.stickers}</span>
      </div>
      <div class="controls" style="margin-top:10px;">
        <button class="btn small" data-world="${w.id}">Choose</button>
      </div>`;
    worldsGrid.appendChild(tile);
  });
  worldsGrid.querySelectorAll("[data-world]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-world");
      writeActiveProfile({ worldId: id });
      saveState({ worldId: id });
      applyWorldToUI();
      hideModal(worldsModal);
      playSound("success");
  try{ maybeUnlockTrophies(true); }catch{}

    });
  });
}

worldsBtn?.addEventListener("click", () => { renderWorlds(); showModal(worldsModal); });
closeWorldsBtn?.addEventListener("click", () => hideModal(worldsModal));




function getBadgeProgress(){
  const p = readActiveProfile();
  return p.badgeProgress || { talk:0, move:0, stars:0, loops:0, buttons:0, vars:0, funcs:0, random:0, unlocked:{} };
}
function setBadgeProgress(bp){
  writeActiveProfile({ badgeProgress: bp });
}
function bumpBadgeMetric(metric, amt=1){
  const bp = getBadgeProgress();
  bp[metric] = (bp[metric]||0) + amt;
  // unlock
  bp.unlocked = bp.unlocked || {};
  SKILLS.forEach(s => {
    const ok = Object.entries(s.need).every(([k,v]) => (bp[k]||0) >= v);
    if (ok) bp.unlocked[s.id] = true;
  });
  setBadgeProgress(bp);
  try{ maybeUnlockTrophies(true); }catch{}
}

function renderSkillTree(){
  const bp = getBadgeProgress();
  skillTreeGrid.innerHTML = "";
  SKILLS.forEach(s => {
    const unlocked = !!bp.unlocked?.[s.id];
    const card = document.createElement("div");
    card.className = "dashCard";
    const req = Object.entries(s.need).map(([k,v]) => `${k}:${Math.min(v, bp[k]||0)}/${v}`).join(" • ");
    card.innerHTML = `<h4>${s.emoji} ${s.name} ${unlocked ? "✅" : ""}</h4>
      <div class="tinyNote">${s.desc}</div>
      <div class="dashRow"><span>Progress</span><b>${req}</b></div>`;
    skillTreeGrid.appendChild(card);
  });
}

skillTreeBtn?.addEventListener("click", () => { renderSkillTree(); showModal(skillTreeModal); });
closeSkillTreeBtn?.addEventListener("click", () => hideModal(skillTreeModal));


// ---------------------- Daily Challenge ----------------------
function getTodayKey(){
  const d = new Date();
  return [d.getFullYear(), String(d.getMonth()+1).padStart(2,"0"), String(d.getDate()).padStart(2,"0")].join("-");
}
const DAILY_POOL = [
  { id:"say3", title:"Say it 3 times", desc:"Make your hero say 3 messages (use say() 3 times).", check:(p)=> (p.badgeProgress?.talk||0) >= 3, bonus:2 },
  { id:"stars5", title:"Star Shower", desc:"Create 5 stars in the game.", check:(p)=> (p.badgeProgress?.stars||0) >= 5, bonus:2 },
  { id:"move8", title:"Move Explorer", desc:"Move your hero 8 times.", check:(p)=> (p.badgeProgress?.move||0) >= 8, bonus:2 },
  { id:"loop1", title:"Loop Time", desc:"Use repeat() at least once.", check:(p)=> (p.badgeProgress?.loops||0) >= 1, bonus:3 },
];

function getDaily(){
  const p = readActiveProfile();
  const today = getTodayKey();
  if (p.daily?.date === today) {
    const picked = DAILY_POOL.find(item => item.id === p.daily.picked?.id);
    if (picked) return { ...p.daily, picked };
  }
  // pick deterministic based on date
  const seed = parseInt(today.replaceAll("-",""), 10);
  const idx = seed % DAILY_POOL.length;
  const d = { date: today, picked: DAILY_POOL[idx], started: false, claimed: false, completed: false };
  writeActiveProfile({ daily: d });
  return d;
}

function renderDaily(){
  const d = getDaily();
  dailyTitle.textContent = `${d.picked.title} (${d.date})`;
  dailyDesc.textContent = d.picked.desc;
  const p = readActiveProfile();
  // recompute completion
  const completed = !!d.completed || d.picked.check(p);
  d.completed = completed;
  writeActiveProfile({ daily: d });

  startDailyBtn.disabled = d.started;
  claimDailyBtn.disabled = d.claimed || !completed;

  dailyStatus.textContent = d.claimed ? `Reward claimed! +${d.picked.bonus}⭐` :
    completed ? "Completed! Claim your reward ⭐" :
    d.started ? "In progress… try it now!" :
    "Press Start Daily to begin.";

  return d;
}

dailyBtn?.addEventListener("click", () => { renderDaily(); showModal(dailyModal); });
closeDailyBtn?.addEventListener("click", () => hideModal(dailyModal));

startDailyBtn?.addEventListener("click", () => {
  const d = getDaily();
  d.started = true;
  writeActiveProfile({ daily: d });
  renderDaily();
  setStatus("Daily started! Complete it by coding in any pack.", "neutral");
  playSound("open");
});

claimDailyBtn?.addEventListener("click", () => {
  const p = readActiveProfile();
  const d = getDaily();
  if (d.claimed) return;
  if (!d.picked.check(p)) return alert("Not completed yet!");
  d.claimed = true;
  writeActiveProfile({ daily: d, progressStars: (p.progressStars||0) + d.picked.bonus });
  renderStickers(); renderAlbum(); renderDaily();
  playSound("success");
  try{ maybeUnlockTrophies(true); }catch{}

});


// ---------------------- Avatar Creator ----------------------
const AVATAR_OPTIONS = {
  base: ["🙂","😄","😎","🤩","🧑‍🚀","🧙","🧚","🦸","🐱","🐶"],
  hat: ["","🎩","🧢","👑","🎀","🪄","🕶️","⛑️"],
  pet: ["","🐾","🐶","🐱","🦄","🐉","🦋","🐙","🐳"]
};

function renderAvatar(){
  const p = readActiveProfile();
  const stars = p.progressStars || 0;
  const unlockedHat = stars >= 3;
  const unlockedPet = stars >= 5;

  avatarGrid.innerHTML = "";

  function section(title, key, unlocked, need){
    const card = document.createElement("div");
    card.className = "dashCard";
    const cur = (p.avatar||{})[key] || (key==="base"?"🙂":"");
    const list = AVATAR_OPTIONS[key];
    card.innerHTML = `<h4>${title}</h4><div class="tinyNote">${unlocked ? "Unlocked" : `Unlock at ${need}⭐`}</div>`;
    const row = document.createElement("div");
    row.className = "insertRow";
    list.forEach(opt => {
      const b = document.createElement("button");
      b.className = "btn small";
      b.textContent = opt==="" ? "None" : opt;
      b.disabled = (!unlocked && key!=="base");
      if (opt === cur) b.classList.add("success");
      b.addEventListener("click", () => {
        const avatar = { ...(p.avatar || { base:"🙂", hat:"", pet:"" }) };
        avatar[key] = opt;
        writeActiveProfile({ avatar });
        applyAvatar();
        renderAvatar();
        playSound("click");
      });
      row.appendChild(b);
    });
    card.appendChild(row);
    avatarGrid.appendChild(card);
  }

  section("Base", "base", true, 0);
  section("Hat", "hat", unlockedHat, 3);
  section("Pet", "pet", unlockedPet, 5);
}

function applyAvatar(){
  const p = readActiveProfile();
  const a = p.avatar || { base:"🙂", hat:"", pet:"" };
  try{
    sendGameCommand("avatar", a.base, a.hat, a.pet);
  }catch{}
}

avatarBtn?.addEventListener("click", () => { renderAvatar(); showModal(avatarModal); });
closeAvatarBtn?.addEventListener("click", () => hideModal(avatarModal));


// ---------------------- History & Report ----------------------
function logHistory(event){
  const p = readActiveProfile();
  const log = Array.isArray(p.historyLog) ? p.historyLog.slice(-400) : [];
  log.push({ t: Date.now(), ...event });
  writeActiveProfile({ historyLog: log });
}

function weekStart(ts){
  const d = new Date(ts);
  const day = d.getDay(); // 0=Sun
  const diff = (day + 6) % 7; // Monday as start
  d.setDate(d.getDate() - diff);
  d.setHours(0,0,0,0);
  return d.getTime();
}

function renderReport(){
  const st = loadState();
  const p = readActiveProfile();
  const w = getWorld();
  const now = Date.now();
  const ws = weekStart(now);
  const log = Array.isArray(p.historyLog) ? p.historyLog : [];
  const levelsDone = log.filter(e => e.type==="LEVEL_COMPLETE" && e.t >= ws).length;

  const bp = p.badgeProgress || {};
  const skills = [
    bp.loops ? "loops" : null,
    bp.buttons ? "buttons" : null,
    bp.vars ? "variables" : null,
    bp.funcs ? "functions" : null,
    bp.random ? "random" : null,
    bp.talk ? "say()" : null,
  ].filter(Boolean);
  reportProfile.textContent = (st.profilesById?.[st.activeProfileId||"default"]?.name) || "Default";
  reportWorld.textContent = `${w.emoji} ${w.name}`;
  reportStars.textContent = String(p.progressStars || 0);
  reportLevels.textContent = String(levelsDone);
  reportSkills.textContent = skills.length ? skills.join(", ") : "starter skills";
  reportDate.textContent = new Date().toLocaleDateString();
}

reportBtn?.addEventListener("click", () => { renderReport(); showModal(reportModal); });
closeReportBtn?.addEventListener("click", () => hideModal(reportModal));

printReportBtn?.addEventListener("click", () => {
  renderReport();
  const w = window.open("", "_blank");
  if (!w) return alert("Popup blocked. Allow popups to print.");
  const html = `
<!doctype html><html><head><meta charset="utf-8" />
<title>Starbyte Quest Progress Report</title>
<style>
  body{font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; padding:16px; background:#fff;}
  .cert{max-width:900px; margin:0 auto; border:2px solid #111; border-radius:18px; padding:20px; text-align:center;}
  .certTop{font-weight:900; letter-spacing:.5px; margin-bottom:10px;}
  .certBig{font-weight:900; font-size:26px; margin:6px 0 10px;}
  .certLine{color:#333; margin-top:8px;}
  .certFooter{display:flex; justify-content:space-between; margin-top:16px; color:#333; font-size:12px;}
</style>
</head><body>${reportArea.outerHTML}</body></html>`;
  w.document.open(); w.document.write(html); w.document.close();
  w.focus();
  w.print();
});

function detectBadgeFromCode(code){
  return {
    talk: (code.match(/\bsay\s*\(/g)||[]).length,
    move: (code.match(/\bmove(Right|Left|Up|Down)\s*\(/g)||[]).length,
    stars: (code.match(/\baddStar\s*\(/g)||[]).length,
    loops: (code.match(/\brepeat\s*\(/g)||[]).length,
    buttons: (code.match(/\bonButton\s*\(/g)||[]).length,
    vars: (code.match(/\blet\s+\w+/g)||[]).length>0 ? 1 : 0,
    funcs: (code.match(/\bfunction\s+\w+\s*\(/g)||[]).length>0 ? 1 : 0,
    random: (code.match(/\brandomInt\s*\(/g)||[]).length,
  };
}


// ---------------------- Share Links (Export/Import) ----------------------
function b64e(obj){
  const s = JSON.stringify(obj);
  return btoa(unescape(encodeURIComponent(s)));
}
function b64d(str){
  const s = decodeURIComponent(escape(atob(str)));
  return JSON.parse(s);
}
function buildSharePayload(){
  const p = readActiveProfile();
  const st = loadState();
  const packId = agePackSelect.value;
  const payload = {
    v: 1,
    packId,
    level: currentLevel,
    theme: themeSelect.value,
    stickerPack: stickerPackSelect.value,
    worldId: p.worldId || st.worldId || "candy",
    storyOn: (p.storyOn !== false),
    avatar: p.avatar || { base:"🙂", hat:"", pet:"" },
    mode: (packId==="4-5") ? "blocks" : "code",
  };
  if (payload.mode === "blocks"){
    payload.blocks = blocksProgram || [];
  } else {
    payload.code = (codeBox.value || "").slice(0, 8000);
  }
  return payload;
}
function applySharePayload(payload){
  if (!payload || payload.v !== 1 || !['4-5','6-7','7-8','9-10'].includes(payload.packId)) throw Error('Invalid shared creation');
  if (payload.mode !== 'blocks' && payload.mode !== 'code') throw Error('Invalid shared mode');
  if (payload.mode === 'blocks' && (!Array.isArray(payload.blocks) || payload.blocks.length > 100 || payload.blocks.some(block => !block || !BLOCK_DEFS.some(def => def.type === block.type)))) throw Error('Invalid shared blocks');
  if (payload.mode === 'code' && (typeof payload.code !== 'string' || payload.code.length > 8000)) throw Error('Invalid shared code');
  ensureDefaultProfile();
  // apply into active profile
  const st = loadState();
  const p = readActiveProfile();
  // set pack
  agePackSelect.value = payload.packId || agePackSelect.value;
  // world/theme/stickers
  saveState({ worldId: payload.worldId || st.worldId, theme: payload.theme || st.theme, stickerPack: payload.stickerPack || st.stickerPack, storyOn: payload.storyOn !== false });
  writeActiveProfile({ agePack:payload.packId, worldId: payload.worldId || (p.worldId||"candy"), theme: payload.theme || (p.theme||"candy"), stickerPack: payload.stickerPack || (p.stickerPack||"mix"), storyOn: payload.storyOn !== false, avatar: payload.avatar || p.avatar });
  themeSelect.value = payload.theme || themeSelect.value;
  stickerPackSelect.value = payload.stickerPack || stickerPackSelect.value;
  applyTheme(themeSelect.value);
  renderStickers(); renderAlbum(); renderStory();
  try{ maybeUnlockTrophies(true); }catch{}
  // level
  const lvl = Math.max(0, Number(payload.level)||0);
  loadLevel(lvl);
  // content
  if ((payload.mode === "blocks") && Array.isArray(payload.blocks)){
    blocksProgram = payload.blocks;
    updateModeForPack();
    renderBlocksWorkspace();
  } else if (typeof payload.code === "string"){
    updateModeForPack();
    codeBox.readOnly = false;
    codeBox.value = payload.code;
  }
  applyAvatar();
}

function openShareModal(){
  const mode = (agePackSelect.value==="4-5") ? "Blocks" : "Code";
  shareModeLabel.textContent = mode;
  showModal(shareModal);
  try{ if ((shareBox.value||"").trim()) drawQRToCanvas(qrCanvas, shareBox.value.trim()); }catch{}
}

shareBtn?.addEventListener("click", openShareModal);
closeShareBtn?.addEventListener("click", () => hideModal(shareModal));

exportLinkBtn?.addEventListener("click", () => {
  const payload = buildSharePayload();
  const token = b64e(payload);
  const url = `${location.origin}${location.pathname}#share=${token}`;
  shareBox.value = url;
  shareBox.focus(); shareBox.select();
  try{ drawQRToCanvas(qrCanvas, url); }catch{}
  setStatus("Share link created! Copy it from the box.", "good");
  playSound("success");
  try{ maybeUnlockTrophies(true); }catch{}
});

importLinkBtn?.addEventListener("click", () => {
  const txt = (shareBox.value || "").trim();
  let token = "";
  if (txt.includes("#share=")) token = txt.split("#share=")[1].trim();
  else token = txt;
  if (!token) return alert("Paste a share link or token first.");
  try{
    const payload = b64d(token);
    applySharePayload(payload);
    hideModal(shareModal);
    setStatus("Imported! Try running it ▶", "good");
    playSound("success");
  try{ maybeUnlockTrophies(true); }catch{}
  }catch(e){
    alert("Could not import that link/token.");
  }
});

// auto-import from URL hash
function autoImportFromHash(){
  try{
    const h = location.hash || "";
    if (!h.startsWith("#share=")) return;
    const token = h.slice(7);
    const payload = b64d(token);
    applySharePayload(payload);
    hideHome();
    hideModal(shareModal);
    // clean hash (optional)
    history.replaceState(null, "", location.pathname + location.search);
    setStatus("Loaded a shared creation! 🎉", "good");
  }catch{}
}
window.addEventListener('DOMContentLoaded', autoImportFromHash);
window.addEventListener('hashchange', autoImportFromHash);


// ---------------------- Mini-game Maker (Blocks) ----------------------
let makerProgram = [];
const MAKER_BLOCKS = [
  { type:"say", icon:"💬", label:"Say", fields:[{k:"text", kind:"text", placeholder:"Go!", default:"Go!"}] },
  { type:"color", icon:"🎨", label:"Colour", fields:[{k:"color", kind:"select", options:["pink","blue","purple","green","orange","yellow"], default:"blue"}] },
  { type:"stars", icon:"⭐", label:"Add 5 Stars", fields:[] },
  { type:"starsRand", icon:"🎲", label:"Random Stars (1–5)", fields:[] },
  { type:"repeat", icon:"🔁", label:"Repeat", fields:[{k:"n", kind:"number", placeholder:"3", default:3}] },
  { type:"celebrate", icon:"🎉", label:"Celebrate", fields:[] },
  { type:"btnA", icon:"🅰️", label:"Button A says…", fields:[{k:"text", kind:"text", placeholder:"Nice!", default:"Nice!"}] },
];

function renderMaker(){
  makerPalette.innerHTML = "";
  MAKER_BLOCKS.forEach(def => {
    const el = document.createElement("div");
    el.className = "block";
    el.setAttribute("draggable", "true");
    el.setAttribute("data-type", def.type);
    el.innerHTML = `<div class="left"><div class="icon">${def.icon}</div><div>${def.label}</div></div><div class="tinyNote">drag / tap</div>`;
    el.addEventListener("dragstart", (event) => {
      draggingBlockType = def.type;
      event.dataTransfer.setData('application/x-starbyte-maker-block', def.type);
      event.dataTransfer.effectAllowed = 'copy';
    });
    el.addEventListener("click", () => { makerProgram.push({ type:def.type, ...Object.fromEntries((def.fields || []).map(f => [f.k, f.default])) }); renderMakerWorkspace(); playSound("click"); });
    makerPalette.appendChild(el);
  });
  renderMakerWorkspace();
}

function renderMakerWorkspace(){
  makerWorkspace.innerHTML = "";
  if (!makerProgram.length){
    makerWorkspace.appendChild(makerEmpty);
  }
  makerProgram.forEach((b, idx) => {
    const def = MAKER_BLOCKS.find(x => x.type === b.type) || BLOCK_DEFS.find(x => x.type === b.type);
    const row = document.createElement("div");
    row.className = "block small";
    row.innerHTML = `<div class="left"><div class="icon">${def?.icon||"🧩"}</div><div>${def?.label||b.type}</div></div>`;
    (def?.fields || []).forEach(f => {
      if (f.kind === "text" || f.kind === "number"){
        const inp = document.createElement("input");
        inp.type = f.kind === "number" ? "number" : "text";
        inp.placeholder = f.placeholder || "";
        inp.value = b[f.k] ?? f.default ?? "";
        inp.addEventListener("input", () => { b[f.k] = (inp.type==="number") ? Number(inp.value) : inp.value; });
        row.appendChild(inp);
      } else if (f.kind === "select"){
        const sel = document.createElement("select");
        (f.options||[]).forEach(opt => { const o=document.createElement("option"); o.value=opt; o.textContent=opt; sel.appendChild(o); });
        sel.value = b[f.k] ?? f.default ?? (f.options?.[0] || "");
        sel.addEventListener("change", () => { b[f.k] = sel.value; });
        row.appendChild(sel);
      }
    });
    const x = document.createElement("button");
    x.className = "xbtn"; x.textContent = "✕";
    x.addEventListener("click", () => { makerProgram.splice(idx,1); renderMakerWorkspace(); playSound("click"); });
    row.appendChild(x);
    makerWorkspace.appendChild(row);
  });
}

makerWorkspace.addEventListener("dragover", (e) => { e.preventDefault(); makerWorkspace.classList.add("snapReady"); });
makerWorkspace.addEventListener("dragleave", () => makerWorkspace.classList.remove("snapReady"));
makerWorkspace.addEventListener("drop", (e) => {
  e.preventDefault();
  makerWorkspace.classList.remove("snapReady");
  if (!draggingBlockType) return;
  const type = e.dataTransfer.getData('application/x-starbyte-maker-block') || draggingBlockType;
  const def = MAKER_BLOCKS.find(b => b.type === type);
  if (!def) return;
  makerProgram.push({ type:def.type, ...Object.fromEntries((def.fields || []).map(f => [f.k, f.default])) });
  draggingBlockType = null;
  renderMakerWorkspace();
  playSound("click");
});

function makerToCode(){
  const lines = [];
  makerProgram.forEach(b => {
    if (b.type==="stars") lines.push("repeat(5, () => addStar());");
    else if (b.type==="starsRand") lines.push("repeat(randomInt(1,5), () => addStar());");
    else if (b.type==="repeat") lines.push(`repeat(${Number(b.n)||3}, () => { /* put blocks inside repeat later */ addStar(); });`);
    else if (b.type==="celebrate") lines.push("celebrate();");
    else if (b.type==="btnA") lines.push(`onButton('A', () => say(${JSON.stringify(String(b.text||'Nice!'))}));`);
    else lines.push(blockToCode(b));
  });
  return lines.join("\n");
}

function runMaker(){
  // apply friendly script + start mini-game
  const kind = makerKind.value.toLowerCase();
  const seconds = Math.max(10, Math.min(90, Number(makerSeconds.value)||30));
  const goal = Math.max(1, Math.min(50, Number(makerGoal.value)||10));
  const intro = makerToCode();
  const code = `// Mini-game Maker\n${intro}\nstartMiniGame(${JSON.stringify(kind)}, { seconds:${seconds}, goal:${goal} });`;
  makerRunning = true;
  codeBox.readOnly = false;
  codeBox.value = code;
  runCode();
  setStatus("Mini-game started! Tap inside the Game Screen.", "good");
  playSound("success");
  try{ maybeUnlockTrophies(true); }catch{}
}

makerBtn?.addEventListener("click", () => { renderMaker(); showModal(makerModal); });
closeMakerBtn?.addEventListener("click", () => hideModal(makerModal));
makerClearBtn?.addEventListener("click", () => { makerProgram=[]; renderMakerWorkspace(); playSound("click"); });
makerRunBtn?.addEventListener("click", () => { hideModal(makerModal); runMaker(); });


// ---------------------- Trophy Cabinet + Confetti ----------------------
const TROPHIES = [
  { id:"first_star",  emoji:"🌟", name:"First Star",     desc:"Earn your first ⭐", check:(p)=> (p.progressStars||0) >= 1 },
  { id:"ten_stars",   emoji:"✨", name:"Ten Stars",      desc:"Reach 10⭐", check:(p)=> (p.progressStars||0) >= 10 },
  { id:"world_trav",  emoji:"🗺️", name:"World Traveler", desc:"Choose a world", check:(p)=> !!p.worldId },
  { id:"avatar_hat",  emoji:"👑", name:"Hat Unlock",     desc:"Unlock a hat (3⭐)", check:(p)=> (p.progressStars||0) >= 3 },
  { id:"avatar_pet",  emoji:"🦄", name:"Pet Unlock",     desc:"Unlock a pet (5⭐)", check:(p)=> (p.progressStars||0) >= 5 },
  { id:"daily_claim", emoji:"🎁", name:"Daily Winner",   desc:"Claim a daily reward", check:(p)=> !!p.daily?.claimed },
  { id:"badge_set",   emoji:"🏅", name:"Badge Collector",desc:"Unlock any skill badge", check:(p)=> Object.keys((p.badgeProgress?.unlocked)||{}).length >= 1 },
  { id:"pro_coder",   emoji:"🏆", name:"Pro Coder",      desc:"Unlock 5 skill badges", check:(p)=> Object.keys((p.badgeProgress?.unlocked)||{}).length >= 5 },
];

function getTrophyState(){
  const p = readActiveProfile();
  return p.trophies || { unlocked:{} };
}
function setTrophyState(ts){
  writeActiveProfile({ trophies: ts });
}
function maybeUnlockTrophies(showFx=true){
  const p = readActiveProfile();
  const ts = getTrophyState();
  ts.unlocked = ts.unlocked || {};
  let newly = [];
  TROPHIES.forEach(t => {
    if (ts.unlocked[t.id]) return;
    if (t.check(p)){
      ts.unlocked[t.id] = true;
      newly.push(t);
    }
  });
  if (newly.length){
    setTrophyState(ts);
    updateTrophyCertButton();
    if (showFx) confetti(70);
    setStatus(`Trophy unlocked: ${newly[0].emoji} ${newly[0].name}!`, "good");
    playSound("success");
  try{ maybeUnlockTrophies(true); }catch{}
  }
  return newly;
}

function confetti(n=60){
  if (!confettiEl) return;
  confettiEl.innerHTML = "";
  const w = window.innerWidth, h = window.innerHeight;
  for (let i=0;i<n;i++){
    const d = document.createElement("div");
    d.className = "c";
    d.style.left = Math.random()*w + "px";
    d.style.top = (-20 - Math.random()*200) + "px";
    d.style.background = `hsl(${Math.floor(Math.random()*360)}, 90%, 60%)`;
    d.style.animationDuration = (1.2 + Math.random()*1.1) + "s";
    d.style.transform = `rotate(${Math.random()*360}deg)`;
    confettiEl.appendChild(d);
  }
  setTimeout(()=>{ confettiEl.innerHTML=""; }, 2200);
}

function renderTrophies(){
  maybeUnlockTrophies(false);
  updateTrophyCertButton();
  const ts = getTrophyState();
  trophiesGrid.innerHTML = "";
  TROPHIES.forEach(t => {
    const ok = !!ts.unlocked?.[t.id];
    const card = document.createElement("div");
    card.className = "dashCard";
    card.innerHTML = `<h4>${t.emoji} ${t.name} ${ok?"✅":""}</h4>
      <div class="tinyNote">${t.desc}</div>`;
    trophiesGrid.appendChild(card);
  });
}

trophiesBtn?.addEventListener("click", () => { renderTrophies(); showModal(trophiesModal); });
closeTrophiesBtn?.addEventListener("click", () => hideModal(trophiesModal));


/* QRCode generator (compact)
   Based on the well-known qrcode-generator project by Kazuhiko Arase (MIT License).
   This is a trimmed helper to render a QR for URLs (Byte mode). */
function makeQR(text){
  const qr = qrcodegen.QrCode.encodeText(String(text), qrcodegen.QrCode.Ecc.MEDIUM);
  return { getModuleCount: () => qr.size, isDark: (row, col) => qr.getModule(col, row) };
}
function drawQRToCanvas(canvas, text){
  if (!canvas) return;
  const help = document.querySelector('.qrHelp');
  let qr;
  try { qr = makeQR(text); }
  catch {
    canvas.hidden = true;
    if (help) help.textContent = 'This creation is too large for a QR code. Copy the share link instead.';
    return false;
  }
  canvas.hidden = false;
  if (help) help.textContent = 'Scan this code to open the creation, or copy the share link.';
  const count = qr.getModuleCount();
  const border = 4;
  canvas.width = canvas.height = Math.max(220, (count + border * 2) * 4);
  const ctx = canvas.getContext('2d');
  const cell = Math.floor(canvas.width / (count + border * 2));
  const offset = Math.floor((canvas.width - count * cell) / 2);
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  for (let row=0; row<count; row++) for (let col=0; col<count; col++) {
    if (qr.isDark(row,col)) ctx.fillRect(offset + col*cell, offset + row*cell, cell, cell);
  }
}
function trophyMilestoneLabel(count){
  const total = TROPHIES.length;
  if (count >= total) return { title: "Trophy Master", emoji:"🏆", line:`Unlocked all ${total} trophies!` };
  if (count >= 6) return { title: "Trophy Champion", emoji:"🥇", line:`Unlocked ${count} trophies!` };
  if (count >= 3) return { title: "Trophy Starter", emoji:"🌟", line:`Unlocked ${count} trophies!` };
  return null;
}

function updateTrophyCertButton(){
  const p = readActiveProfile();
  const ts = getTrophyState();
  const unlockedCount = Object.keys(ts.unlocked||{}).length;
  const ms = trophyMilestoneLabel(unlockedCount);
  if (!printTrophyCertBtn) return;
  printTrophyCertBtn.disabled = !ms;
  printTrophyCertBtn.textContent = ms ? `Print Trophy Certificate ${ms.emoji}` : "Print Trophy Certificate 🏅";
}

function printTrophyCertificate(){
  const st = loadState();
  const ts = getTrophyState();
  const unlockedCount = Object.keys(ts.unlocked||{}).length;
  const ms = trophyMilestoneLabel(unlockedCount);
  if (!ms) return alert("Unlock more trophies to earn a certificate!");
  const profileName = (st.profilesById?.[st.activeProfileId||"default"]?.name) || "Default";
  const w = getWorld();
  const w2 = window.open("", "_blank");
  if (!w2) return alert("Popup blocked. Allow popups to print.");
  const html = `<!doctype html><html><head><meta charset="utf-8" />
<title>Starbyte Quest Trophy Certificate</title>
<style>
  body{font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; padding:20px; background:#fff;}
  .cert{max-width:900px; margin:0 auto; border:3px solid #111; border-radius:22px; padding:24px; text-align:center;}
  .top{font-weight:1000; letter-spacing:.6px;}
  .big{font-weight:1000; font-size:34px; margin:10px 0;}
  .name{font-weight:1000; font-size:28px; margin:10px 0;}
  .line{color:#333; margin-top:10px; font-size:16px;}
  .foot{display:flex; justify-content:space-between; margin-top:18px; color:#333; font-size:12px;}
</style>
</head><body>
  <div class="cert">
    <div class="top">★ Starbyte Quest ★</div>
    <div class="big">${ms.emoji} ${ms.title} ${ms.emoji}</div>
    <div class="line">This certificate is proudly awarded to</div>
    <div class="name">${profileName}</div>
    <div class="line">${ms.line}</div>
    <div class="line">World: ${w.emoji} ${w.name}</div>
    <div class="line">Date: ${new Date().toLocaleDateString()}</div>
    <div class="foot"><div>Keep it fun ✨</div><div>Great job coding!</div></div>
  </div>
</body></html>`;
  w2.document.open(); w2.document.write(html); w2.document.close();
  w2.focus(); w2.print();
}

printTrophyCertBtn?.addEventListener("click", printTrophyCertificate);


// ---------------------- Language Packs (i18n) ----------------------
const I18N = {
  en: {
    install: "Install 📲",
    teacher: "Teacher 🏫",
    narrationOn: "Narration: On 🗣️",
    narrationOff: "Narration: Off 🗣️",
    storyOn: "Story: On 📖",
    storyOff: "Story: Off 📴",
    coach: "Coach",
    daily: "Daily Challenge",
    share: "Share a Creation",
    trophies: "Trophies",
    worlds: "World Map",
    profiles: "Profiles",
    skillTree: "Skill Tree",
    lessonsTitle: "Lesson Plans",
    printLessons: "Print Lesson Pack 📄",
    lessonIntro: "Short, fun lessons you can do in 10–15 minutes.",
  },
  mi: {
    install: "Tāuta 📲",
    teacher: "Kaiako 🏫",
    narrationOn: "Kōrero: Kā 🗣️",
    narrationOff: "Kōrero: Weto 🗣️",
    storyOn: "Paki: Kā 📖",
    storyOff: "Paki: Weto 📴",
    coach: "Kaiāwhina",
    daily: "Wero o te rā",
    share: "Tuku mahi",
    trophies: "Tohu 🏆",
    worlds: "Māpihi Ao",
    profiles: "Kōtaha",
    skillTree: "Rākau Pūkenga",
    lessonsTitle: "Mahere Ako",
    printLessons: "Tā PDF 📄",
    lessonIntro: "He akoranga poto, ngahau (10–15 meneti).",
  },
  es: {
    install: "Instalar 📲",
    teacher: "Profe 🏫",
    narrationOn: "Narración: Sí 🗣️",
    narrationOff: "Narración: No 🗣️",
    storyOn: "Historia: Sí 📖",
    storyOff: "Historia: No 📴",
    coach: "Guía",
    daily: "Reto diario",
    share: "Compartir",
    trophies: "Trofeos",
    worlds: "Mapa",
    profiles: "Perfiles",
    skillTree: "Árbol de habilidades",
    lessonsTitle: "Planes de clase",
    printLessons: "Imprimir 📄",
    lessonIntro: "Lecciones cortas y divertidas (10–15 minutos).",
  }
};

function t(key){
  const st = loadState();
  const lang = st.lang || "en";
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}

function applyLanguage(){
  const st = loadState();
  const lang = st.lang || "en";
  if (langSelect) langSelect.value = lang;
  // Buttons
  if (installBtn) installBtn.textContent = t("install");
  if (teacherBtn) teacherBtn.textContent = t("teacher");
  if (narrateBtn) narrateBtn.textContent = (st.narrationOn ? t("narrationOn") : t("narrationOff"));
  // These exist in HTML already, but we can lightly update key toggles
  try{ renderStory(); }catch{}
  try{ renderDaily(); }catch{}
}

function narrationEnabled(){ return !!loadState().narrationOn; }
function speak(text){
  if (!canSpeak()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = ({ en:"en", mi:"mi-NZ", es:"es" })[loadState().lang] || "en";
  window.speechSynthesis.speak(utterance);
}
narrateBtn?.addEventListener("click", () => {
  saveState({ narrationOn: !narrationEnabled() });
  applyLanguage();
  if (narrationEnabled()) speak(`${levelStory.textContent}. ${levelObjective.textContent}`);
  else if (canSpeak()) window.speechSynthesis.cancel();
});
langSelect?.addEventListener("change", () => {
  saveState({ lang: langSelect.value });
  applyLanguage();
  playSound("open");
});


// ---------------------- Teacher / Curriculum Mode ----------------------
const LESSONS = [
  { age:"4–5", title:"Blocks & Patterns", mins:10, goals:["Drag blocks", "Say hello", "Add stars"], activity:"Use Block Mode. Make a pattern: say → star → star." },
  { age:"6–7", title:"First Typing", mins:12, goals:["Type say()", "Run code", "Celebrate success"], activity:"Type say('Hi!'); then addStar(); then run." },
  { age:"7–8", title:"Loops", mins:15, goals:["repeat()", "Make a star shower"], activity:"repeat(5, () => addStar());" },
  { age:"7–8", title:"Buttons", mins:15, goals:["onButton()", "Interactive play"], activity:"Make Button A say something funny." },
  { age:"9–10", title:"Variables", mins:15, goals:["let x", "Use numbers"], activity:"let n=3; repeat(n, () => addStar());" },
  { age:"9–10", title:"Build a Mini-game", mins:18, goals:["Maker mode", "Set goal/time"], activity:"Use Maker to build a 30-second challenge." },
];

function renderLessons(){
  lessonGrid.innerHTML = "";
  const header = document.createElement("div");
  header.className = "dashCard";
  header.innerHTML = `<h4>${t("lessonsTitle")}</h4><div class="tinyNote">${t("lessonIntro")}</div>`;
  lessonGrid.appendChild(header);

  LESSONS.forEach((l, idx) => {
    const card = document.createElement("div");
    card.className = "dashCard";
    card.innerHTML = `<h4>${l.title}</h4>
      <div class="dashRow"><span>Age</span><b>${l.age}</b></div>
      <div class="dashRow"><span>Time</span><b>${l.mins} min</b></div>
      <div class="tinyNote"><b>Goals:</b> ${l.goals.join(", ")}</div>
      <div class="tinyNote"><b>Activity:</b> ${l.activity}</div>
      <div class="controls" style="margin-top:10px;">
        <button class="btn small" data-jump="${idx}">Start This Lesson ▶</button>
      </div>`;
    lessonGrid.appendChild(card);
  });

  lessonGrid.querySelectorAll("[data-jump]").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.getAttribute("data-jump")||0);
      const route = [
        {pack:'4-5',level:0}, {pack:'6-7',level:0},
        {pack:'7-8',level:5}, {pack:'7-8',level:6},
        {pack:'9-10',level:0}, {pack:'9-10',level:0,maker:true}
      ][i];
      if (!route) return;
      agePackSelect.value = route.pack;
      writeActiveProfile({agePack:route.pack});
      loadLevel(route.level);
      hideModal(teacherModal);
      if (route.maker) { renderMaker(); showModal(makerModal); }
      setStatus("Lesson started! Try the mission on the left.", "good");
      playSound("success");
    });
  });
}

teacherBtn?.addEventListener("click", () => { renderLessons(); showModal(teacherModal); });
closeTeacherBtn?.addEventListener("click", () => hideModal(teacherModal));

printLessonBtn?.addEventListener("click", () => {
  const w = window.open("", "_blank");
  if (!w) return alert("Popup blocked. Allow popups to print.");
  const items = LESSONS.map(l => `<li><b>${l.title}</b> (Age ${l.age}, ${l.mins} min)<br/><span>${l.activity}</span></li>`).join("");
  const html = `<!doctype html><html><head><meta charset="utf-8"/>
  <title>Starbyte Quest Lesson Pack</title>
  <style>
    body{font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; padding:20px;}
    h1{margin:0 0 6px;}
    .note{color:#333; margin:0 0 14px;}
    li{margin:10px 0;}
    ul{padding-left:18px;}
    .box{border:2px solid #111; border-radius:18px; padding:18px;}
  </style></head><body>
    <div class="box">
      <h1>★ Starbyte Quest — Lesson Pack</h1>
      <p class="note">Short lessons you can do at home or in class. Print as PDF.</p>
      <ul>${items}</ul>
    </div>
  </body></html>`;
  w.document.open(); w.document.write(html); w.document.close();
  w.focus(); w.print();
});


// ---------------------- PWA Install ----------------------
let deferredInstallPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  if (installBtn) installBtn.classList.add("success");
});

installBtn?.addEventListener("click", async () => {
  // If browser supports install prompt
  if (deferredInstallPrompt){
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installBtn.classList.remove("success");
    setStatus(choice?.outcome === "accepted" ? "Installed! 🎉" : "Install cancelled.", "neutral");
    playSound("open");
    return;
  }
  alert("Install tip:\n\n• On Android Chrome: open menu ⋮ → Add to Home screen\n• On iPhone Safari: Share → Add to Home Screen\n• On desktop Chrome/Edge: look for an Install icon in the address bar");
});


// Register service worker (offline)
window.addEventListener("load", () => {
  if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("./sw.js").catch(()=>{});
  }
});


// ---------------------- Home Menu + Onboarding ----------------------
let selectedHomeTile = "play";
function selectTile(which){
  selectedHomeTile = which;
  [tilePlay, tileLearn, tileMake, tileTrophies].forEach(t => t?.classList.remove("selected"));
  ({play:tilePlay, learn:tileLearn, make:tileMake, trophies:tileTrophies}[which])?.classList.add("selected");
}
tilePlay?.addEventListener("click", () => selectTile("play"));
tileLearn?.addEventListener("click", () => selectTile("learn"));
tileMake?.addEventListener("click", () => selectTile("make"));
tileTrophies?.addEventListener("click", () => selectTile("trophies"));

function showHome(){
  if (!homeScreen) return;
  homeScreen.setAttribute("aria-hidden", "false");
  selectTile(selectedHomeTile || "play");
}
function hideHome(){
  if (!homeScreen) return;
  homeScreen.setAttribute("aria-hidden", "true");
}

homeBtn?.addEventListener("click", () => {
  showHome();
  playSound("open");
});

startBtn?.addEventListener("click", () => {
  hideHome();
  // route based on tile
  if (selectedHomeTile === "learn"){
    teacherBtn?.click();
    // auto start first lesson after modal opens (optional) — keep simple
  } else if (selectedHomeTile === "make"){
    makerBtn?.click();
  } else if (selectedHomeTile === "trophies"){
    trophiesBtn?.click();
  }
  playSound("success");
});

walkthroughBtn?.addEventListener("click", () => {
  buildOnboarding();
  showModal(onboardModal);
  playSound("open");
});
closeOnboardBtn?.addEventListener("click", () => hideModal(onboardModal));

const ONBOARD = [
  { title:"1) Choose a profile", body:"Tap Profiles 👧👦 to pick your name. Everyone gets their own stars and trophies." },
  { title:"2) Pick a world", body:"Tap Worlds 🗺️ (Candy, Unicorn, Space…). Story Mode changes with your world." },
  { title:"3) Run your code", body:"Press Run ▶ to see your hero talk, move, and collect stars." },
  { title:"4) Try blocks (ages 4–5)", body:"In Pack 4–5 you can drag blocks instead of typing. Coach mode highlights the next block." },
  { title:"5) Daily reward", body:"Tap Daily 🎁 to get a challenge and claim bonus stars." },
  { title:"6) Maker mode", body:"Tap Maker 🧰 to build a mini‑game and play it on the Game Screen." },
  { title:"7) Share", body:"Tap Share 🔗 to make a link or QR code and load your creation on another device." },
  { title:"8) Trophies", body:"Trophies 🏆 unlock automatically. Print a certificate when you reach a milestone!" },
  { title:"9) Install like an app", body:"Tap Install 📲 (or Add to Home Screen) to use offline like a real app." },
];

let onboardIndex = 0;
function buildOnboarding(){
  onboardIndex = 0;
  renderOnboarding();
}
function renderOnboarding(){
  if (!onboardSteps) return;
  onboardSteps.innerHTML = "";
  const s = ONBOARD[onboardIndex];
  const el = document.createElement("div");
  el.className = "onboardStep";
  el.innerHTML = `<h4>${s.title}</h4><div class="tinyNote">${s.body}</div>`;
  onboardSteps.appendChild(el);
  prevOnboardBtn.disabled = onboardIndex === 0;
  nextOnboardBtn.textContent = onboardIndex === ONBOARD.length-1 ? "Finish ✅" : "Next ▶";
  // narration support
  try{ if (narrationEnabled()) speak(`${s.title}. ${s.body}`); }catch{}
}
prevOnboardBtn?.addEventListener("click", () => { onboardIndex = Math.max(0, onboardIndex-1); renderOnboarding(); playSound("click"); });
nextOnboardBtn?.addEventListener("click", () => {
  if (onboardIndex >= ONBOARD.length-1){
    hideModal(onboardModal);
    saveState({ hasSeenOnboarding: true });
    playSound("success");
    return;
  }
  onboardIndex++;
  renderOnboarding();
  playSound("click");
});

// Show home screen the first time someone visits
(function firstRun(){
  const st = loadState();
  if (!st.hasSeenOnboarding){
    showHome();
  }
})();


// ---------------------- Parent Lock (Kid-safe Focus Mode) ----------------------
function tagParentOnly(){
  [shareBtn, installBtn, teacherBtn, aboutBtn].forEach(el => { if (el) el.classList.add("focusRestricted"); });
}
tagParentOnly();

function getPinHash(){
  return loadState().pinHash || "";
}
function hashPin(pin){
  // Simple hash (not crypto-secure) but fine for kid-lock UX.
  // Uses a stable salt in code to prevent obvious plain text storage.
  const salt = "starbyte-pin-v1";
  let h = 0;
  const s = salt + pin;
  for (let i=0;i<s.length;i++){ h = ((h<<5)-h) + s.charCodeAt(i); h |= 0; }
  return String(h);
}
function setPin(pin){
  saveState({ pinHash: hashPin(pin) });
}
function checkPin(pin){
  const ph = getPinHash();
  if (!ph) return false;
  return hashPin(pin) === ph;
}
function isFocusMode(){
  return !!loadState().focusModeOn;
}
function setFocusMode(on){
  saveState({ focusModeOn: !!on });
  document.body.classList.toggle("focusMode", !!on);
  updateFocusUI();
}
function updateFocusUI(){
  const on = isFocusMode();
  if (pinInput) pinInput.disabled = on;
  if (setPinBtn) setPinBtn.disabled = on;
  if (mathGateToggle) mathGateToggle.disabled = on;
  if (mathGateUnlockBtn) mathGateUnlockBtn.disabled = !on || !!getPinHash() || !isMathGateEnabled();
  if (toggleFocusBtn) toggleFocusBtn.textContent = on ? "Turn Focus Mode Off" : "Turn Focus Mode On";
  if (lockBtn) lockBtn.textContent = on ? "Locked 🔒" : "Lock 🔒";
  // In focus mode, also disable some things like link navigation by default
  if (on){
    setStatus("Focus Mode ON 🔒 (use PIN to unlock)", "neutral");
  }
}

function openLockModal(){
  updateFocusUI();
  try{ syncMathGateUI(); }catch{}
  showModal(lockModal);
}
lockBtn?.addEventListener("click", openLockModal);
closeLockBtn?.addEventListener("click", () => hideModal(lockModal));

setPinBtn?.addEventListener("click", () => {
  if (isFocusMode()) return;
  const pin = (pinInput?.value || "").trim();
  if (!/^\d{4}$/.test(pin)) return alert("Please enter exactly 4 digits.");
  setPin(pin);
  pinInput.value = "";
  setStatus("PIN set ✅", "good");
  playSound("success");
});

unlockBtn?.addEventListener("click", () => {
  const pin = (pinUnlockInput?.value || "").trim();
  if (!/^\d{4}$/.test(pin)) return alert("Enter your 4-digit PIN.");
  if (checkPin(pin)){
    setFocusMode(false);
    pinUnlockInput.value = "";
    hideModal(lockModal);
    setStatus("Unlocked ✅", "good");
    playSound("success");
  } else {
    playSound("error");
    alert("Wrong PIN.");
  }
});

toggleFocusBtn?.addEventListener("click", () => {
  // If turning ON: allow without PIN (parent can set later), but suggest setting one.
  const on = isFocusMode();
  if (!on){
    setFocusMode(true);
    if (!getPinHash()){
      alert("Focus Mode is ON.\n\nTip: Set a 4-digit PIN so kids can't unlock it.");
    }
    playSound("success");
    return;
  }
  // turning OFF requires PIN if one exists, otherwise Math Gate if enabled
  if (getPinHash()){
    const pin = prompt("Enter 4-digit PIN to turn Focus Mode OFF:");
    if (!pin) return;
    if (!/^\d{4}$/.test(pin)) return alert("PIN must be 4 digits.");
    if (!checkPin(pin)) return alert("Wrong PIN.");
  } else if (isMathGateEnabled()){
    unlockWithMath();
    return;
  }
  setFocusMode(false);
  playSound("success");
});

requestFullscreenBtn?.addEventListener("click", async () => {
  try{
    if (document.fullscreenElement) { await document.exitFullscreen(); return; }
    await document.documentElement.requestFullscreen();
  }catch(e){
    alert("Fullscreen not supported on this browser/device.");
  }
});

function applyFocusModeFromState(){
  document.body.classList.toggle("focusMode", !!loadState().focusModeOn);
  updateFocusUI();
}
applyFocusModeFromState();

// Exit protection (Focus Mode)
window.addEventListener("beforeunload", (e) => {
  if (!isFocusMode()) return;
  e.preventDefault();
  e.returnValue = "";
});

// Block context menu in Focus Mode
window.addEventListener("contextmenu", (e) => {
  if (!isFocusMode()) return;
  e.preventDefault();
});

// Try to block some common exit keys in Focus Mode (browser may still override)
window.addEventListener("keydown", (e) => {
  if (!isFocusMode()) return;
  const k = e.key.toLowerCase();
  const ctrl = e.ctrlKey || e.metaKey;
  // refresh/new tab/devtools shortcuts (best effort)
  if ((ctrl && (k === "r" || k === "w" || k === "t" || k === "n" || k === "l" || k === "p" || k === "s")) ||
      (k === "f5") ||
      (ctrl && k === "shift") ||
      (ctrl && (k === "i" || k === "j" || k === "u"))){
    e.preventDefault();
    e.stopPropagation();
  }
});


// ---------------------- Math Gate (PIN alternative) ----------------------
function isMathGateEnabled(){
  return !!loadState().mathGateOn;
}
function setMathGateEnabled(on){
  saveState({ mathGateOn: !!on });
  if (mathGateToggle) mathGateToggle.checked = !!on;
}
function syncMathGateUI(){
  if (mathGateToggle) mathGateToggle.checked = isMathGateEnabled();
}
syncMathGateUI();

mathGateToggle?.addEventListener("change", () => {
  if (isFocusMode()) { syncMathGateUI(); return; }
  setMathGateEnabled(!!mathGateToggle.checked);
  playSound("click");
});

// Generate an easy question (kept simple on purpose)
function mathQuestion(){
  const st = loadState();
  // Slightly harder if kid is older pack
  const pack = agePackSelect?.value || st.agePack || "6-7";
  let max = (pack === "4-5") ? 10 : (pack === "6-7" ? 20 : 30);
  const a = 2 + Math.floor(Math.random() * (max - 1));
  const b = 2 + Math.floor(Math.random() * (max - 1));
  const op = Math.random() < 0.85 ? "+" : "-";
  let q, ans;
  if (op === "+"){
    q = `${a} + ${b}`;
    ans = a + b;
  } else {
    // Ensure non-negative
    const big = Math.max(a,b);
    const small = Math.min(a,b);
    q = `${big} - ${small}`;
    ans = big - small;
  }
  return { q, ans };
}

function unlockWithMath(){
  if (!isFocusMode() || getPinHash() || !isMathGateEnabled()) return;
  const { q, ans } = mathQuestion();
  const resp = prompt(`Parent Unlock (Math Gate)\n\nWhat is ${q} ?`);
  if (resp === null) return;
  const n = Number(String(resp).trim());
  if (!Number.isFinite(n)){
    playSound("error");
    return alert("Please enter a number.");
  }
  if (n === ans){
    setFocusMode(false);
    hideModal(lockModal);
    setStatus("Unlocked ✅", "good");
    playSound("success");
  } else {
    playSound("error");
    alert("Not quite. Try again.");
  }
}
mathGateUnlockBtn?.addEventListener("click", unlockWithMath);








