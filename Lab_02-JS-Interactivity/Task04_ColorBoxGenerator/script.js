// Function to handle adding colors [cite: 97]
function addColors() {
    // Get input elements
    const inputs = [
        document.getElementById('color1'),
        document.getElementById('color2'),
        document.getElementById('color3')
    ];
    
    const container = document.getElementById('box-container');

    // Loop through inputs to create boxes
    inputs.forEach(input => {
        const colorValue = input.value.trim();

        // Check if input is not empty
        if (colorValue !== "") {
            createBox(container, colorValue);
        }
    });

    // Update BOM Info (Bonus)
    updateWindowInfo();
}

// Helper function to create the DIV and append it
function createBox(container, color) {
    const box = document.createElement('div');
    
    // Apply class for styling
    box.className = 'color-box';
    
    // Apply the user's color
    box.style.backgroundColor = color;
    
    // Add a title so user sees the color name on hover
    box.title = color;

    // Append to the DOM
    container.appendChild(box);
}

// Function to clear all boxes [cite: 98]
function clearBoxes() {
    const container = document.getElementById('box-container');
    
    // Remove all child elements
    container.innerHTML = '';
    
    // Clear the input fields
    document.getElementById('color1').value = '';
    document.getElementById('color2').value = '';
    document.getElementById('color3').value = '';
}

// BONUS: Function to display Window Dimensions using BOM 
function updateWindowInfo() {
    // Accessing BOM 'window' object properties
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const infoSpan = document.getElementById('win-size');
    infoSpan.innerText = `${width}px x ${height}px`;
}

// Initialize BOM info on load
updateWindowInfo();

// Update BOM info whenever the browser is resized (Event Handling)

window.onresize = updateWindowInfo;
