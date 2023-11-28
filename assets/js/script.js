const wordBlank = document.querySelector('.word-blanks');
const win = document.querySelector('.win');
const lose = document.querySelector('.lose');
const timerEl = document.querySelector('.timer-count');
const startBtn = document.querySelector('.start-button');

let chosenWord = '';
let numBlanks = 0;
let winCounter = 0;
let loseCounter = 0;
let isWin = false;
let timer;
let timerCount;

let lettersInChosenWord = [];
let blanksLetters = [];

const words = ['javascript', 'piglet', 'skates', 'waffles', 'puppy', 'kitten', 'panda', 'penguin', 'sloth', 'penguin', 'panda'];

function init() {
    getWins();
    getLosses();
};

function startGame() {
    isWin = false;
    timerCount = 10;
    startBtn.disabled = true;
    renderBlanks();
    startTimer();
};

function winGame() {
    wordBlank.textContent = 'You Win!';
    winCounter++;
    startBtn.disabled = false;
    setWins();
};

function loseGame() {
    wordBlank.textContent = 'You Lose!';
    loseCounter++;
    startBtn.disabled = false;
    setLosses();
};

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount >= 0) {
            if (isWin && timerCount > 0) {
                clearInterval(timer);
                winGame();
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
};

function renderBlanks() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    lettersInChosenWord = chosenWord.split('');
    numBlanks = lettersInChosenWord.length;
    blanksLetters = [];

    for (let i = 0; i < numBlanks; i++) {
        blanksLetters.push('_');
    }
    wordBlank.textContent = blanksLetters.join(' ');
};

function setWins() {
    win.textContent = winCounter;
    localStorage.setItem('winCount', winCounter);
};

function setLosses() {
    lose.textContent = loseCounter;
    localStorage.setItem('loseCount', loseCounter);
};

function getWins() {
    let storedWins = localStorage.getItem('winCount');
    if (storedWins === null) {
        winCounter = 0;
    } else {
        winCounter = storedWins;
    }
    win.textContent = winCounter;
};

function getLosses() {
    let storedLosses = localStorage.getItem('loseCount');
    if (storedLosses === null) {
        loseCounter = 0;
    } else {
        loseCounter = storedLosses;
    }
    lose.textContent = loseCounter;
};

function checkWin() {
    if (chosenWord === blanksLetters.join("")) {
        isWin = true;
    }
};

function checkLetters(letter) {
    let letterInWord = false;
    for (let i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === letter) {
            letterInWord = true;
        }
    }
    if (letterInWord) {
        for (let j = 0; j < numBlanks; j++) {
            if (chosenWord[j] === letter) {
                blanksLetters[j] = letter;
            }
        }
        wordBlank.textContent = blanksLetters.join(' ');
    }
};

document.addEventListener('keydown', function(event) {
    if (timerCount === 0) {
        return;
    }
    let key = event.key.toLowerCase();
    let alphabetNumericCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789 '.split('');
    if (alphabetNumericCharacters.includes(key)) {
        let letterGuessed = event.key;
        checkLetters(letterGuessed);
        checkWin();
    }
});

startBtn.addEventListener('click', startGame);

init();

const resetBtn = document.querySelector('.reset-button');

function resetGame() {
    winCounter = 0;
    loseCounter = 0;
    setWins();
    setLosses();
};

resetBtn.addEventListener('click', resetGame);