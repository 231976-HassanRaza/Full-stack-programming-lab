// Select all task rows
const taskRows = document.querySelectorAll('.task-row');

// Use a loop to apply functionality to each fixed task
taskRows.forEach((row) => {
    // Select buttons inside this specific row
    const completeBtn = row.querySelector('.btn-complete');
    const removeBtn = row.querySelector('.btn-remove');
    const inputField = row.querySelector('.task-input');

    // Handle "Complete" Action
    completeBtn.addEventListener('click', function() {
        row.classList.toggle('completed');
        
        // Update input status slightly
        if (row.classList.contains('completed')) {
            inputField.disabled = true; // Prevent editing when done
        } else {
            inputField.disabled = false;
        }
    });

    // Handle "Remove" Action
    removeBtn.addEventListener('click', function() {
        row.style.display = 'none';
    });
});

// Utility function to bring everything back (not strictly required but helpful)
function resetTasks() {
    taskRows.forEach(row => {
        row.style.display = 'flex';
        row.classList.remove('completed');
        row.querySelector('.task-input').disabled = false;
    });
}