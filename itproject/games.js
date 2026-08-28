/* =========================================================
   GAME SELECTOR
   ========================================================= */

const gameButtons = document.querySelectorAll(".game-select");

const gameSections = {
    memory: document.getElementById("memoryGame"),
    guess: document.getElementById("guessGame"),
    tic: document.getElementById("ticGame"),
    star: document.getElementById("starGame")
};

gameButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedGame = button.dataset.game;

        gameButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        Object.values(gameSections).forEach(section => {
            section.classList.add("hidden");
        });

        if (gameSections[selectedGame]) {
            gameSections[selectedGame].classList.remove("hidden");
        }

    });

});


/* =========================================================
   MEMORY MATCH
   ========================================================= */

const memoryBoard = document.getElementById("memoryBoard");

const memoryMovesElement =
    document.getElementById("memoryMoves");

const memoryMatchesElement =
    document.getElementById("memoryMatches");

const memoryBestElement =
    document.getElementById("memoryBest");

const memoryRestart =
    document.getElementById("memoryRestart");

const memorySymbols = [
    "🌱",
    "🌱",
    "⭐",
    "⭐",
    "🎮",
    "🎮",
    "📚",
    "📚",
    "🚀",
    "🚀",
    "🎧",
    "🎧",
    "🌙",
    "🌙",
    "☕",
    "☕"
];

let memoryFirstCard = null;
let memorySecondCard = null;
let memoryLocked = false;
let memoryMoves = 0;
let memoryMatches = 0;

function shuffle(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];
    }

    return shuffled;
}


function startMemoryGame() {

    memoryBoard.innerHTML = "";

    memoryFirstCard = null;
    memorySecondCard = null;
    memoryLocked = false;

    memoryMoves = 0;
    memoryMatches = 0;

    memoryMovesElement.textContent = "0";
    memoryMatchesElement.textContent = "0";

    const cards = shuffle(memorySymbols);

    cards.forEach(symbol => {

        const card =
            document.createElement("button");

        card.className = "memory-card";

        card.dataset.symbol = symbol;

        card.textContent = "?";

        card.addEventListener(
            "click",
            () => flipMemoryCard(card)
        );

        memoryBoard.appendChild(card);

    });

}


function flipMemoryCard(card) {

    if (memoryLocked) return;

    if (card === memoryFirstCard) return;

    if (card.classList.contains("matched")) return;

    card.classList.add("flipped");

    card.textContent = card.dataset.symbol;

    if (!memoryFirstCard) {

        memoryFirstCard = card;

        return;
    }

    memorySecondCard = card;

    memoryMoves++;

    memoryMovesElement.textContent =
        memoryMoves;

    checkMemoryMatch();
}


function checkMemoryMatch() {

    const isMatch =
        memoryFirstCard.dataset.symbol ===
        memorySecondCard.dataset.symbol;

    if (isMatch) {

        memoryFirstCard.classList.add("matched");
        memorySecondCard.classList.add("matched");

        memoryMatches++;

        memoryMatchesElement.textContent =
            memoryMatches;

        resetMemoryTurn();

        if (memoryMatches === 8) {

            updateMemoryBest();

            setTimeout(() => {

                alert(
                    `🎉 Great job!\nYou completed the game in ${memoryMoves} moves!`
                );

            }, 300);

        }

    } else {

        memoryLocked = true;

        setTimeout(() => {

            memoryFirstCard.classList.remove("flipped");
            memorySecondCard.classList.remove("flipped");

            memoryFirstCard.textContent = "?";
            memorySecondCard.textContent = "?";

            resetMemoryTurn();

        }, 750);

    }

}


function resetMemoryTurn() {

    memoryFirstCard = null;
    memorySecondCard = null;
    memoryLocked = false;

}


function updateMemoryBest() {

    const oldBest =
        localStorage.getItem("memoryBest");

    if (!oldBest || memoryMoves < Number(oldBest)) {

        localStorage.setItem(
            "memoryBest",
            memoryMoves
        );

        memoryBestElement.textContent =
            memoryMoves;

    }

}


function loadMemoryBest() {

    const best =
        localStorage.getItem("memoryBest");

    memoryBestElement.textContent =
        best || "--";

}


memoryRestart.addEventListener(
    "click",
    startMemoryGame
);

loadMemoryBest();
startMemoryGame();


/* =========================================================
   NUMBER GUESS
   ========================================================= */

const guessInput =
    document.getElementById("guessInput");

const guessButton =
    document.getElementById("guessButton");

const guessMessage =
    document.getElementById("guessMessage");

const guessAttemptsElement =
    document.getElementById("guessAttempts");

const guessBestElement =
    document.getElementById("guessBest");

const guessRestart =
    document.getElementById("guessRestart");

let secretNumber;
let guessAttempts = 0;


