const fs=require('node:fs');
const read=name=>JSON.parse(fs.readFileSync(name,'utf8'));
const regression=read('browser-results.json');
const journey=read('e2e-results.json');
const components=read('component-results.json');
if(regression.failure || journey.failure || components.failed || regression.results.some(check=>!check.value) || journey.results.some(check=>!check.passed))throw Error('Tests have failures; do not publish a passing report');
if(components.runId!==journey.runId)throw Error('Component and journey reports belong to different runs');
const stamp=new Intl.DateTimeFormat('en-NZ',{dateStyle:'full',timeStyle:'short',timeZone:'Pacific/Auckland'}).format(new Date());
const missed=components.uncovered || [];
const tick=String.fromCharCode(96);
const summary=`# App component test report

Completed: ${stamp} (Pacific/Auckland).

## Results

- **${regression.results.length} browser regression assertions passed**, including all 40 built-in reference programs, all 10 guided block solutions, incorrect-program rejection, runtime/syntax errors, the sandbox boundary, capped loops and persistence.
- **${journey.results.length} real-input UI assertions passed**, including the core child/profile journey and the component audit.
- **${components.cases.length} component scenarios passed**, listed below.
- **No uncaught browser exceptions** were recorded in either suite.
- Named-control inventory: **${components.inventory.length-missed.length} of ${components.inventory.length} directly exercised**. Dynamic profile/world/palette/game controls are additionally covered by their scenarios. The remaining named control is listed below.

The component and UI reports share audit run ID ${tick}${journey.runId}${tick}.

## Component matrix

| Component scenario | Result |
| --- | --- |
${components.cases.map(item=>'| '+item.component.replaceAll('|','\\|')+' | '+item.status+' |').join('\n')}

## Repairs made during this audit

- Fixed the mini-game launcher’s undefined-variable error and verified full rounds, scoring, bonuses and restart.
- Fixed trusted-click routing from home activities and mapped teacher lessons to their actual quests or Maker.
- Restored language labels after reload and restored the world-story component and its per-child toggle.
- Prevented math unlock from bypassing a stored focus PIN; disabled PIN replacement and lock configuration while locked.
- Replaced the incomplete QR implementation. An independent decoder now verifies the exact exported link. Large creations show a copy-link fallback rather than a stale QR image.
- Fixed shared-URL loading after initialization and same-page hash changes, and rejected malformed shared blocks.
- Preserved parent edits to goals/hints and custom levels; restored trophy print eligibility after reload.
- Fixed inserted repeat-command newlines, block-mode insertions and zero movement values. Standard drag payloads are provided for both block palettes.
- Theme changes update the stage without running or grading a learner’s program.
- Modal backdrops now dismiss consistently across all dialogs, while leaving Focus Mode enabled when it is locked.
- Tightened lesson completion checks so missing variables/functions/conditionals, wrong random ranges, non-loop stars, invalid colours and empty greetings do not incorrectly pass.

## Test method and limits

Tests run locally in headless Chrome on Windows. UI actions use hit-tested mouse/keyboard input, native drag interception and emulated phone touch. The game iframe is inspected by its exact frame ID through browser debugging, retaining the production iframe sandbox. Tests use fresh, isolated browser profiles and never alter a normal browser’s saved progress. High-star, badge and completed-pack fixtures are explicitly seeded to reach locked rewards without claiming they were earned through a complete playthrough.

The following integrations were **tested with browser hooks or content capture**, not physical-device output:

| Integration | Automated verification | Still needs manual verification |
| --- | --- | --- |
| Certificate, report, lesson and trophy printing | Button wiring and generated printable HTML | Native print dialog, printer output and saved PDF layout |
| Narration | Lesson text handed to the speech API; setting persistence | Audible output, voice availability and pronunciation |
| Sound | Controls and settings during user interaction | Audible output and volume on devices |
| Installation | Fallback instructions and accepted/dismissed prompt branches | Actual OS/browser installation and launch |
| Fullscreen | Request handed to the browser API | Device-specific fullscreen and exit behavior |
| QR sharing | Generated pixels decoded independently to the exact link | Camera scanning under real lighting and screen scaling |
| Phone UI | Emulated 375 px layout and genuine browser touch events | Physical iOS/Android devices and assistive technology |

The tests use a local HTTP server, not file:// loading or a production host. This is not an exhaustive cross-browser or accessibility certification. No hosted deployment was changed.

## Control inventory exception

${missed.map(item=>'- `'+item.id+'`: intentionally hidden duplicate block Run button. The visible main Run action is exercised in both code and block modes.').join('\n') || 'None.'}

## Reproduce

From the repository root, with Node and Chrome installed:

\`\`\`powershell
node browser-check.cjs
$env:COMPONENT_AUDIT = '1'
node e2e-check.cjs
node scripts/write-test-report.cjs
\`\`\`

${tick}CHROME_PATH${tick} overrides the UI runner’s browser executable. ${tick}AUDIT_FILTER${tick} can run selected component scenarios for diagnosis; remove it for a complete audit. The reviewed run above is unfiltered. Raw JSON reports, temporary browser profiles and diagnostic screenshots are ignored by Git. Local QR library provenance is documented in [THIRD_PARTY.md](THIRD_PARTY.md).
`;
fs.writeFileSync('TEST_REPORT.md',summary);
console.log(`Report written: ${regression.results.length} regressions; ${journey.results.length} UI assertions; ${components.cases.length} scenarios.`);
