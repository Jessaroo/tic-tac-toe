let won = false;
let lost = false;
let currentPlayer = 'X';
let chosen = [];
let scoreboardX = document.getElementById('scoreboard-x');
let scoreboardO = document.getElementById('scoreboard-o');
let turns = document.getElementById('turn');
let turnCounter = 0;
scoreboardX.textContent = '0';
scoreboardO.textContent = '0';

const squares = document.querySelectorAll('.game-square');
const playAgainBtn = document.getElementById('button-play-again');
let squareStates = Array.from({length: 9}).fill('');
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', handleSquareClick);
}

playAgainBtn.addEventListener('click', resetGame);
console.log('Play again button clicked');
resetGame();

function handleSquareClick(event) {
    if (won || lost) {
        return;
    }
    const selectedSquare = event.target;
    if (selectedSquare.textContent !== '') {
        return;
    }
    selectedSquare.textContent = currentPlayer;
    chosen.push(parseInt(selectedSquare.id.split('-')[1]));

    if (checkForWinner() || checkForTie()) {
        endGame();
    } else {
        if (currentPlayer === 'X') {
            currentPlayer = 'O';
            updateTurnDisplay();
                computersTurn();
                turnCounter++;
        }
    }
}

function computersTurn() {
    const emptySquares = Array.from(squares).filter(square => square.textContent === '');
    if(emptySquares.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        const randomSquare = emptySquares[randomIndex];
        randomSquare.textContent = 'O';
        chosen.push(parseInt(randomSquare.id.split('-')[1]));
    }
    currentPlayer = 'X';
    updateTurnDisplay();
}

function updateTurnDisplay() {
    const turnsDisplay = document.getElementById('turn');
    if (currentPlayer === 'X') {
        turnsDisplay.textContent = 'Player X\'s turn';
    }else {
        turnsDisplay.textContent = 'Player O\'s turn';
    }
    turnsDisplay.textContent += `- Turn: ${turnCounter}`;
}

function checkForWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern =>
        pattern.every(cell => document.getElementById(`square-${cell}`).textContent === currentPlayer)  
    );
}

function checkForTie() {
    if (chosen.length === squares.length && !checkForWinner()) {
        return true;
    }
    return false;
}

function resetGame() {
    for (let index = 0; index < squares.length; index++) {
        squares[index].textContent = '';
    }
    chosen = [];
    currentPlayer = 'X';
    turnCounter = 0;
    updateTurnDisplay();
}

function endGame() {
    if (checkForWinner() && currentPlayer === 'X') {
        alert('You won!');
        scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1;
    } else if (checkForTie()) {
        alert('Tie!');
    } else {
        alert('Try again!');
        scoreboardO.textContent = parseInt(scoreboardO.textContent) + 1;
    }
    resetGame();
}