function startGuessGame() {

    secretNumber =
        Math.floor(Math.random() * 100) + 1;

    guessAttempts = 0;

    guessAttemptsElement.textContent = "0";

    guessMessage.textContent =
        "Make your first guess!";

    guessInput.value = "";

    guessInput.focus();

}


function makeGuess() {

    const value =
        Number(guessInput.value);

    if (!value || value < 1 || value > 100) {

        guessMessage.textContent =
            "⚠️ Enter a number from 1 to 100.";

        return;
    }

    guessAttempts++;

    guessAttemptsElement.textContent =
        guessAttempts;

    if (value === secretNumber) {

        guessMessage.textContent =
            `🎉 Correct! You found it in ${guessAttempts} attempts!`;

        saveGuessBest();

    } else if (value < secretNumber) {

        guessMessage.textContent =
            "⬆️ Too low! Try a bigger number.";

    } else {

        guessMessage.textContent =
            "⬇️ Too high! Try a smaller number.";

    }

}


function saveGuessBest() {

    const oldBest =
        localStorage.getItem("guessBest");

    if (
        !oldBest ||
        guessAttempts < Number(oldBest)
    ) {

        localStorage.setItem(
            "guessBest",
            guessAttempts
        );

        guessBestElement.textContent =
            guessAttempts;

    }

}


function loadGuessBest() {

    const best =
        localStorage.getItem("guessBest");

    guessBestElement.textContent =
        best || "--";

}


guessButton.addEventListener(
    "click",
    makeGuess
);

guessInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            makeGuess();
        }

    }
);

guessRestart.addEventListener(
    "click",
    startGuessGame
);

loadGuessBest();
startGuessGame();


/* =========================================================
   TIC-TAC-TOE
   HARDER COMPUTER
   ========================================================= */

const ticCells =
    document.querySelectorAll(".tic-cell");

const ticStatus =
    document.getElementById("ticStatus");

const ticRestart =
    document.getElementById("ticRestart");

const playerScoreElement =
    document.getElementById("playerScore");

const computerScoreElement =
    document.getElementById("computerScore");

const drawScoreElement =
    document.getElementById("drawScore");

let ticBoard = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

let ticGameOver = false;

let playerScore = 0;
let computerScore = 0;
let drawScore = 0;

const winningPatterns = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


function startTicGame() {

    ticBoard = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    ticGameOver = false;

    ticCells.forEach(cell => {

        cell.textContent = "";

        cell.disabled = false;

    });

    ticStatus.textContent =
        "Your turn — you are X";

}


function checkWinner(board) {

    for (const pattern of winningPatterns) {

        const [a, b, c] = pattern;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            return board[a];

        }

    }

    if (board.every(cell => cell !== "")) {
        return "draw";
    }

    return null;

}


function playerMove(index) {

    if (ticGameOver) return;

    if (ticBoard[index] !== "") return;

    ticBoard[index] = "X";

    ticCells[index].textContent = "X";

    const result = checkWinner(ticBoard);

    if (result) {

        finishTicGame(result);

        return;
    }

    ticStatus.textContent =
        "Computer is thinking...";

    ticCells.forEach(cell => {
        cell.disabled = true;
    });

    setTimeout(() => {

        computerMove();

    }, 400);

}


function computerMove() {

    if (ticGameOver) return;

    const bestMove =
        findBestMove(ticBoard);

    if (bestMove !== -1) {

        ticBoard[bestMove] = "O";

        ticCells[bestMove].textContent = "O";

    }

    const result =
        checkWinner(ticBoard);

    if (result) {

        finishTicGame(result);

        return;
    }

    ticStatus.textContent =
        "Your turn — you are X";

    ticCells.forEach(cell => {

        if (!ticBoard[cell.dataset.index]) {
            cell.disabled = false;
        }

    });

}


/* Minimax makes the computer much harder to beat */

function findBestMove(board) {

    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {

            board[i] = "O";

            const score =
                minimax(board, false);

            board[i] = "";

            if (score > bestScore) {

                bestScore = score;
                move = i;

            }

        }

    }

    return move;

}


function minimax(board, isMaximizing) {

    const result =
        checkWinner(board);

    if (result === "O") return 10;

    if (result === "X") return -10;

    if (result === "draw") return 0;

    if (isMaximizing) {

        let bestScore = -Infinity;

        for (let i = 0; i < board.length; i++) {

            if (board[i] === "") {

                board[i] = "O";

                const score =
                    minimax(board, false);

                board[i] = "";

                bestScore =
                    Math.max(bestScore, score);

            }

        }

        return bestScore;

    } else {

        let bestScore = Infinity;

        for (let i = 0; i < board.length; i++) {

            if (board[i] === "") {

                board[i] = "X";

                const score =
                    minimax(board, true);

                board[i] = "";

                bestScore =
                    Math.min(bestScore, score);

            }

        }

        return bestScore;

    }

}


