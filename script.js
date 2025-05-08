// Word list for the game
const words = [
    "apple", "banana", "cherry", "grape", "orange",
    "cat", "dog", "bird", "fish", "horse",
    "house", "car", "tree", "river", "mountain",
    "sky", "star", "cloud", "flower", "dream", "light",
    "ocean","rain", "bridge", "shadow", "stone", "forest"
];

// Game variables
let score = 0;
let timeLeft = 60;
let currentWord = "";
let timerInterval = null;

// DOM elements
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const startButton = document.getElementById("start-button");
const gameOverScreen = document.getElementById("game-over");
const finalScoreDisplay = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

// Function to get a random word from the list
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

// Function to start the game
function startGame() {
    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    wordInput.value = "";
    wordInput.disabled = false;
    wordInput.focus();
    startButton.disabled = true;
    gameOverScreen.classList.add("hidden");

    // Set the first word
    currentWord = getRandomWord();
    wordDisplay.textContent = currentWord;

    // Start the timer
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
        endGame();
    }
}

// Function to check the input
function checkInput() {
    const input = wordInput.value.trim().toLowerCase();
    if (input === currentWord) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        currentWord = getRandomWord();
        wordDisplay.textContent = currentWord;
        wordInput.value = "";
    }
}

// Function to end the game
function endGame() {
    clearInterval(timerInterval);
    wordInput.disabled = true;
    startButton.disabled = false;
    gameOverScreen.classList.remove("hidden");
    finalScoreDisplay.textContent = score;
}

// Event listeners
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
wordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkInput();
    }
});