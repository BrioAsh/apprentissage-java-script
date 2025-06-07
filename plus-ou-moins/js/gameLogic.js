// js/gameLogic.js

import {
    displayMessage, updateAttemptsDisplay, clearGuessInput,
    toggleInputAndButton, toggleNewGameButton,
    displayPlayerSetupMessage // NOUVEAU : pour les messages de setup
} from './uiManager.js';
import { addHighScore } from './leaderboardManager.js'; // Garde cette importation

// Variables d'état du jeu
let secretNumber = 0;
let attemptsLeft = 0;
const MAX_ATTEMPTS = 10; // On peut définir le nombre de tentatives ici
const MIN_NUMBER = 1;
const MAX_NUMBER = 100;
let gameEnded = false; // Indique si la partie est terminée

// NOUVEAU : Variable pour stocker le pseudo du joueur actuel
export let currentPlayerName = '';

/**
 * Définit le pseudo du joueur actuel.
 * @param {string} name Le pseudo du joueur.
 */
export function setPlayerName(name) {
    currentPlayerName = name;
}

/**
 * Initialise une nouvelle partie.
 * Génère un nouveau nombre secret et réinitialise les tentatives.
 */
export function initGame() {
    secretNumber = generateRandomNumber(MIN_NUMBER, MAX_NUMBER);
    attemptsLeft = MAX_ATTEMPTS;
    gameEnded = false;

    // Mise à jour de l'UI au début de la partie
    displayMessage(`Je pense à un nombre entre ${MIN_NUMBER} et ${MAX_NUMBER}. Devine !`, 'info');
    updateAttemptsDisplay(attemptsLeft);
    clearGuessInput();
    toggleInputAndButton(true); // Active l'input et le bouton
    toggleNewGameButton(false); // Cache le bouton "Nouvelle partie"
}

/**
 * Génère un nombre entier aléatoire entre min et max (inclus).
 * @param {number} min Le nombre minimum.
 * @param {number} max Le nombre maximum.
 * @returns {number} Le nombre aléatoire généré.
 */
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Gère la proposition du joueur.
 * @param {number} guess La proposition du joueur.
 */
export function handleGuess(guess) {
    if (gameEnded) {
        displayMessage("La partie est terminée. Lancez une nouvelle partie !", 'info');
        return;
    }

    if (guess < MIN_NUMBER || guess > MAX_NUMBER) {
        displayMessage(`Veuillez entrer un nombre entre ${MIN_NUMBER} et ${MAX_NUMBER}.`, 'incorrect');
        return;
    }

    attemptsLeft--;
    updateAttemptsDisplay(attemptsLeft);
    clearGuessInput(); // Vide l'input après chaque tentative

    if (guess === secretNumber) {
        const attemptsUsed = MAX_ATTEMPTS - attemptsLeft;
        displayMessage(`BRAVO ! Vous avez trouvé le nombre ${secretNumber} en ${attemptsUsed} tentatives !`, 'correct');
        endGame(true, attemptsUsed);
    } else if (attemptsLeft === 0) {
        displayMessage(`Désolé, vous n'avez plus de tentatives. Le nombre était ${secretNumber}.`, 'incorrect');
        endGame(false);
    } else if (guess < secretNumber) {
        // Si la proposition est plus petite que le secret, il faut dire "C'est plus !"
        displayMessage('C\'est plus !', 'info'); 
    } else { // guess > secretNumber
        // Si la proposition est plus grande que le secret, il faut dire "C'est moins !"
        displayMessage('C\'est moins !', 'info');
    }
}

/**
 * Termine la partie.
 * @param {boolean} won Indique si le joueur a gagné ou perdu.
 * @param {number} finalAttempts Le nombre de tentatives utilisées pour gagner.
 */
function endGame(won, finalAttempts = null) {
    gameEnded = true;
    toggleInputAndButton(false); // Désactive l'input et le bouton "Deviner"
    toggleNewGameButton(true); // Affiche le bouton "Nouvelle partie"

    // Gérer l'ajout au leaderboard si le joueur a gagné
    if (won) {
        // NOUVEAU : Ajoute directement le score avec le pseudo enregistré
        addHighScore(currentPlayerName, finalAttempts);
        // Pas besoin de togglePlayerNameInputVisibility ici, car le nom est déjà saisi
    }
    // Si le joueur a perdu, on reste sur l'écran de jeu avec le message de défaite
}

// Exporte les constantes pour qu'elles soient accessibles dans main.js si besoin
export { MIN_NUMBER, MAX_NUMBER, MAX_ATTEMPTS };