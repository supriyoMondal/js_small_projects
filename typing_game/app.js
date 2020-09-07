const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

let randomWord;
let score = 0;
let time = 10;
let countTime = setInterval(updateTime, 1000);
let difficulty = localStorage.getItem('difficulty') || 'easy'
difficultySelect.value = difficulty;

//focus on text on start
text.focus();

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

//add word to dom
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Submit</button>
    `;
    endgameEl.style.display = 'flex'
}

function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if (time == 0) {
        clearInterval(countTime);

        gameOver();
    }
}

addWordToDOM();

text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText == randomWord) {
        addWordToDOM();
        updateScore();
        e.target.value = '';
        if (difficulty == 'easy') {
            time += 5;
        } else if (difficulty == 'medium') {
            time += 3;
        } else {
            time += 2;
        }
        updateTime();
    }
})

settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide')
})

difficultySelect.addEventListener('change', e => {
    localStorage.setItem('difficulty', e.target.value);
    location.reload();
})