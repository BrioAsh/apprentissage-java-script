// Sélection des éléments du DOM
export const cells = document.querySelectorAll('.cell');
export const resetButton = document.getElementById('resetButton');
export const backToMainMenuBtn = document.getElementById('backToMainMenuBtn');

export const modeSelectionScreen = document.getElementById('mode-selection');
export const gameContainer = document.getElementById('game-container');
export const playerVsPlayerBtn = document.getElementById('playerVsPlayerBtn');
export const playerVsAIBtn = document.getElementById('playerVsAIBtn');

export const difficultySelectionScreen = document.getElementById('difficulty-selection');
export const easyAIBtn = document.getElementById('easyAIBtn');
export const mediumAIBtn = document.getElementById('mediumAIBtn');
export const hardAIBtn = document.getElementById('hardAIBtn');
export const backToModeSelectionBtn = document.getElementById('backToModeSelectionBtn');

// Gestionnaire de message d'état du jeu
let messageDisplay = document.getElementById('game-status');
// Si game-status n'existe pas (par exemple, si tu l'as oublié dans le HTML), on le crée
if (!messageDisplay) {
    messageDisplay = document.createElement('div');
    messageDisplay.id = 'game-status';
    // Assure-toi que gameContainer existe avant d'essayer d'y insérer
    if (gameContainer) {
        gameContainer.insertBefore(messageDisplay, gameContainer.firstChild); 
    }
}

// Fonction pour afficher un message à l'utilisateur
export function displayMessage(msg) {
    if (messageDisplay) { // Vérifie à nouveau si l'élément existe
        messageDisplay.textContent = msg;
    }
}

// Fonction pour mettre à jour l'affichage d'une cellule
export function updateCellDisplay(cellIndex, player) {
    cells[cellIndex].textContent = player;
    cells[cellIndex].classList.add(player.toLowerCase());
}

// Fonction pour effacer l'affichage des cellules
export function clearCellsDisplay() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

// Fonctions de gestion des écrans
export function showModeSelectionScreen() {
    modeSelectionScreen.classList.remove('hidden');
    difficultySelectionScreen.classList.add('hidden');
    gameContainer.classList.add('hidden');
    displayMessage("Choisissez votre mode de jeu");
}

export function showDifficultySelectionScreen() {
    modeSelectionScreen.classList.add('hidden');
    difficultySelectionScreen.classList.remove('hidden');
    gameContainer.classList.add('hidden');
    displayMessage("Choisissez la difficulté de l'IA");
}

export function showGameScreen() {
    modeSelectionScreen.classList.add('hidden');
    difficultySelectionScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
}