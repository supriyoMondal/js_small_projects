const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-agin');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = [
    "programming",
    'application',
    "interface",
    "travelling",
    "javaScript",
    "helloWorld",
    "wizard"
]

let selectedWord = words[Math.floor(Math.random() * words.length)];
let correctLetters = [];
let wrongLetters = [];

//show hidden word
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
            .split('')
            .map(letter =>
                `<div class='letter'>
    ${correctLetters.includes(letter) ? letter : ''}
    </div>`
            )
            .join('')}
    `;
    const innerWord = wordEl.innerText.replace(/\n/g, "");
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You Won! ';
        popup.style.display = 'flex';
    }
}

//Key down letter press
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
        } else {
            if (wrongLetters.includes(letter)) return;
            wrongLetters.push(letter);
            updateWrongLetters();
        }
    }
})

function updateWrongLetters() {
    wrongLettersEl.innerHTML = `
 ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
 ${wrongLetters.map(letter => `<span>
 ${letter}
 </span>` )}
 `
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = 'block'
        } else {
            part.style.display = 'none'
        }

    })
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately! You Loss! ';
        popup.style.display = 'flex';
    }
}

//restart game
playAgainBtn.addEventListener('click', () => {
    correctLetters = [], wrongLetters = [], selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();

    updateWrongLetters();
    popup.style.display = 'none';
})

displayWord();