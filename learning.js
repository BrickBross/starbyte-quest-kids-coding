// Teaching and hints are separate from reference solutions and validation.
const LESSON_TOPICS = {
  talk: { name:'Messages', teach:'A message tells your hero what to say. Put your own words inside quotation marks. Each message instruction makes one speech bubble.', hints:['Think of something your hero could say. How many messages does this mission need?', 'Use one Say block or one say instruction for each message. Run your whole program to test it.', 'In code, a message has this shape: say("your words");. Choose your own words and add as many message instructions as the mission asks for.'] },
  color: { name:'Colour', teach:'A colour instruction changes how your hero looks. The colour is a word that you choose. In code, colour words need quotation marks.', hints:['Which instruction changes how the hero looks?', 'Look for Colour in the blocks, or use the setColor command in code. Choose a colour you like.', 'A colour command has parentheses, with your chosen colour word in quotation marks inside them. Check the spelling and the closing parenthesis.'] },
  move: { name:'Movement', teach:'Movement instructions have a direction and a distance. Bigger numbers move the hero farther. Commands run from top to bottom, so you can combine directions.', hints:['Imagine the path before you build it. Which direction should the hero go first?', 'Use the movement commands for the directions in your mission. If the hero stops short, change the distance and try again.', 'Each movement command takes a number in parentheses. For example, moveLeft(20); moves a short distance left. Choose directions and distances for your own mission.'] },
  size: { name:'Size', teach:'Your hero starts at size 80. A larger size number makes a bigger hero; a smaller number makes a smaller hero.', hints:['How big does the mission ask your hero to become?', 'Choose the Size block or the setSize command, then change its number. Remember any other action in the mission.', 'The number goes inside setSize(...). Compare your number with the mission, and check that the command has a closing parenthesis.'] },
  stars: { name:'Stars', teach:'Each Add Star instruction creates one star. Two instructions create two stars. You can count your instructions before running your program.', hints:['Count how many stars the mission asks for.', 'Each Add Star block or addStar command makes one star. Count how many your program will make.', 'In code, addStar(); makes one star. Use the number of instructions the mission needs, then Run to check the star counter.'] },
  loop: { name:'Repeating', teach:'A loop repeats instructions for you. Choose a repeat count and put the action inside the loop. The action happens that many times.', hints:['What needs to happen more than once? What count does the mission ask for?', 'Use repeat for the repeated action. The first value is the repeat count; addStar goes inside the action.', 'A loop has the shape repeat(count, () => { action; });. Replace count and action with what your mission needs.'] },
  event: { name:'Buttons', teach:'An event waits for something to happen. A button instruction tells the hero what to do later, when you press A, B or C. Run first, then press the game button to test it.', hints:['Which button should listen, and what should happen when you press it?', 'Use onButton to connect a button letter to an action. Put the action inside the button handler.', 'The shape is onButton("letter", () => { action; });. Choose the letter and action for this mission. Run, then press that button to test your idea.'] },
  variable: { name:'Remembering a number', teach:'A variable is a named box that remembers a value. Give it a name and value with let. Use the name later instead of writing the same value again.', hints:['What name does the mission ask you to give your variable?', 'Create the variable first, then use its name in a later command. The spelling must match in both places.', 'For example, let distance = 20; stores a number. A later movement can use distance instead of a number. Adapt the name and action to your mission.'] },
  function: { name:'Your own command', teach:'A function groups instructions into a command you name. Defining it teaches the trick; calling its name makes the trick happen. You can call it more than once.', hints:['Think through the little trick: what actions belong together, and in what order?', 'Define a function with the name in the mission. Put the movement commands inside it. Then call the function outside its definition.', 'A function has the shape function trick(){ /* your actions */ }. Run trick(); to call it. Use the mission’s name, actions and number of calls.'] },
  random: { name:'Surprise numbers', teach:'randomInt chooses a whole number between two limits. Save the result in a variable so you can reuse the same surprise number in a loop or message.', hints:['What are the smallest and biggest numbers allowed in this mission?', 'Save a randomInt result, then use that saved number for your repeated action. Remember any message the mission asks for.', 'Use randomInt with your two limits. Give its result a variable name, then use that name as the repeat count.'] },
  condition: { name:'Making a choice', teach:'An if/else chooses between two actions. If the condition is true, the first action runs. Otherwise, the else action runs. Only one branch runs each time.', hints:['What number are you testing? What should happen for each possible result?', 'Choose a random number first. Compare it with 5 using >, then put the two different sizes in the two branches.', 'The shape is if (test) { /* first action */ } else { /* other action */ }. Use your saved number in the test and the mission’s sizes in the actions.'] },
};
const LESSON_PATHS = {
  '4-5': [
    ['Make your hero say something of your own.',['talk']],
    ['Give your hero a colour you like.',['color']],
    ['Move your hero at least 100 steps to the right.',['move']],
    ['Move your hero to the left.',['move']],
    ['Make your hero size 120 or bigger.',['size']],
    ['Make one star appear.',['stars']],
    ['Make two stars appear.',['stars']],
    ['Move your hero up at least 40 steps.',['move']],
    ['Make your hero speak and create a star.',['talk','stars']],
    ['Make your hero speak and move at least 100 steps right.',['talk','move']],
  ],
  '6-7': [
    ['Make your hero say three messages of your own in one program.',['talk']],
    ['Give your hero a colour you choose.',['color']],
    ['Move right at least 120 steps to reach the treasure.',['move']],
    ['Move right at least 70 steps and up at least 30 steps.',['move']],
    ['Use a loop to create three stars.',['loop']],
    ['Make button A move the hero right when you press it.',['event','move']],
    ['Make button B create a star when you press it.',['event','stars']],
    ['Store a distance in a variable named steps, then use it to move right.',['variable','move']],
    ['Choose a colour and make your hero size 120 or bigger.',['size','color']],
    ['Choose a random number from 1 to 3 and create that many stars.',['random','loop']],
  ],
  '7-8': [
    ['Make your hero say three messages of your own in one program.',['talk']],
    ['Give your hero a colour you choose.',['color']],
    ['Move your hero at least 100 steps to the right.',['move']],
    ['Move right at least 60 steps and up at least 40 steps.',['move']],
    ['Make your hero size 120 or bigger, and give them something to say.',['size','talk']],
    ['Use a loop to create at least three stars.',['loop']],
    ['Make button A move your hero right when you press it.',['event','move']],
    ['Save a distance in a variable called steps. Use that variable to move right.',['variable','move']],
    ['Create your own jump command: move up, then down. Call it to try the trick.',['function','move']],
    ['Choose a random number from 1 to 5 and create that many stars.',['random','loop']],
  ],
  '9-10': [
    ['Store a name in a variable, then use that variable in a greeting.',['variable','talk']],
    ['Reach X 300 or more and Y 300 or more. Start at X 120, Y 220.',['move']],
    ['Use a loop to create at least five stars.',['loop']],
    ['Make A move right and B move left. Test both buttons.',['event','move']],
    ['Create and call square: right, down, left and up to trace a square.',['function','move']],
    ['Choose a random number from 3 to 8. Make that many stars and say how many.',['random','loop','talk']],
    ['Choose a number from 1 to 10. If it is above 5, use size 140; otherwise use size 90.',['condition','random']],
    ['Make C create two stars using a loop when you press it.',['event','loop']],
    ['Create a dance command: left, right, left. Call your dance twice.',['function','move']],
    ['Choose a colour, grow to size 120 or more, move 100 steps right, and create three stars.',['color','size','move','stars']],
  ],
};
const LESSON_COMMAND_SHAPES = {
  talk:'say("Good morning!");  // one message',
  color:'setColor("…");',
  move:'moveRight(…);  moveUp(…);  moveLeft(…);  moveDown(…);',
  size:'setSize(…);',
  stars:'addStar();',
  loop:'repeat(…, () => { /* your action */ });',
  event:'onButton("…", () => { /* your action */ });',
  variable:'let yourName = …;  // use yourName later',
  function:'function yourTrick(){ /* your actions */ }\nyourTrick();',
  random:'let yourNumber = randomInt(…, …);',
  condition:'if (yourTest) { /* one choice */ } else { /* other choice */ }',
};
function getLessonGuide(pack, index, level){
  const entry = LESSON_PATHS[pack]?.[index];
  if (!entry) return { goal:level.objective, teaching:level.story, topics:[], hints:['Read the mission and plan one action at a time.', 'Run a small part of your idea, then add the next action.', level.hint || 'Ask a grown-up to help you think through the next step.'] };
  const topics = entry[1].map(id => LESSON_TOPICS[id]);
  const hints = [0,1,2].map(step => topics.map(topic => topic.hints[step]).join(' '));
  if (level.lessonEdits?.hint) hints[0] = level.lessonEdits.hint;
  return { goal:level.lessonEdits?.objective ?? entry[0], topics:entry[1], teaching:topics.map(topic => topic.teach).join(' '), hints };
}
let lessonPractice = { attempts:0, hintStep:0 };
function renderLessonTeaching(level){
  const guide = getLessonGuide(agePackSelect.value, currentLevel, level);
  const teaching = document.getElementById('lessonTeaching');
  teaching.textContent = guide.teaching;
  const reference = document.getElementById('lessonReference');
  reference.replaceChildren();
  reference.hidden = agePackSelect.value === '4-5' || !guide.topics.length;
  if (!reference.hidden) {
    const label = document.createElement('p');
    label.textContent = 'Command shapes — replace … and the named placeholders with your own choices. Nothing is added to your program.';
    reference.append(label);
    const code = document.createElement('pre');
    code.textContent = guide.topics.map(topic => LESSON_COMMAND_SHAPES[topic]).join('\n');
    reference.append(code);
  }
  levelObjective.textContent = guide.goal;
  levelHint.textContent = 'Take your time. Ask for a clue whenever you want.';
  document.getElementById('attemptNote').textContent = 'Your turn! Try an idea, then press Run.';
  document.getElementById('practiceHelp').hidden = true;
  document.querySelector('.missionHint').open = false;
  copyStarterBtn.textContent = '💡 Give me a clue';
  codeBox.placeholder = 'Write your own instructions here…';
}
function requestLessonHint(){
  const level = getLevelsWithEdits(agePackSelect.value)[currentLevel];
  const guide = getLessonGuide(agePackSelect.value, currentLevel, level);
  const index = Math.min(lessonPractice.hintStep, guide.hints.length - 1);
  levelHint.textContent = guide.hints[index];
  lessonPractice.hintStep = Math.min(index + 1, guide.hints.length);
  document.querySelector('.missionHint').open = true;
  document.getElementById('hintProgress').textContent = `Clue ${index + 1} of ${guide.hints.length} · Your work stays yours.`;
  if (agePackSelect.value === '4-5') { setCoach(guide.hints[index]); highlightNextExpectedBlock(); }
  speakCoach(guide.hints[index]);
}
function recordLessonAttempt(run){
  if (run.attemptRecorded) return;
  run.attemptRecorded = true;
  lessonPractice.attempts++;
  document.getElementById('attemptNote').textContent = `Try ${lessonPractice.attempts}: every experiment helps you learn.`;
  if (lessonPractice.attempts >= 3) {
    document.getElementById('practiceHelp').hidden = false;
    // Offer help at the third unsuccessful try, without filling in the answer.
    if (lessonPractice.attempts === 3) requestLessonHint();
  }
}

function lessonFeedback(state, guide){
  const observations = [];
  if (guide.topics.includes('talk')) observations.push(`Your hero said ${state.messages?.filter(message=>message.trim()).length || 0} message(s) with words.`);
  if (guide.topics.includes('stars') || guide.topics.includes('loop')) observations.push(`Your program made ${state.stars || 0} star(s).`);
  if (guide.topics.includes('move')) observations.push(`Your hero finished at X ${state.x}, Y ${state.y}.`);
  if (guide.topics.includes('size')) observations.push(`Your hero’s size is ${state.size}.`);
  if (guide.topics.includes('event')) observations.push('Check what happened when you tested the button.');
  return `${observations.join(' ')} Compare this with your mission. Change one thing and try again, or ask for a clue.`;
}
