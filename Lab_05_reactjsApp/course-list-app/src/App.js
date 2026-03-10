import logo from './logo.svg';
import './App.css';

const courses = [
  { courseName: "Full Stack Web Development", instructor: "Mr. Sharif Hussain", duration: "16 Weeks", type: "Offline" },
  { courseName: "Machine Learning Fundamentals", instructor: "Dr. Ayesha Malik", duration: "12 Weeks", type: "Online" },
  { courseName: "Database Systems", instructor: "Mr. Usman Tariq", duration: "8 Weeks", type: "Offline" },
  { courseName: "Cloud Computing with AWS", instructor: "Ms. Hina Raza", duration: "10 Weeks", type: "Online" },
  { courseName: "Cybersecurity Essentials", instructor: "Mr. Bilal Ahmed", duration: "6 Weeks", type: "Online" },
];

function CourseItem(props) {
  return (
    <div className="course-card">
      <div className="course-header">
        <h3 className="course-name">{props.courseName}</h3>
        <span className={props.type === "Online" ? "badge online" : "badge offline"}>
          {props.type}
        </span>
      </div>
      <p className="course-info">Instructor: {props.instructor}</p>
      <p className="course-info">Duration: {props.duration}</p>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <h1 className="title">Course List</h1>
      <div className="course-wrapper">
        {courses.map((course, index) => (
          <CourseItem
            key={index}
            courseName={course.courseName}
            instructor={course.instructor}
            duration={course.duration}
            type={course.type}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
