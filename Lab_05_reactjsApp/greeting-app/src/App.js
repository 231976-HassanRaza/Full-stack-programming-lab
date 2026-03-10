import logo from './logo.svg';
import './App.css';

function Greeting(props) {
  let message = '';
  let emoji = '';

  if (props.timeOfDay === 'morning') {
    message = 'Rise and shine! Have a wonderful day.';
    emoji = '🌅';
  } else if (props.timeOfDay === 'afternoon') {
    message = 'Hope your day is going great so far!';
    emoji = '☀️';
  } else if (props.timeOfDay === 'evening') {
    message = 'Time to wind down and relax.';
    emoji = '🌇';
  } else if (props.timeOfDay === 'night') {
    message = 'Sweet dreams! Rest well.';
    emoji = '🌙';
  }

  return (
    <div className="greeting-card" style={{ backgroundColor: props.bgColor }}>
      <div className="emoji">{emoji}</div>
      <span className="time-label">{props.timeOfDay}</span>
      <h2 className="greeting-text">Good {props.timeOfDay},</h2>
      <h3 className="greeting-name">{props.name}!</h3>
      <p className="greeting-message">"{message}"</p>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <h1 className="title">Dynamic Greeting App</h1>
      <p className="subtitle">Greetings change based on time of day</p>
      <div className="greeting-wrapper">
        <Greeting name="Ali" timeOfDay="morning" bgColor="#fff9e6" />
        <Greeting name="Sara" timeOfDay="afternoon" bgColor="#e6f7ff" />
        <Greeting name="Musharaf" timeOfDay="evening" bgColor="#f0e6ff" />
        <Greeting name="Hina" timeOfDay="night" bgColor="#1a1a2e" />
      </div>
    </div>
  );
}

export default App;
