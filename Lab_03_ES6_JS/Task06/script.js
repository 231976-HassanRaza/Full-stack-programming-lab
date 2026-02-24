// Requirement 1: Add students using Class
// Requirement 3: Register courses using Set
class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.courses = new Set(); // Using Set to prevent duplicate courses
    }

    addCourse(courseName) {
        if (this.courses.has(courseName)) {
            return false; // Course already exists
        }
        this.courses.add(courseName);
        return true; // Course added successfully
    }
}

// Requirement 2: Store students in Map
const universityPortal = new Map();

// UI Elements
const studentIdInput = document.getElementById("student-id");
const studentNameInput = document.getElementById("student-name");
const enrollIdInput = document.getElementById("enroll-id");
const courseNameInput = document.getElementById("course-name");
const studentsListUI = document.getElementById("students-list");
const messageBox = document.getElementById("message-box");

// ----------------- ADD STUDENT LOGIC -----------------
document.getElementById("add-student-btn").addEventListener("click", () => {
    const id = parseInt(studentIdInput.value);
    const name = studentNameInput.value.trim();

    if (!id || !name) return showMessage("Please enter valid Student ID and Name.", "error");
    if (universityPortal.has(id)) return showMessage("Student ID already exists.", "error");

    // Create new class instance and store in Map
    const newStudent = new Student(id, name);
    universityPortal.set(id, newStudent);
    
    showMessage(`Student ${name} added successfully!`, "success");
    studentIdInput.value = "";
    studentNameInput.value = "";
    renderPortal();
});

// ----------------- REGISTER COURSE LOGIC -----------------
document.getElementById("register-course-btn").addEventListener("click", () => {
    const id = parseInt(enrollIdInput.value);
    const course = courseNameInput.value.trim();

    if (!id || !course) return showMessage("Please enter valid ID and Course.", "error");
    if (!universityPortal.has(id)) return showMessage(`Student ID ${id} not found.`, "error");

    // Fetch student from map and add course to their Set
    const student = universityPortal.get(id);
    const added = student.addCourse(course);

    if (added) {
        showMessage(`Course '${course}' added for ${student.name}.`, "success");
        courseNameInput.value = "";
    } else {
        showMessage(`${student.name} is already registered for '${course}'.`, "error");
    }
    
    renderPortal();
});

// ----------------- PROMISE / SAVE LOGIC -----------------
// Requirement 4: Simulate saving data using Promise
document.getElementById("save-data-btn").addEventListener("click", () => {
    showMessage("⏳ Connecting to server to save data...", "info");

    const saveToServer = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (universityPortal.size === 0) {
                reject("Portal is empty. No data to save!");
            } else {
                resolve(`Successfully saved ${universityPortal.size} student records to the database.`);
            }
        }, 2000); // 2-second simulation delay
    });

    saveToServer
        .then((successMsg) => showMessage(`✅ ${successMsg}`, "success"))
        .catch((errorMsg) => showMessage(`❌ ${errorMsg}`, "error"));
});

// ----------------- UI RENDER LOGIC -----------------
function renderPortal() {
    studentsListUI.innerHTML = "";
    
    // Iterate over the Map
    for (let [id, student] of universityPortal) {
        let coursesHTML = "";
        
        // Iterate over the Set
        if (student.courses.size === 0) {
            coursesHTML = `<span class="courses-badge" style="color:#ef4444;">No courses registered</span>`;
        } else {
            for (let course of student.courses) {
                coursesHTML += `<span class="courses-badge">📚 ${course}</span>`;
            }
        }

        studentsListUI.innerHTML += `
            <li>
                <strong>ID: ${id} | Name: ${student.name}</strong>
                <div style="margin-top: 5px;">${coursesHTML}</div>
            </li>
        `;
    }
}

// Helper to show messages
function showMessage(msg, type) {
    messageBox.className = `message-box ${type}`;
    messageBox.innerText = msg;
    setTimeout(() => {
        if(messageBox.innerText === msg) messageBox.style.display = 'none';
        messageBox.style.display = 'block';
    }, 10);
    setTimeout(() => { messageBox.style.display = 'none'; }, 3500);
}