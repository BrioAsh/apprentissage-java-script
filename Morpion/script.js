// 1.

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');

// 1. New

const messageDisplay = document.createElement('div');
messageDisplay.id = 'game-status';
document.body.insertBefore(messageDisplay, resetButton);

// 2.

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// 2.a New

const winningConditions = [
    [0, 1, 2], // Lignes
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Colonnes
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], // Diagonales
    [2, 4, 6],
];

// 2.b New

function displayMessage(msg) {
    messageDisplay.textContent = msg;
}

// 3.a New

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];

        let pos1 = board[winCondition[0]];
        let pos2 = board[winCondition[1]];
        let pos3 = board[winCondition[2]];

        if (pos1 === '' || pos2 === '' || pos3 === '') {
            continue;
        }

        if (pos1 === pos2 && pos2 === pos3) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        displayMessage(`Le joueur ${currentPlayer} a gagné !`);
        gameActive = false;
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        displayMessage('Match Nul !');
        gameActive = false;
        return;
    }
}

// 3.b

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        displayMessage(`C'est au tour du joueur ${currentPlayer}`);
    }
}

// Fonction pour réinitialiser le jeu
function handleResetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

// 4.

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', handleResetGame);

displayMessage(`C'est au tour du joueur ${currentPlayer}`);