import React, { Component } from 'react';
import './App.css';
import Person from './components/Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 32 },
      { name: 'Sue', age: 42 }
    ],
    showPersons: false
  }

  togglePersonsHandler = () => {
    this.setState((prevState) => {
      return { showPersons: !prevState.showPersons }
    });
  };

  nameChangedHandler = (event) => {
    const persons = [...this.state.persons];
    const manu = {...persons[1]};
    manu.name = event.target.value;
    persons[1] = manu;
    this.setState({ persons });
  };

  render() {
    const btnStyle = {
      backgroundColor: 'white',
      padding: '8px ',
      font: 'inherit',
      border: '1px solid blue',
      cursor: 'pointer'
    };

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          <Person 
            name={this.state.persons[0].name} 
            age={this.state.persons[0].age} />
          <Person 
            name={this.state.persons[1].name} 
            changed={this.nameChangedHandler}
            age={this.state.persons[1].age} />
          <Person 
            name={this.state.persons[2].name} 
            age={this.state.persons[2].age} />
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I am a React App</h1>
        <p>This is really working</p>
        <button 
          style={btnStyle}
          onClick={this.togglePersonsHandler.bind(this, 'Maximilian')}>Switch Name</button>
        {persons}
      </div>
    );
  }
}

export default App;
