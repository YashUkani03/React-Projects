import { useState } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {

  let [counter, setcounter] = useState(5)

  const addvalue = () => {
    if (counter === 20) {
      setcounter(20)
    }
    else {
      setcounter(counter + 1)
    }
  }

  const RemoveValue = () => {
    if (counter === 0 || counter < 0) {
      setcounter(0)
    }
    else {
      setcounter(counter - 1)
    }

  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <h2>Counter : {counter} </h2>
          <button
            onClick={addvalue}
          >Add Counter</button>
          <br />
          <button
            onClick={RemoveValue}
          >Remove Counter</button>
        </p>

      </header>
    </div>
  );
}

export default App;
