document.addEventListener('DOMContentLoaded', () => {
    const uiContainer = document.getElementById('ui');
    const numberOfHearts = 100; // Nombre de cœurs, tu peux l'ajuster
    const baseAnimationDuration = 10; // Durée de l'animation en secondes
    const delayIncrement = 0.5; // Incrément du délai d'animation en secondes

    for (let i = 0; i < numberOfHearts; i++) {
        const loveDiv = document.createElement('div');
        loveDiv.classList.add('love');

        const loveHorizontalDiv = document.createElement('div');
        // Nous n'avons plus besoin de love_horizontal et love_vertical pour les animations directes.
        // Les classes animate-left/right seront appliquées directement sur loveDiv.
        // Mais gardons la structure HTML pour .love_word si tu veux conserver le rotateZ par exemple.
        loveHorizontalDiv.classList.add('love_horizontal'); 

        const loveVerticalDiv = document.createElement('div');
        loveVerticalDiv.classList.add('love_vertical');

        const loveWordDiv = document.createElement('div');
        loveWordDiv.classList.add('love_word');
        loveWordDiv.textContent = 'I Love You';

        // Applique l'animation gauche ou droite en fonction de l'index
        if (i % 2 === 0) { // Pour les cœurs pairs (ou impair, comme tu préfères)
            loveDiv.classList.add('animate-left');
        } else { // Pour les cœurs impairs
            loveDiv.classList.add('animate-right');
        }

        // Calcule le délai d'animation pour chaque cœur
        const animationDelay = i * delayIncrement;
        loveDiv.style.animationDelay = `-${animationDelay}s`;
        
        // Assemble les éléments
        loveVerticalDiv.appendChild(loveWordDiv);
        loveHorizontalDiv.appendChild(loveVerticalDiv);
        loveDiv.appendChild(loveHorizontalDiv);

        uiContainer.appendChild(loveDiv);
    }

    // Applique le style spécial au dernier "I Love You"
    const lastLoveWord = document.querySelector('#ui .love:last-child .love_word');
    if (lastLoveWord) {
        lastLoveWord.style.color = '#fff';
        lastLoveWord.style.fontSize = '2rem';
        lastLoveWord.style.textShadow = '0 0 10px #ea80b0';
    }
});