//variables
let won;
let lost;
let currentPlayer = 'X';
let scoreboardX = document.getElementById('scoreboard-x');
let scoreboardO = document.getElementById('scoreboard-o');
let turns = document.getElementById('turn');

//const elements
const squares = document.querySelectorAll('.game-square');
const playAgainBtn = document.getElementById('button-play-again');

//event listeners
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', handleSquareClick);
}
playAgainBtn.addEventListener('click', resetGame);

resetGame();

function handleSquareClick(event) {
    const selectedSquare = event.target;
    if (selectedSquare.textContent !== ''){
        return;
    }
    selectedSquare.textContent = currentPlayer;

    if(checkForWinner() || checkForTie()) {
        endGame();
    }else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurnDisplay();
    }
}

function checkForWinner() {
    if (diagonalWin || verticalWin || horizontalWin) {
        return true;
    }
    return false;
}

function checkForTie() {
    if (chosen.length >= 4 && !checkForWinner()) {
        console.log("Tie!")
    }
}