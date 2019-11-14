import React from 'react';
import './App.css';
import AutoCompleteText from './AutoCompleteText';
import names from './names';

function App() {
  return (
    <div className="App">
        <div className="App-Component">
          <AutoCompleteText items={names} />
          <div>This is a test to see if this moves in relation to the dropdown</div>
        </div>
    </div>
  );
}

export default App;
