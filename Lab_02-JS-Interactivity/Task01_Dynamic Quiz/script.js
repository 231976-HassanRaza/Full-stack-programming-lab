// Store questions/answers in separate variables
const correctAns1 = "script";
const correctAns2 = "let";
const correctAns3 = "doc";

// Function to calculate score
function calculateScore() {
    let score = 0;
    const totalQuestions = 3;
    
    // Get user inputs using DOM manipulation
    // Using querySelector to find the checked radio button for each group
    const q1Input = document.querySelector('input[name="q1"]:checked');
    const q2Input = document.querySelector('input[name="q2"]:checked');
    const q3Input = document.querySelector('input[name="q3"]:checked');

    // Validation: Ensure all questions are answered
    if (!q1Input || !q2Input || !q3Input) {
        alert("Please answer all questions before submitting!");
        return;
    }

    // Check answers individually
    if (q1Input.value === correctAns1) score++;
    if (q2Input.value === correctAns2) score++;
    if (q3Input.value === correctAns3) score++;

    // Call display function
    displayResult(score, totalQuestions);
}

// Function to display result dynamically
function displayResult(score, total) {
    const resultDiv = document.getElementById('result-area');
    let message = "";
    let msgClass = "";

    // Conditional statements for messages based on score
    if (score === total) {
        message = `Excellent! You scored ${score}/${total}. You are a pro! 🎉`;
        msgClass = "score-excellent";
    } else if (score >= 1) {
        message = `Good job! You scored ${score}/${total}. Keep practicing. 👍`;
        msgClass = "score-good";
    } else {
        message = `You scored ${score}/${total}. Don't give up! Try again. 😕`;
        msgClass = "score-poor";
    }

    // Update DOM elements
    resultDiv.innerText = message;
    
    // Reset classes and add the appropriate one
    resultDiv.className = ""; 
    resultDiv.classList.add(msgClass);
    
    // Make the result visible
    resultDiv.style.display = "block";
}

// Function to reset quiz
function resetQuiz() {
    // Clear the form
    document.getElementById('quizForm').reset();
    
    // Hide the result area
    const resultDiv = document.getElementById('result-area');
    resultDiv.style.display = "none";
    resultDiv.innerText = "";
    resultDiv.className = "";
}