import React, { Component } from 'react';
import './App.css';
import Person from './components/Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 32 },
      { name: 'Sue', age: 42 }
    ]
  }

  switchNameHandler = (newName) => {
    const persons = [...this.state.persons];
    const max = {...persons[0]};
    max.name = newName;
    persons[0] = max;
    this.setState({ persons });
  };

  nameChangedHandler = (event) => {
    const persons = [...this.state.persons];
    const manu = {...persons[1]};
    manu.name = event.target.value;
    persons[1] = manu;
    this.setState({ persons });
  };

  render() {
    return (
      <div className="App">
        <h1>Hi, I am a React App</h1>
        <p>This is really working</p>
        <button onClick={this.switchNameHandler.bind(this, 'Maximilian')}>Switch Name</button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} />
        <Person 
          name={this.state.persons[1].name} 
          click={this.switchNameHandler.bind(this, 'Max!!!')}
          changed={this.nameChangedHandler}
          age={this.state.persons[1].age} />
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age} />
      </div>
    );
  }
}

export default App;
