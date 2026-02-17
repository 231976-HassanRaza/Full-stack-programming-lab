function validateForm() {
    // 1. Get input values and elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');
    const passwordInput = document.getElementById('password');
    const successBox = document.getElementById('success-box');

    // Values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const age = parseInt(ageInput.value);
    const password = passwordInput.value;

    // Reset previous errors and success message
    clearErrors();
    successBox.classList.add('hidden');

    let isValid = true;

    // 2. Validation Logic (Conditional Statements)

    // Name Validation: Should not be empty [cite: 103]
    if (name === "") {
        showError(nameInput, "Name cannot be empty.");
        isValid = false;
    }

    // Email Validation: Must contain '@' [cite: 105]
    if (!email.includes('@')) {
        showError(emailInput, "Please enter a valid email address (must contain '@').");
        isValid = false;
    }

    // Age Validation: Must be between 18–60 [cite: 104]
    // We check if it's Not-a-Number (NaN) or out of range
    if (isNaN(age) || age < 18 || age > 60) {
        showError(ageInput, "Age must be between 18 and 60.");
        isValid = false;
    }

    // Password Validation: Minimum length 6 [cite: 106]
    if (password.length < 6) {
        showError(passwordInput, "Password must be at least 6 characters long.");
        isValid = false;
    }

    // 3. Final Check
    if (isValid) {
        // Show success message dynamically [cite: 107]
        successBox.classList.remove('hidden');

        // Delay slighty so the DOM updates before the alert pops up
        setTimeout(() => {
            // Confirm Submission [cite: 108]
            const isConfirmed = confirm("All details are valid. Do you want to submit?");
            
            if (isConfirmed) {
                // Bonus: Additional interaction [cite: 109]
                alert(`Welcome, ${name}! Your registration is complete.`);
                // Reset form
                document.getElementById('regForm').reset();
                successBox.classList.add('hidden');
            } else {
                successBox.classList.add('hidden');
            }
        }, 100);
    }
}

// Helper function to display error dynamically
function showError(inputElement, message) {
    // Add red border to input
    inputElement.classList.add('error-border');
    
    // Find the corresponding small tag for the error message
    // This relies on the HTML structure: input + small
    const errorMsgElement = inputElement.nextElementSibling;
    errorMsgElement.innerText = message;
}

// Helper function to clear all error styles
function clearErrors() {
    // Remove error class from inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.classList.remove('error-border'));

    // Clear text from error messages
    const errorMsgs = document.querySelectorAll('.error-msg');
    errorMsgs.forEach(msg => msg.innerText = "");
}