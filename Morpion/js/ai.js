import { PLAYER_O, PLAYER_X, WINNING_CONDITIONS } from './constants.js';

// Fonction principale de L'IA
export function makeAIMove(board, aiDifficulty) {
    let move = -1; // L'index de la case que l'IA va jouer

    // Logique de l'IA en fonction de la difficulté
    if (aiDifficulty === 'easy') {
        move = getRandomEmptyCell(board);
    } else if (aiDifficulty === 'medium') {
        move = getMediumAIMove(board);
    } else if (aiDifficulty === 'hard') {
        move = getHardAIMove(board);
    }
    return move; // Retourne l'index de la case choisie par l'IA
}

// Logique de l'IA Facile (aléatoire)
function getRandomEmptyCell(board) {
    const emptyCells = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            emptyCells.push(i);
        }
    }
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }
    return -1; // Aucune case vide
}

// Logique de l'IA Moyenne
function getMediumAIMove(board) {
    // 1. Essayer de gagner
    let move = findWinningMove(board, PLAYER_O);
    if (move !== -1) return move;

    // 2. Bloquer l'adversaire s'il peut gagner
    move = findWinningMove(board, PLAYER_X);
    if (move !== -1) return move;

    // 3. Jouer le centre si disponible
    if (board[4] === '') return 4;

    // 4. Jouer un coin si disponible
    const corners = [0, 2, 6, 8];
    for (const index of corners) {
        if (board[index] === '') return index;
    }

    // 5. Jouer une case vide aléatoire (Fallback)
    return getRandomEmptyCell(board);
}

// Aide pour Medium AI : Trouver un coup gagnant/bloquant
function findWinningMove(board, player) {
    for (let i = 0; i < WINNING_CONDITIONS.length; i++) {
        const [a, b, c] = WINNING_CONDITIONS[i];
        const currentBoard = [...board]; // Crée une copie du tableau
        
        // Essayer de jouer dans chaque case vide de cette condition
        for (const index of [a, b, c]) {
            if (currentBoard[index] === '') {
                currentBoard[index] = player; // Simule le coup
                if (checkWin(currentBoard, player)) {
                    return index; // Si ce coup mène à une victoire, retourne l'index
                }
                currentBoard[index] = ''; // Annule le coup simulé
            }
        }
    }
    return -1; // Aucun coup gagnant trouvé
}

// Fonction utilitaire pour vérifier si un joueur gagne sur un plateau donné
function checkWin(currentBoard, player) {
    for (let i = 0; i < WINNING_CONDITIONS.length; i++) {
        const [a, b, c] = WINNING_CONDITIONS[i];
        if (currentBoard[a] === player && currentBoard[b] === player && currentBoard[c] === player) {
            return true;
        }
    }
    return false;
}

// Logique de l'IA Difficile (Minimax)
function getHardAIMove(board) {
    const bestMove = minimax(board, PLAYER_O).index;
    return bestMove;
}

// Algorithme Minimax
function minimax(newBoard, player) {
    const availableSpots = [];
    for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === '') {
            availableSpots.push(i);
        }
    }

    // Vérifier les conditions de fin de jeu
    if (checkWin(newBoard, PLAYER_X)) {
        return { score: -10 }; // X gagne (IA perd)
    } else if (checkWin(newBoard, PLAYER_O)) {
        return { score: 10 }; // O gagne (IA gagne)
    } else if (availableSpots.length === 0) {
        return { score: 0 }; // Match nul
    }

    const moves = [];
    for (let i = 0; i < availableSpots.length; i++) {
        const move = {};
        move.index = availableSpots[i];
        newBoard[availableSpots[i]] = player;

        if (player === PLAYER_O) {
            const result = minimax(newBoard, PLAYER_X);
            move.score = result.score;
        } else {
            const result = minimax(newBoard, PLAYER_O);
            move.score = result.score;
        }

        newBoard[availableSpots[i]] = ''; // Réinitialise la case
        moves.push(move);
    }

    let bestMove;
    if (player === PLAYER_O) { // Maximiser le score de l'IA (O)
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    } else { // Minimiser le score de l'adversaire (X)
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i];
            }
        }
    }
    return bestMove;
}