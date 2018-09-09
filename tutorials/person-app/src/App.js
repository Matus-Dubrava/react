import React, { Component } from 'react';
import './App.css';
import Person from './components/Person/Person';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hi, I am a React App</h1>
        <p>This is really working</p>
        <Person name="Max" age="28" />
        <Person name="Manu" age="32" />
        <Person name="Sue" age="42" />
      </div>
    );
  }
}

export default App;
