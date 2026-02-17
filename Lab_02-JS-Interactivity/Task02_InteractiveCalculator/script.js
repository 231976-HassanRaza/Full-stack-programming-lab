function calculateResult() {
    // Get elements from DOM
    const num1Str = document.getElementById('num1').value;
    const num2Str = document.getElementById('num2').value;
    const operation = document.getElementById('operation').value;
    const resultBox = document.getElementById('result-box');
    const resultText = document.getElementById('result-text');

    // Validate Inputs
    if (num1Str === '' || num2Str === '') {
        alert("Please enter both numbers.");
        return;
    }

    // Convert string inputs to numbers
    const num1 = parseFloat(num1Str);
    const num2 = parseFloat(num2Str);
    let result = 0;

    // Perform Calculation
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            // Validation: Prevent division by zero 
            if (num2 === 0) {
                alert("Error: Cannot divide by zero!");
                resultBox.style.display = 'none'; // Hide result on error
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }

    // Update DOM with Result 
    // round to 2 decimals if it's a long float
    const displayResult = Number.isInteger(result) ? result : result.toFixed(2);
    resultText.innerText = `Result: ${displayResult}`;
    resultBox.classList.remove('hidden');

    // Bonus: Change Background Color 
    // Reset classes first
    resultBox.classList.remove('positive', 'negative', 'neutral');

    if (result > 0) {
        resultBox.classList.add('positive');
    } else if (result < 0) {
        resultBox.classList.add('negative');
    } else {
        resultBox.classList.add('neutral');
    }
    
    // Ensure display is block (in case it was hidden by error previously)
    resultBox.style.display = 'block';

}