function finishTicGame(result) {

    ticGameOver = true;

    ticCells.forEach(cell => {
        cell.disabled = true;
    });

    if (result === "X") {

        playerScore++;

        playerScoreElement.textContent =
            playerScore;

        ticStatus.textContent =
            "🎉 You won! Nice move!";

    } else if (result === "O") {

        computerScore++;

        computerScoreElement.textContent =
            computerScore;

        ticStatus.textContent =
            "🤖 Computer wins! Try again!";

    } else {

        drawScore++;

        drawScoreElement.textContent =
            drawScore;

        ticStatus.textContent =
            "🤝 It's a draw!";

    }

}


ticCells.forEach(cell => {

    cell.addEventListener(
        "click",
        () => {

            playerMove(
                Number(cell.dataset.index)
            );

        }
    );

});


ticRestart.addEventListener(
    "click",
    startTicGame
);

startTicGame();


/* =========================================================
   CATCH THE STAR
   ========================================================= */

const starArena =
    document.getElementById("starArena");

const starStart =
    document.getElementById("starStart");

const startStarButton =
    document.getElementById("startStar");

const starScoreElement =
    document.getElementById("starScore");

const starTimeElement =
    document.getElementById("starTime");

const starBestElement =
    document.getElementById("starBest");

const starRestart =
    document.getElementById("starRestart");

let starScore = 0;
let starTime = 20;
let starTimer = null;
let starSpawner = null;
let starRunning = false;


function startStarGame() {

    clearInterval(starTimer);
    clearInterval(starSpawner);

    starScore = 0;
    starTime = 20;
    starRunning = true;

    starScoreElement.textContent = "0";
    starTimeElement.textContent = "20";

    starStart.style.display = "none";

    document
        .querySelectorAll(".falling-star")
        .forEach(star => star.remove());

    starTimer = setInterval(() => {

        starTime--;

        starTimeElement.textContent =
            starTime;

        if (starTime <= 0) {

            endStarGame();

        }

    }, 1000);

    starSpawner = setInterval(
        createFallingStar,
        600
    );

}


function createFallingStar() {

    if (!starRunning) return;

    const star =
        document.createElement("button");

    star.className = "falling-star";

    star.textContent = "⭐";

    const maxLeft =
        Math.max(
            10,
            starArena.clientWidth - 50
        );

    star.style.left =
        Math.random() * maxLeft + "px";

    star.style.top = "-50px";

    const duration =
        1.8 + Math.random() * 1.5;

    star.style.animationDuration =
        duration + "s";

    star.addEventListener(
        "click",
        () => {

            starScore++;

            starScoreElement.textContent =
                starScore;

            star.remove();

        }
    );

    star.addEventListener(
        "animationend",
        () => {
            star.remove();
        }
    );

    starArena.appendChild(star);

}


function endStarGame() {

    starRunning = false;

    clearInterval(starTimer);
    clearInterval(starSpawner);

    document
        .querySelectorAll(".falling-star")
        .forEach(star => star.remove());

    saveStarBest();

    starStart.style.display = "flex";

    starStart.innerHTML = `

        <span>🏆</span>

        <h3>
            Time's up!
        </h3>

        <p>
            Your score: <strong>${starScore}</strong>
        </p>

        <button
            class="primary-game-btn"
            id="startStarAgain">
            Play Again
        </button>

    `;

    document
        .getElementById("startStarAgain")
        .addEventListener(
            "click",
            startStarGame
        );

}


function saveStarBest() {

    const oldBest =
        Number(
            localStorage.getItem("starBest") || 0
        );

    if (starScore > oldBest) {

        localStorage.setItem(
            "starBest",
            starScore
        );

        starBestElement.textContent =
            starScore;

    }

}


function loadStarBest() {

    const best =
        localStorage.getItem("starBest") || 0;

    starBestElement.textContent =
        best;

}


startStarButton.addEventListener(
    "click",
    startStarGame
);

starRestart.addEventListener(
    "click",
    () => {

        clearInterval(starTimer);
        clearInterval(starSpawner);

        starRunning = false;

        document
            .querySelectorAll(".falling-star")
            .forEach(star => star.remove());

        starScore = 0;
        starTime = 20;

        starScoreElement.textContent = "0";
        starTimeElement.textContent = "20";

        starStart.style.display = "flex";

        starStart.innerHTML = `

            <span>⭐</span>

            <h3>
                Ready?
            </h3>

            <p>
                Click as many stars as you can in 20 seconds.
            </p>

            <button
                class="primary-game-btn"
                id="startStar">
                Start Game
            </button>

        `;

        document
            .getElementById("startStar")
            .addEventListener(
                "click",
                startStarGame
            );

    }
);

loadStarBest();