# ★ Starbyte Quest

![Starbyte Quest Logo](./logo.svg)

<!-- Badges -->
![Deploy](https://github.com/BrickBross/starbyte-quest-kids-coding/actions/workflows/pages.yml/badge.svg)
![PWA](https://img.shields.io/badge/PWA-offline%20ready-blue)
![License](https://img.shields.io/badge/License-MIT-black)
![Made with](https://img.shields.io/badge/Made%20with-HTML%20%7C%20CSS%20%7C%20JS-purple)

**Play it here:** https://brickbross.github.io/starbyte-quest-kids-coding/


[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-ready-brightgreen)](#deploy-to-github-pages)
[![License](https://img.shields.io/badge/License-MIT-blue)](./LICENSE)
[![Made for Kids](https://img.shields.io/badge/Made%20for-Kids%204–10-ff69b4)](#age-packs-4–10)
[![Offline Friendly](https://img.shields.io/badge/Works-Offline%20(Local)-orange)](#offline--privacy)
[![No Dependencies](https://img.shields.io/badge/Dependencies-None-success)](#what-is-this)

A **browser-only**, **kid-friendly coding adventure** designed for ages **4–10**.  
Host it free on **GitHub Pages**. No installs. No external scripts. No accounts.

---

## What is this?

Starbyte Quest is a single static website (HTML/CSS/JS) that teaches kids how to “code” by controlling a little hero:

- 💬 `say("Hello!")`
- ➡️ `moveRight(120)`
- ⭐ `addStar()`
- 🔁 `repeat(3, () => addStar())`

For **Ages 4–5**, kids use a **Drag-and-Drop Block Mode** (no typing required).  
For older packs, kids type tiny commands into the editor.

---

## Demo / Pages

Once published, your game URL will look like:

- `https://<your-username>.github.io/<repo-name>/`

The app includes:
- `index.html` (the game)
- `about.html` (extremely detailed explanation page)

---

## Quick Start (VS Code)

1. Download and unzip the project
2. Open the folder in VS Code
3. Run locally:
   - Recommended: install **Live Server** extension
   - Right-click `index.html` → **Open with Live Server**

---

## Deploy to GitHub Pages

1. Create a GitHub repo (example: `starbyte-quest`)
2. Upload these files to the repo root:
   - `index.html`
   - `about.html`
   - `style.css`
   - `app.js`
   - `README.md`
3. GitHub → **Settings → Pages**
4. **Deploy from a branch**
5. Branch: **main**, Folder: **/** (root)

---

## Age Packs (4–10)

There are multiple packs with **10 core levels each**, plus you can add unlimited custom levels in Parent Mode.

### Ages 4–5 (Block Mode)
- 🧩 Drag and drop blocks (or tap blocks on touch devices)
- 👩‍🏫 **Coach Bar**:
  - Guided mode highlights the next block
  - Optional voice tips using Text-to-Speech
- Blocks generate code automatically (code box becomes read-only)

### Ages 6–7
- Beginner typing
- Introduces repeating and button events

### Ages 7–8
- Full learning path: events, loops, variables, functions, random

### Ages 9–10
- Adds `if/else` style thinking and more “build a mini-game” tasks

---

## How Block Mode Works (Ages 4–5)

Block Mode is a simple list program:

1. Pick a block (Say / Move / Colour / Star)
2. Drop it into the workspace
3. Change tiny settings (text / number / colour)
4. Press **Run Blocks ▶**

The system converts blocks into real code like:

```js
say("Hello!");
moveRight(120);
addStar();
```

and runs that in a sandboxed Game Screen.

---

## Stickers, Packs, and Album

- Each completed new level earns **1⭐**
- Stickers unlock by star milestones
- Choose sticker packs:
  - Mix, Animals, Fantasy, Space, Sweet Treats, Achievements
- Double-tap the sticker shelf to open the **Sticker Album**
- Hold **Shift** and click the Game Screen to place stickers on the stage

---

## Mini-Games

Built-in mini-games run inside the Game Screen:
- Star Catch
- Target Tap

Some mini-games can award a small ⭐ bonus.

---

## Parent Mode

Parent Mode is protected by a local PIN and includes:
- Jump to any level
- Unlock all stickers
- Reset progress
- Edit level story/objective/hint text (local edits)
- Parent Dashboard (approx skill counters)
- Level Builder (add unlimited custom levels)

> Note: Parent Mode is “kid-proofing”, not a high-security lock. This is a local browser app.

---

## Responsive Design (Phone → Ultra-Wide)

- 3-column layout on large screens
- 2 columns on medium screens
- 1 column on phones
- Game screen/editor heights scale with viewport so the UI stays usable

---

## Offline & Privacy

- Works offline after first load (static files)
- No analytics
- No accounts
- No external scripts/images/fonts
- All progress stored using `localStorage` on the device

---

## Extending: Add More Levels

### Option A: Parent Level Builder (easy)
Use Parent Mode → Level Builder to add custom levels on that device.

### Option B: Edit `app.js` (permanent)
In `app.js`, find the pack functions:
- `makePack_4_5()`
- `makePack_6_7()`
- `makePack_7_8()`
- `makePack_9_10()`

Add new levels by copying an existing one.

---

## Badges (optional)
If you add GitHub Actions later, you can include an Actions build badge here.

---

## License

MIT — see [`LICENSE`](./LICENSE).


## Worlds, Story Mode, Profiles, Daily, Avatar, Reports

- **World Map 🗺️**: choose Candy World / Unicorn Valley / Space Station / Dino Jungle / Princess Castle / Pirate Treasure / Neon Arcade.
- **Story Mode 📖**: shows a friendly story line that updates by world + pack + level.
- **Profiles 👧👦**: separate progress per child on the same device.
- **Daily Challenge 🎁**: a simple daily task that awards bonus ⭐.
- **Avatar Creator 🧑‍🚀**: choose base hero + hats + pets (some unlock with ⭐).
- **Progress Report 📄**: printable weekly report (Print/Save PDF).

> All of these are stored locally in the browser (no accounts / no servers).


## Sharing creations (no servers)
- Use **Share 🔗** to export a share-link that contains the current pack/level/theme/avatar and either blocks or code.
- Open the link on another device to load the creation.

## Mini-game Maker 🧰
- Use **Maker 🧰** to build a mini-game with blocks and run it in the Game Screen.

## Trophy Cabinet 🏆
- Collect trophies automatically from stars, badges, daily rewards, worlds, and avatar unlocks.
- Confetti celebrates new trophies.

## QR codes for sharing
- Share modal renders a **QR code** for the share link so you can scan it with a phone camera.

## More Maker blocks
- Maker now includes blocks like **Celebrate 🎉**, **Random Stars 🎲**, **Repeat 🔁**, and **Button A says…**

## Trophy Certificates
- When enough trophies are unlocked, a **Print Trophy Certificate** button becomes available in the Trophy Cabinet.


## Installable (PWA)
- This project includes `manifest.json` + `sw.js` so it can be installed like an app and used offline.
- Use **Install 📲** button or browser “Add to Home Screen”.

## Language Packs
- Built-in UI language selector: English, Te Reo Māori, Español.

## Teacher / Parent Curriculum 🏫
- Lesson plans + printable lesson pack (Print/Save PDF).

## Narration 🗣️
- Optional voice narration for story/instructions using the device’s built-in Text-to-Speech.


## Parent Lock 🔒 (Kid-safe Focus Mode)
- Click **Lock 🔒** to enable Focus Mode.
- In Focus Mode, parent-only buttons are hidden and the app asks for confirmation before leaving.
- Set a 4-digit PIN to prevent kids disabling Focus Mode.

### Forgot the PIN?
This app stores settings in your browser's localStorage.
- Open DevTools → Application/Storage → Local Storage → (your site)
- Remove `starbyte_state` or edit it to clear `pinHash` and `focusModeOn`.


### Math Gate (PIN alternative)
- In **Parent Lock 🔒**, enable **Math Gate** to require a quick math question to unlock Focus Mode.
- If a PIN is set, the PIN takes priority.
