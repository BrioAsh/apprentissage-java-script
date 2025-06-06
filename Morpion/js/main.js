import {
    cells, resetButton, backToMainMenuBtn,
    playerVsPlayerBtn, playerVsAIBtn,
    easyAIBtn, mediumAIBtn, hardAIBtn, backToModeSelectionBtn,
    showModeSelectionScreen, showDifficultySelectionScreen, showGameScreen,
    displayMessage, updateCellDisplay
} from './uiManager.js';

import {
    currentPlayer, board, gameActive, gameMode, aiDifficulty, // Importer les variables exportées
    initGame, handleCellPlayed, checkWinner, changePlayer,
    setCurrentPlayer, setBoard, setGameActive, setGameModeValue, setAiDifficultyValue // Importer les setters
} from './gameLogic.js';

import { makeAIMove } from './ai.js'; // Importer makeAIMove directement ici pour le reset

import { PLAYER_O } from './constants.js'; // Importer PLAYER_O

// 1. Fonction d'initialisation principale
function init() {
showModeSelectionScreen();

// 2. Gestion des clics sur les cellules
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        // Utiliser les variables exportées directement
        if (!gameActive || board[index] !== '') { 
            return;
        }

        handleCellPlayed(cell, index);
        
        if (!checkWinner()) {
            changePlayer();
        }
    });
});

// 3. Gestion des boutons de sélection de mode
playerVsPlayerBtn.addEventListener('click', () => {
    setGameModeValue('playerVsPlayer'); // Utiliser la fonction setter
    showGameScreen();
    initGame();
});

playerVsAIBtn.addEventListener('click', () => {
    setGameModeValue('playerVsAI'); // Utiliser la fonction setter
    showDifficultySelectionScreen();
});

// 4. Gestion des boutons de sélection de difficulté de l'IA
easyAIBtn.addEventListener('click', () => {
    setAiDifficultyValue('easy'); // Utiliser la fonction setter
    showGameScreen();
    initGame();
});

mediumAIBtn.addEventListener('click', () => {
    setAiDifficultyValue('medium'); // Utiliser la fonction setter
    showGameScreen();
    initGame();
});

hardAIBtn.addEventListener('click', () => {
    setAiDifficultyValue('hard'); // Utiliser la fonction setter
    showGameScreen();
    initGame();
});

// 5. Bouton "Retour" pour la sélection de difficulté
backToModeSelectionBtn.addEventListener('click', () => {
    showModeSelectionScreen();
});

// 6. Bouton de réinitialisation du jeu
resetButton.addEventListener('click', () => {
    initGame(); // Réinitialise le jeu (pour la partie en cours)
    // Si on est en mode IA et que c'est le tour de l'IA, déclencher son coup
    // Accéder directement aux variables exportées de gameLogic
    if (gameMode === 'playerVsAI' && currentPlayer === PLAYER_O && gameActive) {
         setTimeout(() => {
            const aiMoveIndex = makeAIMove(board, aiDifficulty); // Utilise makeAIMove et les variables exportées
            if (aiMoveIndex !== -1) {
                cells[aiMoveIndex].click();
            }
        }, 500);
    }
});

// Écouteur d'événement pour le bouton "Retour au menu"
backToMainMenuBtn.addEventListener('click', () => {
    showModeSelectionScreen(); // Affiche l'écran de sélection de mode
    initGame(); // Réinitialise l'état du jeu pour une nouvelle partie potentielle
});


}

document.addEventListener('DOMContentLoaded', init);