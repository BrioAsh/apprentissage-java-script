// js/main.js

import {
    guessInput, submitGuessBtn, newGameBtn,
    displayMessage, updateAttemptsDisplay, clearGuessInput, toggleInputAndButton, toggleNewGameButton,
    // NOUVEAU : Imports pour l'écran de setup et les gestionnaires de visibilité
    playerSetupSection, initialPlayerNameInput, startGameFromSetupBtn, playerSetupMessage,
    showLeaderboardFromSetupBtn, // Bouton voir classement depuis setup
    mainGameSection, leaderboardSection,
    togglePlayerSetupVisibility, toggleGameVisibility, toggleLeaderboardVisibility,
    showLeaderboardBtn, closeLeaderboardBtn // Le bouton flottant et le bouton de fermeture du leaderboard
} from './uiManager.js';

import {
    initGame, handleGuess,
    MIN_NUMBER, MAX_NUMBER,
    currentPlayerName, setPlayerName // NOUVEAU : pour gérer le pseudo du joueur
} from './gameLogic.js';

import { displayLeaderboard, showLeaderboard, hideLeaderboard } from './leaderboardManager.js';

// Constante pour la clé de localStorage du pseudo
const PLAYER_NAME_STORAGE_KEY = 'guessTheNumberPlayerName';

/**
 * Fonction principale d'initialisation du jeu.
 * Gère l'affichage initial en fonction de si un pseudo est déjà enregistré.
 */
function init() {
    // Vérifier si un pseudo est déjà enregistré
    const storedPlayerName = localStorage.getItem(PLAYER_NAME_STORAGE_KEY);

    if (storedPlayerName) {
        setPlayerName(storedPlayerName);
        togglePlayerSetupVisibility(false);
        toggleGameVisibility(true);
        initGame(); // Initialise le jeu
        displayMessage(`Bienvenue de retour, ${storedPlayerName} ! Devinez le nombre.`);
        showLeaderboardBtn.classList.remove('hidden'); // Assurez-vous qu'il est visible ici
    } else {
        togglePlayerSetupVisibility(true);
        toggleGameVisibility(false);
        toggleLeaderboardVisibility(false);
        // Le bouton flottant ne doit pas être visible sur l'écran de setup
        showLeaderboardBtn.classList.add('hidden');
    }


    displayLeaderboard();
    // =========================================================
    // Écouteurs d'événements
    // =========================================================

    // NOUVEAU : Écouteur pour le bouton "Commencer le jeu" sur l'écran de setup
    startGameFromSetupBtn.addEventListener('click', handlePlayerSetup);
    // Permet aussi de valider le pseudo avec "Entrée"
    initialPlayerNameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handlePlayerSetup();
        }
    });

    // Écouteur d'événement pour le bouton "Deviner"
    submitGuessBtn.addEventListener('click', () => {
        const guess = parseInt(guessInput.value);

        if (isNaN(guess)) {
            displayMessage('Veuillez entrer un nombre valide !', 'incorrect');
            clearGuessInput();
            return;
        }

        handleGuess(guess);
    });

    // Écouteur d'événement pour la touche "Entrée" dans le champ de saisie du jeu
    guessInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            submitGuessBtn.click();
        }
    });

    // Écouteur d'événement pour le bouton "Nouvelle partie"
    newGameBtn.addEventListener('click', () => {
        initGame(); // Réinitialise et démarre une nouvelle partie
        toggleGameVisibility(true);
        togglePlayerNameInputVisibility(false);
        toggleLeaderboardVisibility(false);
        // Assurez-vous que le bouton flottant est visible quand on commence une nouvelle partie
        showLeaderboardBtn.classList.remove('hidden'); 
    });

        showLeaderboardBtn.addEventListener('click', () => {
        showLeaderboard(); // Utilise la fonction centralisée de leaderboardManager
    });

    // Écouteur d'événement pour le bouton "Fermer" du leaderboard
    closeLeaderboardBtn.addEventListener('click', () => {
        hideLeaderboard(); // Utilise la fonction centralisée de leaderboardManager
        // La logique pour savoir où revenir est maintenant dans hideLeaderboard
        // On s'assure juste que le bouton flottant est visible si on retourne au jeu
        if (mainGameSection.classList.contains('hidden') === false) { // Si l'écran de jeu est visible
            showLeaderboardBtn.classList.remove('hidden');
        }
    });
}

/**
 * Gère la soumission du pseudo au démarrage du jeu.
 */
function handlePlayerSetup() {
    const playerName = initialPlayerNameInput.value.trim();

    if (playerName.length < 2) {
        displayPlayerSetupMessage('Votre pseudo doit contenir au moins 2 caractères.', 'incorrect');
        return;
    }
    if (playerName.length > 10) {
        displayPlayerSetupMessage('Votre pseudo ne doit pas dépasser 10 caractères.', 'incorrect');
        return;
    }

    // Enregistrer le pseudo dans localStorage
    localStorage.setItem(PLAYER_NAME_STORAGE_KEY, playerName);
    setPlayerName(playerName); // Définit le pseudo dans gameLogic

    // Passer à l'écran de jeu et démarrer une partie
    togglePlayerSetupVisibility(false);
    toggleGameVisibility(true);
    initGame();
    displayMessage(`Bienvenue, ${playerName} ! Devinez le nombre.`);
    // Affiche le bouton flottant une fois le jeu commencé
    showLeaderboardBtn.classList.remove('hidden');
}


// Lance la fonction d'initialisation lorsque le DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', init);