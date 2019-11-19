import React from 'react';
import './App.css';
import AutoComplete from './AutoComplete';
import names from './names';

function App() {
  return (
    <div className="App">
        <div className="App-Component">
          <AutoComplete items={names} />
          <div>This is a test to see if this moves in relation to the dropdown</div>
        </div>
    </div>
  );
}

export default App;
