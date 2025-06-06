import { WINNING_CONDITIONS, PLAYER_X, PLAYER_O } from './constants.js';
import { displayMessage, updateCellDisplay, clearCellsDisplay, cells } from './uiManager.js';
import { makeAIMove } from './ai.js';

export let currentPlayer = PLAYER_X; // Exporter ces variables
export let board = ['', '', '', '', '', '', '', '', '']; // Exporter le board
export let gameActive = true; // Exporter gameActive
export let gameMode = null; // Exporter gameMode
export let aiDifficulty = null; // Exporter aiDifficulty

export function setCurrentPlayer(player) {
    currentPlayer = player;
}

export function setBoard(newBoard) {
    board = newBoard;
}

export function setGameActive(active) {
    gameActive = active;
}

export function setGameModeValue(mode) { // Renommer pour éviter conflit
    gameMode = mode;
}

export function setAiDifficultyValue(difficulty) { // Renommer pour éviter conflit
    aiDifficulty = difficulty;
}


export function initGame() {
    currentPlayer = PLAYER_X;
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    clearCellsDisplay();
    displayMessage(`C'est au tour du joueur ${currentPlayer}`);
}

export function handleCellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    updateCellDisplay(clickedCellIndex, currentPlayer);
}

export function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < WINNING_CONDITIONS.length; i++) {
        const winCondition = WINNING_CONDITIONS[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        displayMessage(`Le joueur ${currentPlayer} a gagné !`);
        gameActive = false;
        return true;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        displayMessage(`Match nul !`);
        gameActive = false;
        return true;
    }
    return false;
}

export function changePlayer() {
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    if (gameActive) {
        displayMessage(`C'est au tour du joueur ${currentPlayer}`);
    }
    
    if (gameMode === 'playerVsAI' && currentPlayer === PLAYER_O && gameActive) {
        setTimeout(() => {
            const aiMoveIndex = makeAIMove(board, aiDifficulty); // Ici, makeAIMove a bien accès au board
            if (aiMoveIndex !== -1) {
                cells[aiMoveIndex].click();
            }
        }, 500);
    }
}