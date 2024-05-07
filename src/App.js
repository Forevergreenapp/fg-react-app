import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div style={{ textAlign: 'center', marginTop: '5vh' }}>
          <h1>Forevergreen React App</h1>
          <p>Welcome to the Forevergreen React App landing page!</p>
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
            onClick={() => window.location.href = 'https://www.forevergreen.earth'}
          >
            Visit Forevergreen
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
