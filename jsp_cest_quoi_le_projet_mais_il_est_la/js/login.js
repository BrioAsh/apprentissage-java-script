// js/login.js

// Sélection des éléments HTML
const authContainer = document.getElementById('auth-container');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toggleSignupButton = document.getElementById('toggle-signup');
const toggleLoginButton = document.getElementById('toggle-login');

let isLoginMode = true;

// Fonction pour ajuster la hauteur du conteneur en fonction du formulaire visible
function adjustContainerHeight() {
    let targetHeight;
    // Vérifie quel formulaire est actuellement censé être visible
    if (isLoginMode) {
        targetHeight = loginForm.offsetHeight;
    } else {
        targetHeight = signupForm.offsetHeight;
    }

    // Le padding de 40px est sur .form-face, donc la hauteur de authContainer doit inclure ce padding
    authContainer.style.height = `${targetHeight + 80}px`; 
}

// --- Fonctions de validation ---

/**
 * Affiche un message d'erreur pour un champ donné.
 * @param {HTMLElement} inputElement - L'élément input HTML.
 * @param {string} message - Le message d'erreur à afficher.
 */
function displayError(inputElement, message) {
    const errorElement = document.getElementById(inputElement.id + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        inputElement.classList.add('invalid'); // Ajoute la classe pour la bordure rouge
    }
}

/**
 * Cache le message d'erreur pour un champ donné.
 * @param {HTMLElement} inputElement - L'élément input HTML.
 */
function hideError(inputElement) {
    const errorElement = document.getElementById(inputElement.id + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        inputElement.classList.remove('invalid'); // Retire la classe invalide
    }
}

/**
 * Valide un champ générique (non vide).
 * @param {HTMLElement} inputElement - L'élément input HTML.
 * @param {string} errorMessage - Le message d'erreur si le champ est vide.
 * @returns {boolean} True si valide, False sinon.
 */
function validateRequired(inputElement, errorMessage) {
    if (inputElement.value.trim() === '') {
        displayError(inputElement, errorMessage);
        return false;
    }
    hideError(inputElement);
    return true;
}

/**
 * Valide le format d'une adresse email.
 * @param {HTMLElement} inputElement - L'élément input HTML.
 * @returns {boolean} True si valide, False sinon.
 */
function validateEmail(inputElement) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validateRequired(inputElement, 'L\'email est requis.')) {
        return false;
    }
    if (!emailRegex.test(inputElement.value.trim())) {
        displayError(inputElement, 'Veuillez entrer une adresse email valide.');
        return false;
    }
    hideError(inputElement);
    return true;
}

/**
 * Valide la longueur minimale du mot de passe.
 * @param {HTMLElement} inputElement - L'élément input HTML.
 * @param {number} minLength - Longueur minimale requise.
 * @returns {boolean} True si valide, False sinon.
 */
function validatePassword(inputElement, minLength = 6) {
    if (!validateRequired(inputElement, 'Le mot de passe est requis.')) {
        return false;
    }
    if (inputElement.value.length < minLength) {
        displayError(inputElement, `Le mot de passe doit contenir au moins ${minLength} caractères.`);
        return false;
    }
    hideError(inputElement);
    return true;
}

/**
 * Valide que deux mots de passe correspondent.
 * @param {HTMLElement} passwordElement - L'élément du premier mot de passe.
 * @param {HTMLElement} confirmPasswordElement - L'élément de la confirmation du mot de passe.
 * @returns {boolean} True si correspondent, False sinon.
 */
function validateConfirmPassword(passwordElement, confirmPasswordElement) {
    if (!validateRequired(confirmPasswordElement, 'Veuillez confirmer votre mot de passe.')) {
        return false;
    }
    if (passwordElement.value !== confirmPasswordElement.value) {
        displayError(confirmPasswordElement, 'Les mots de passe ne correspondent pas.');
        return false;
    }
    hideError(confirmPasswordElement);
    return true;
}


