// js/uiManager.js

// Sélection des éléments du DOM
export const minNumberSpan = document.getElementById('minNumber');
export const maxNumberSpan = document.getElementById('maxNumber');
export const guessInput = document.getElementById('guessInput');
export const submitGuessBtn = document.getElementById('submitGuessBtn');
export const messageDisplay = document.getElementById('message');
export const attemptsDisplay = document.getElementById('attempts');
export const newGameBtn = document.getElementById('newGameBtn');

// NOUVEAU : Éléments pour l'écran de saisie du pseudo au démarrage
export const playerSetupSection = document.getElementById('player-setup-section');
export const initialPlayerNameInput = document.getElementById('initialPlayerNameInput');
export const startGameFromSetupBtn = document.getElementById('startGameFromSetupBtn');
export const playerSetupMessage = document.getElementById('playerSetupMessage');
export const showLeaderboardFromSetupBtn = document.getElementById('showLeaderboardFromSetupBtn'); // Bouton voir leaderboard depuis l'écran de setup

// MODIFIÉ : Sélection du conteneur principal du jeu (anciennement .game-container)
export const mainGameSection = document.getElementById('main-game-section');

// Éléments du leaderboard (pas de changement majeur ici, sauf la gestion de leur visibilité)
export const leaderboardSection = document.getElementById('leaderboard-section');
export const highScoresList = document.getElementById('highScoresList');
export const closeLeaderboardBtn = document.getElementById('closeLeaderboardBtn');

// Le bouton flottant qui doit être masqué/affiché dynamiquement
export const showLeaderboardBtn = document.getElementById('showLeaderboardBtn');

// =========================================================
// Fonctions de gestion des messages et de l'état de l'UI
// =========================================================

/**
 * Affiche un message à l'utilisateur.
 * @param {string} msg Le message à afficher.
 * @param {string} type Le type de message ('info', 'correct', 'incorrect').
 */
export function displayMessage(msg, type = 'info') {
    messageDisplay.textContent = msg;
    messageDisplay.classList.remove('info', 'correct', 'incorrect');
    messageDisplay.classList.add(type);
}

// NOUVEAU : Message spécifique pour l'écran de setup
export function displayPlayerSetupMessage(msg, type = 'info') {
    playerSetupMessage.textContent = msg;
    playerSetupMessage.classList.remove('info', 'correct', 'incorrect');
    playerSetupMessage.classList.add(type);
}

/**
 * Met à jour l'affichage du nombre de tentatives restantes.
 * @param {number} attempts Le nombre de tentatives restantes.
 */
export function updateAttemptsDisplay(attempts) {
    attemptsDisplay.textContent = `Tentatives restantes : ${attempts}`;
}

/**
 * Vide le champ de saisie de la proposition.
 */
export function clearGuessInput() {
    guessInput.value = '';
}

/**
 * Active ou désactive le champ de saisie et le bouton de soumission.
 * @param {boolean} enable Si true, active les éléments; si false, les désactive.
 */
export function toggleInputAndButton(enable) {
    guessInput.disabled = !enable;
    submitGuessBtn.disabled = !enable;
    if (enable) {
        guessInput.focus();
    }
}

/**
 * Affiche ou masque le bouton "Nouvelle partie".
 * @param {boolean} show Si true, affiche le bouton; si false, le masque.
 */
export function toggleNewGameButton(show) {
    if (show) {
        newGameBtn.classList.remove('hidden');
    } else {
        newGameBtn.classList.add('hidden');
    }
}

/**
 * Gère la visibilité d'un élément du DOM en ajoutant/retirant la classe 'hidden'.
 * @param {HTMLElement} element L'élément DOM à gérer.
 * @param {boolean} show Si true, affiche l'élément; si false, le masque.
 */
function toggleVisibility(element, show) {
    if (show) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
}

// =========================================================
// Fonctions de gestion de la visibilité des sections (écrans)
// =========================================================

/**
 * Affiche ou masque l'écran de saisie du pseudo initial.
 * @param {boolean} show Si true, affiche l'écran; si false, le masque.
 */
export function togglePlayerSetupVisibility(show) {
    toggleVisibility(playerSetupSection, show);
    // Le bouton flottant ne devrait pas apparaître sur cet écran
    toggleVisibility(showLeaderboardBtn, false);
}

/**
 * Affiche ou masque la section principale du jeu.
 * @param {boolean} show Si true, affiche la section; si false, la masque.
 */
export function toggleGameVisibility(show) {
    toggleVisibility(mainGameSection, show);
    // Le bouton flottant devrait apparaître si le jeu est visible et le leaderboard non
    toggleVisibility(showLeaderboardBtn, show && 
        leaderboardSection.classList.contains('hidden') &&
        playerNameInputSection.classList.contains('hidden'));
}

/**
 * Affiche ou masque la section du leaderboard.
 * @param {boolean} show Si true, affiche la section; si false, la masque.
 */
export function toggleLeaderboardVisibility(show) {
    toggleVisibility(leaderboardSection, show);
    // Le bouton flottant doit être masqué quand le leaderboard est affiché
    toggleVisibility(showLeaderboardBtn, !show);
}