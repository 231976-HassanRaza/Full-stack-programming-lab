// Requirement: Create a Set to store registered courses
const registeredCourses = new Set();

// Select DOM Elements
const courseInput = document.getElementById("course-input");
const addBtn = document.getElementById("add-btn");
const courseList = document.getElementById("course-list");
const courseCount = document.getElementById("course-count");
const messageBox = document.getElementById("message-box");

// Function to render the UI
function displayCourses() {
    // Requirement: Display total unique courses using .size
    courseCount.innerText = registeredCourses.size;

    // Clear the current list HTML
    courseList.innerHTML = "";

    // Requirement: Loop through Set using for...of
    for (let course of registeredCourses) {
        courseList.innerHTML += `<li>📚 ${course}</li>`;
    }
}

// Function to add a course dynamically
function addCourse(courseName) {
    if (courseName === "") {
        showMessage("Please enter a course name.", "error");
        return;
    }

    // Requirement: Attempt adding duplicate courses
    // A Set implicitly prevents duplicates, but we use .has() to show an error message
    if (registeredCourses.has(courseName)) {
        showMessage(`Duplicate Prevented: "${courseName}" is already registered!`, "error");
    } else {
        // Requirement: Add courses dynamically
        registeredCourses.add(courseName);
        showMessage(`Success: "${courseName}" registered.`, "success");
        displayCourses();
    }
}

// Event Listener for the "Add Course" button
addBtn.addEventListener("click", () => {
    const newCourse = courseInput.value.trim();
    addCourse(newCourse);
    courseInput.value = ""; // Clear the input field
});

// Helper function to display temporary status messages
function showMessage(message, type) {
    messageBox.innerText = message;
    messageBox.className = `message-box ${type}`;
    
    // Hide the message after 3 seconds
    setTimeout(() => {
        messageBox.className = "message-box";
    }, 3000);
}

// --- Initial Setup Simulation ---
// Let's add some initial courses via code to show it working immediately
addCourse("Web Engineering");
addCourse("Artificial Intelligence");

// Let