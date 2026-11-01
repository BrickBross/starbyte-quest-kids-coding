# Game review and repair

Starbyte Quest is intended to be a local, child-friendly coding playground: read a short goal, build blocks or edit JavaScript, press Run, see the hero respond, and earn a star for completing a new lesson. Profiles should keep each child’s progress separate. Worlds, stickers and mini-games support that learning loop.

The core problems were functional:

- Startup called block code before its constants were initialized, stopping later UI setup.
- The sandbox prevented direct calls to the hero’s controls. Commands now use messages while retaining the sandbox.
- Lessons ran automatically and reported intermediate states as successes; subsequent errors could be overwritten. Completion now requires an explicit run that finishes without an error, and messages are tied to the current run, lesson and profile.
- Progress and stars were written to global storage but read from child profiles, losing rewards and allowing repeated awards. They now use the active profile.
- Block coaching controls were missing from HTML, guidance did not match the lessons, and the Size block did not exist.
- Maker called missing APIs. It now creates timed target games with the selected duration and score goal.
- Unrelated actions contained copied completion code with an undefined variable. Those actions no longer record false lesson completions.
- Daily challenges lost their function when serialized. Their checks are restored from built-in definitions after loading.
- Sound, voice, guidance, parent PIN, sticker unlocks and narration mixed global and profile settings. Their reads and writes now agree.
- Movement goals depended on the physical iframe dimensions. Logical coordinates now scale to the available play area.
- The home overlay covered walkthroughs, and some normal navigation controls were always hidden. Their visibility now follows the intended flow.
- Offline root navigation could keep serving old HTML. Navigation now refreshes from the network with an offline fallback, and cache cleanup is limited to this app’s caches.

Verification uses a real headless Chrome browser: all 40 lesson starters, all 10 guided block solutions, syntax/runtime errors, sandbox button commands, reward deduplication, separate child profiles, persistence after reload, daily storage, Maker startup, toggles and a phone-sized viewport. The browser suite also checks for uncaught exceptions.

Run `node browser-check.cjs` from this directory on Windows with Chrome installed in its standard location. It uses only Node’s built-in modules, serves the game on localhost, and writes `browser-results.json`. Temporary browser profiles and results are ignored by Git. These checks cover the core flow; they do not certify every optional feature or voice availability on every device.
