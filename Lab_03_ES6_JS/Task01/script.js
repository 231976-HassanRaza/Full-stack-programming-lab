// Requirement: Create a Student class
class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = courses;
    }
}

// Requirement: Create at least 3 student objects using 'const'
const student1 = new Student(101, "Ali Khan", "6th", ["JavaScript", "HTML", "CSS"]);
const student2 = new Student(102, "Sara Ahmed", "6th", ["React", "Node.js", "MongoDB"]);
const student3 = new Student(103, "Usman Tariq", "6th", ["Python", "Data Structures", "Algorithms"]);

const studentsArray = [student1, student2, student3];

// Target the HTML element
const studentListContainer = document.getElementById("student-list");

// Initialize an empty string using 'let'
let htmlContent = "";

// Requirement: Display student details using template literals
for (const student of studentsArray) {
    // We can map over the courses to create individual badge spans for the UI
    const coursesHTML = student.courses.map(course => `<span class="course-tag">${course}</span>`).join("");
    
    htmlContent += `
        <div class="student-card">
            <h3>
                ${student.name} 
                <span class="id-badge">ID: ${student.id}</span>
            </h3>
            <p><strong>Semester:</strong> ${student.semester}</p>
            <p><strong>Enrolled Courses:</strong></p>
            <div class="course-tags">
                ${coursesHTML}
            </div>
        </div>
    `;
}

// Requirement: Show all students dynamically using innerHTML
studentListContainer.innerHTML = htmlContent;