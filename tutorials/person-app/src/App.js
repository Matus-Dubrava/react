import React, { Component } from 'react';
import classes from './App.css';
import PersonList from './components/PersonList/PersonList';

class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28, id: 0 },
      { name: 'Manu', age: 32, id: 1 },
      { name: 'Sue', age: 42, id: 2 }
    ],
    showPersons: false
  }

  togglePersonsHandler = () => {
    this.setState((prevState) => {
      return { showPersons: !prevState.showPersons }
    });
  };

  nameChangedHandler = (val, id) => {
    const persons = [...this.state.persons];
    const pers = {...persons.find((pers) => pers.id === id)};
    const idx = persons.findIndex((pers) => pers.id === id);

    pers.name = val;
    persons[idx] = pers;
    this.setState({ persons });
  };

  deletePersonHandler = (id) => {
    const persons = [...this.state.persons];
    const idx = persons.findIndex((pers) => pers.id === id);
    persons.splice(idx, 1);
    this.setState({ persons });
  };

  render() {
    let persons = null;

    const headerClasses = [];
    const btnClasses = [classes.btn];

    if (this.state.showPersons) {
      persons = (
          <PersonList
            nameChangedHandler={this.nameChangedHandler}
            deletePersonHandler={this.deletePersonHandler} 
            persons={this.state.persons} />);      
      
        btnClasses.push(classes['btn--red']);
      } 

    if (this.state.persons.length < 3) {
      headerClasses.push(classes.red);
    }

    if (this.state.persons.length < 2) {
      headerClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I am a React App</h1>
        <p 
          className={headerClasses.join(' ')} >
          This is really working</p>
        <button 
          className={btnClasses.join(' ')}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
