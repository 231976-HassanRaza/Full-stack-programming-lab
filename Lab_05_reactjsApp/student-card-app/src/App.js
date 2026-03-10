import logo from './logo.svg';
import './App.css';

function StudentCard(props) {
  return (
    <div className="card" style={{ backgroundColor: props.color }}>
      <div className="avatar">{props.name.charAt(0)}</div>
      <h2 className="student-name">{props.name}</h2>
      <p className="roll-no">Roll No: {props.rollNo}</p>
      <hr className="divider" />
      <p className="info">Department: {props.department}</p>
      <p className="info">University: {props.university}</p>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <h1 className="title">Student Information Cards</h1>
      <div className="card-wrapper">
        <StudentCard
          name="Hassan Raza"
          rollNo="231976"
          department="Software Engineering"
          university="Air University"
          color="#e8f4fd"
        />
        <StudentCard
          name="Musab Ejaz"
          rollNo="232066"
          department="AI and Machine Learning"
          university="Air University"
          color="#fef3e2"
        />
        <StudentCard
          name="Ahmed Raza"
          rollNo="231736"
          department="Cyber Security"
          university="Air University"
          color="#e8fdf0"
        />
      </div>
    </div>
  );
}

export default App;
