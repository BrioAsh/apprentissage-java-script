/*
Sélectionner le titre principal par son ID :

Trouve le <h1> qui a l'ID titrePage.
Stocke-le dans une constante appelée titrePrincipal.
Affiche titrePrincipal dans la console.
*/
const titrePrincipal = document.getElementById('titrePage');

titre.textContent = "Bienvenue sur ma page modifiée par JS !";
console.log(titre.textContent);

/*
Sélectionner le paragraphe "spécial" par sa classe ET sa deuxième classe :

Trouve le paragraphe qui a à la fois les classes paragraphe-texte ET special.
Stocke-le dans une constante appelée paragrapheSpecial.
Affiche paragrapheSpecial dans la console.
*/
const paragrapheSpecial = document.querySelector('.paragraphe-text.special');
console.log(paragrapheSpecial);

/*
Sélectionner toutes les boîtes (les div avec la classe boite) :

Trouve tous les éléments div qui ont la classe boite.
Stocke-les dans une constante appelée toutesLesBoites.
Affiche toutesLesBoites dans la console.
*/
const toutesLesBoites = document.querySelectorAll('.boite');
console.log(toutesLesBoites);

/*
Sélectionner tous les éléments de liste (li) :

Trouve tous les <li> qui ont la classe liste-item.
Stocke-les dans une constante appelée itemsDeListe.
Affiche itemsDeListe dans la console.
*/
const itemsDeListe = document.querySelectorAll('.liste-item');
console.log(itemsDeListe);