// --- Écouteurs d'événements et logiques de soumission ---

window.addEventListener('load', () => {
    adjustContainerHeight();
    // Centrer le conteneur sur la page après que sa hauteur soit ajustée
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.minHeight = '100vh';
});
window.addEventListener('resize', adjustContainerHeight);

toggleSignupButton.addEventListener('click', (event) => {
    event.preventDefault();
    authContainer.classList.add('is-flipped');
    isLoginMode = false;
    setTimeout(adjustContainerHeight, 500); 
    // Optionnel: masquer les erreurs du formulaire de connexion lors du switch
    hideError(document.getElementById('login-email'));
    hideError(document.getElementById('login-password'));
});

toggleLoginButton.addEventListener('click', (event) => {
    event.preventDefault();
    authContainer.classList.remove('is-flipped');
    isLoginMode = true;
    setTimeout(adjustContainerHeight, 500); 
    // Optionnel: masquer les erreurs du formulaire d'inscription lors du switch
    hideError(document.getElementById('signup-email'));
    hideError(document.getElementById('signup-username'));
    hideError(document.getElementById('signup-password'));
    hideError(document.getElementById('signup-confirm-password'));
});

// Gérer la soumission du formulaire de CONNEXION
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');

    // Exécuter les validations
    const isEmailValid = validateEmail(emailInput);
    const isPasswordValid = validatePassword(passwordInput);

    // Si tout est valide, on peut "soumettre" (simuler)
    if (isEmailValid && isPasswordValid) {
        alert('Connexion réussie ! (Simulée)');
        // Ici, tu pourrais rediriger l'utilisateur ou le connecter
        // window.location.href = 'dashboard.html'; // Exemple de redirection
    } else {
        alert('Veuillez corriger les erreurs dans le formulaire de connexion.');
    }
});

// Gérer la soumission du formulaire d'INSCRIPTION
signupForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const emailInput = document.getElementById('signup-email');
    const usernameInput = document.getElementById('signup-username');
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('signup-confirm-password');

    // Exécuter les validations
    const isEmailValid = validateEmail(emailInput);
    const isUsernameValid = validateRequired(usernameInput, 'Le nom d\'utilisateur est requis.');
    const isPasswordValid = validatePassword(passwordInput, 6); // Minimum 6 caractères
    const isConfirmPasswordValid = validateConfirmPassword(passwordInput, confirmPasswordInput);

    // Si tout est valide, on peut "soumettre" (simuler)
    // Notez l'ordre des validations pour que les messages soient affichés correctement
    if (isEmailValid && isUsernameValid && isPasswordValid && isConfirmPasswordValid) {
        alert('Compte créé avec succès ! (Simulé)');
        // Ici, tu pourrais rediriger ou enregistrer l'utilisateur
    } else {
        alert('Veuillez corriger les erreurs dans le formulaire d\'inscription.');
    }
});

// Optionnel: Validation en temps réel (au fur et à mesure que l'utilisateur tape)
// Pour une meilleure UX, on peut valider quand l'utilisateur quitte un champ (blur)
loginForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.type === 'email') validateEmail(input);
        if (input.type === 'password') validatePassword(input);
    });
});

signupForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.id === 'signup-email') validateEmail(input);
        if (input.id === 'signup-username') validateRequired(input, 'Le nom d\'utilisateur est requis.');
        if (input.id === 'signup-password') validatePassword(input);
        if (input.id === 'signup-confirm-password') validateConfirmPassword(document.getElementById('signup-password'), input);
    });
});

// Gérer aussi l'événement 'input' pour les mots de passe qui doivent correspondre
document.getElementById('signup-password').addEventListener('input', () => {
    validateConfirmPassword(document.getElementById('signup-password'), document.getElementById('signup-confirm-password'));
});
document.getElementById('signup-confirm-password').addEventListener('input', () => {
    validateConfirmPassword(document.getElementById('signup-password'), document.getElementById('signup-confirm-password'));
});