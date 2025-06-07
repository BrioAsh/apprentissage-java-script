// js/leaderboardManager.js

import {
    highScoresList, leaderboardSection,
    toggleLeaderboardVisibility, toggleGameVisibility,
    showLeaderboardBtn, mainGameSection, // Ajout de mainGameSection pour vérifier sa visibilité
    togglePlayerSetupVisibility // NOUVEAU : pour retourner à l'écran de setup
} from './uiManager.js';

// Constante pour la clé de localStorage
const LOCAL_STORAGE_KEY = 'guessTheNumberHighScores';
const MAX_HIGH_SCORES = 5; // Nombre maximum de scores à afficher dans le leaderboard

/**
 * Charge les meilleurs scores depuis le localStorage.
 * @returns {Array<Object>} Un tableau d'objets représentant les scores.
 */
function loadHighScores() {
    const scores = localStorage.getItem(LOCAL_STORAGE_KEY);
    return scores ? JSON.parse(scores) : [];
}

/**
 * Sauvegarde les meilleurs scores dans le localStorage.
 * @param {Array<Object>} scores Le tableau de scores à sauvegarder.
 */
function saveHighScores(scores) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(scores));
}

/**
 * Ajoute ou met à jour un score pour un joueur donné.
 * Si le joueur existe déjà, son score est mis à jour s'il est meilleur (moins de tentatives).
 * @param {string} playerName Le nom du joueur.
 * @param {number} attempts Le nombre de tentatives du joueur.
 */
export function addHighScore(playerName, attempts) {
    let highScores = loadHighScores();
    const existingPlayerIndex = highScores.findIndex(score => score.name.toLowerCase() === playerName.toLowerCase());

    if (existingPlayerIndex !== -1) {
        // Si le joueur existe, met à jour son score s'il est meilleur
        if (attempts < highScores[existingPlayerIndex].attempts) {
            highScores[existingPlayerIndex].attempts = attempts;
            console.log(`Score de ${playerName} mis à jour : ${attempts} tentatives.`);
        } else {
            console.log(`Score de ${playerName} (${attempts} tentatives) n'est pas meilleur que le score existant (${highScores[existingPlayerIndex].attempts} tentatives).`);
            return; // Ne fait rien si le nouveau score n'est pas meilleur
        }
    } else {
        // Si le joueur n'existe pas, l'ajoute
        highScores.push({ name: playerName, attempts: attempts });
        console.log(`Nouveau score pour ${playerName} : ${attempts} tentatives.`);
    }

    // Trie les scores par nombre de tentatives (le moins est le meilleur)
    highScores.sort((a, b) => a.attempts - b.attempts);

    // Ne garde que le nombre maximum de scores définis
    highScores = highScores.slice(0, MAX_HIGH_SCORES);

    saveHighScores(highScores);
    displayLeaderboard(); // Met à jour l'affichage après ajout/mise à jour
}

/**
 * Affiche les meilleurs scores dans la liste du leaderboard.
 */
export function displayLeaderboard() {
    const highScores = loadHighScores();
    highScoresList.innerHTML = ''; // Vide la liste actuelle

    if (highScores.length === 0) {
        highScoresList.innerHTML = '<li>Pas encore de scores. Soyez le premier !</li>';
        return;
    }

    highScores.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${index + 1}. ${score.name}</span><span>${score.attempts} tentatives</span>`;
        highScoresList.appendChild(listItem);
    });
}

/**
 * Gère l'affichage du leaderboard à partir de n'importe quel écran.
 */
export function showLeaderboard() {
    // Masque toutes les sections possibles
    toggleGameVisibility(false);
    togglePlayerSetupVisibility(false); // NOUVEAU : Masque aussi l'écran de setup

    // Affiche le leaderboard
    toggleLeaderboardVisibility(true);
    displayLeaderboard();
}

/**
 * Gère le retour de l'écran du leaderboard.
 * Retourne à l'écran de jeu si un pseudo est défini, sinon retourne à l'écran de setup.
 */
export function hideLeaderboard() {
    toggleLeaderboardVisibility(false);
    // On doit décider où revenir : au jeu si le pseudo est déjà là, sinon au setup.
    // Cette logique sera mieux gérée dans main.js en fonction de l'état du jeu.
    // Pour l'instant, on laisse toggleGameVisibility(true); ici et on ajustera dans main.js
    // ou on passera le nom du joueur ici pour décider.
    // Pour l'instant, on va simplement basculer vers le jeu comme avant.
    // La logique de revenir à player setup si pas de nom sera dans main.js.
}