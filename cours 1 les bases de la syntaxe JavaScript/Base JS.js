// Ceci est un test de script pour "Site_test.html"
console.log("Le cacaaaaa");


/*
2. Les variables
   Une variable est comme une boîte qui stocke une valeur. Tu peux la nommer comme tu veux 
   (en respectant certaines règles) et la valeur à l'intérieur peut changer.
   Il existe trois mots-clés pour déclarer des variables : var, let et const. Aujourd'hui, on utilise principalement let et const.
*/

// Les let : Pour une variable dont la valeur peut changer.
let nom = "Alice";
console.log(nom); // Affiche "Alice"
nom = "Bob";
console.log(nom); // Affiche "Bob"


// Les const : Pour une constante, une valeur qui ne changera jamais.
const PI = 3.14159
console.log(PI); // Affiche 3.14159
// PI = 3.14; // Ceci provoquerait une erreur car on ne peut pas modifier une constante


/* 
3. Ici on va attaqué les types de données
   JavaScript gère différents types de données:
*/

// Les String (Chaîne de caractères) : Du texte, toujours entre guillemets ([""] ou ['']).
let message = "Bonjour tout le monde !";
let prenom = 'Sophie';


// Les Number : Des nombres, entiers ou décimaux.
let age = 30;
let prix = 19.99


// Les Boolean : Représente vrai ou faux ([true] ou [false]).
let estConnecte = true
let aTermine = false


// Les Array (Tableau) : Un liste d'éléments.
let fruits = ["Pomme", "Banane", "Orange"];
console.log(fruits[0]); // Affiche "Pomme" (les tableaux commencent à l'index 0)


// Les Object (Objet) : Une collection de paires clé-valeur.
let personne = {
    nom: "Dupont",
    prenom: "Jean",
    age: 25
};
console.log(personne.nom); // Affiche "Dupont"
console.log(personne.age); // Affiche 25


/*
4. Les opérateurs
   Les opérateurs te permettent de manipuler les valeurs.
*/

// Les Opérateurs arithmétiques (+, -, *, /, % (modulo - reste de la division))
let a = 10;
let b = 5;
let somme = a + b; // 15
let difference = a - b; // 5
let produit = a * b; // 50
let division = a / b; // 2
let reste = a % b; // 0

// Les Opérateurs de comparaison (== (égalité de valeur), === (égalité de valeur et de type), != (différent de), !== (différent en valeur ou en type), <, >, <=, >=)
console.log(5 == "5");  // true (valeur égale)
console.log(5 === "5"); // false (valeur égale, mais types différents)
console.log(10 > 5);    // true

// Les Opérateurs logiques (&& (ET), || (OU), ! (NON))
let estMajeur = true
let aPermis = false
console.log(estMajeur && aPermis); // false (true ET false)
console.log(estMajeur || aPermis); // true (true OU false)
console.log(!estMajeur);           // false


/*
5. Les conditions (if/else)
   Les conditions te permettent d'exécuter du code uniquement si une certaine condition est vraie.
*/

let temperature = 25;

if (temperature > 30) {
    console.log("Il fait très chaud !");
} else if (temperature > 20) {
    console.log("Il fait beau et chaud.");
} else {
    console.log("Il fait frais ou froid.");
}


/*
6. Les boucles
   Les boucles te permettent de répéter du code plusieurs fois.
*/

// for : Pour répéter un certain nombre de fois.
for (let i = 0; i < 5; i++) {
    console.log("Computer : " + i);
}
// Affiche :
// Compteur : 0
// Compteur : 1
// Compteur : 2
// Compteur : 3
// Compteur : 4

// while : Pour répéter tant qu'une condition est vraie.
let compteur = 0;
while (compteur < 3) {
    console.log("Compteur while : " + compteur);
    compteur++;
}
// Affiche :
// Compteur while : 0
// Compteur while : 1
// Compteur while : 2


/*
7. Les fonctions
   Une fonction est un bloc de code réutilisable qui effectue un tâche spécifique.
   Tu la définis une fois et tu peux l'appeler ("exécuter") autant de fois que tu veux.
*/

// Déclaration d'une fonction
function saluer(nom) {
    console.log("Bonjour, " + nom + " !");
}

// Appel de la fonction
saluer("Alice"); // Affiche "Bonjour, Alice !"
saluer("Bob");   // Affiche "Bonjour, Bob !"

// Fonction avec une valeur de retour
function addition(a, b) {
    return a + b;
}

let resultat = addition(5, 3);
console.log(resultat); // Affiche 8