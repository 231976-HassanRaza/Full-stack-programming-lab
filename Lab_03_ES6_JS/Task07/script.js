// Task Requirement 1: Create 3 student objects with name, age, semester, and courses (array).
const studentsArray = [
    { 
        name: "Ali Khan", 
        age: 21, 
        semester: "6th", 
        courses: ["Web Engineering", "Database Systems"] 
    },
    { 
        name: "Sara Ahmed", 
        age: 22, 
        semester: "6th", 
        courses: ["Artificial Intelligence", "Machine Learning"] 
    },
    { 
        name: "Usman Tariq", 
        age: 20, 
        semester: "5th", 
        courses: ["Data Structures", "Operating Systems"] 
    }
];

// Task Requirement 2: Convert objects to JSON using JSON.stringify().
// Note: The 'null, 4' arguments format the JSON to look pretty with 4 spaces of indentation.
const stringifiedJSON = JSON.stringify(studentsArray, null, 4);

// Display the raw JSON string in our HTML <pre> block
document.getElementById("json-output").innerText = stringifiedJSON;

// Task Requirement 3: Convert JSON back to objects using JSON.parse().
const parsedStudents = JSON.parse(stringifiedJSON);

const studentListContainer = document.getElementById("student-list");
let htmlOutput = "";

// Task Requirement 6: Loop through students using forEach (or map).
parsedStudents.forEach(student => {
    
    // Task Requirement 4: Use destructuring to extract properties.
    const { name, age, semester, courses } = student;

    // Formatting the courses array into HTML badges
    let coursesHTML = courses.map(course => `<span class="course-badge">${course}</span>`).join("");

    // Task Requirement 5: Display all student info in HTML using innerHTML.
    htmlOutput += `
        <div class="student-card">
            <h4>🎓 ${name}</h4>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Semester:</strong> ${semester}</p>
            <p><strong>Courses:</strong><br> ${coursesHTML}</p>
        </div>
    `;
});

// Finally, inject the generated HTML into the DOM
studentListContainer.innerHTML = htmlOutput;