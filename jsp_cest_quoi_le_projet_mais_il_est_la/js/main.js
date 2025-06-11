const display = document.querySelector('#calculator-display');
const buttons = document.querySelectorAll('button');

let currentExpression = '';
display.value = '0';

for (const button of buttons) {

    button.addEventListener('click', (event) => {
    const buttonValue = event.target.textContent;
    console.log(event.target.textContent);
    
    if (buttonValue >= '0' && buttonValue <= '9' || buttonValue === '.') {
        if (display.value === '0' && buttonValue !== '.') {
            display.value = buttonValue;
        }

        else if (buttonValue === '.') {
            if (!display.value.includes('.')) {
                display.value += buttonValue;
            }
            if (display.value === '' && buttonValue === '.') {
                display.value = '0.';
            }
        }

        else {
            display.value += buttonValue;
        }
    currentExpression = display.value; 
        }
        // --- Logique pour le bouton CLEAR (C) ---
        else if (buttonValue === 'C') { 
            display.value = '0';
            currentExpression = '';
        }
        // --- LOGIQUE POUR LES OPÉRATEURS (+, -, *, /) ---
        else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
            const lastChar = currentExpression.slice(-1); 
            
            const isLastCharAnOperator = ['+', '-', '*', '/'].includes(lastChar);

            if (display.value === '0' && buttonValue !== '-') {
                 
                 display.value = buttonValue;
                 currentExpression = buttonValue;
            }
            
            else if (isLastCharAnOperator) {
                currentExpression = currentExpression.slice(0, -1) + buttonValue; 
                display.value = currentExpression; 
            }
            
            else {
                currentExpression += buttonValue; 
                display.value = currentExpression; 
            }
        }
        // --- NOUVELLE LOGIQUE POUR LE BOUTON ÉGAL (=) ---
        else if (buttonValue === '=') {
            try {
                
                if (currentExpression === '') {
                    display.value = '0'; 
                    return;
                }
                
                
                let finalExpression = currentExpression;
                const lastChar = finalExpression.slice(-1);
                const isLastCharAnOperator = ['+', '-', '*', '/'].includes(lastChar);
                if (isLastCharAnOperator) {
                    finalExpression = finalExpression.slice(0, -1); 
                }

                
                let result = eval(finalExpression);

                
                if (isNaN(result) || !isFinite(result)) {
                    display.value = 'Error';
                    currentExpression = ''; 
                } else {
                    
                    result = parseFloat(result.toFixed(8)); 

                    display.value = result; 
                    currentExpression = String(result); 
                }

            } catch (error) {
                
                display.value = 'Error';
                currentExpression = ''; 
                console.error("Erreur de calcul:", error); 
            }
        }
    });
}