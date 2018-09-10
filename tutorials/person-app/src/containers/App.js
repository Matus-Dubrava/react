import React, { PureComponent } from 'react';

import classes from './App.css';
import PersonList from '../components/PersonList/PersonList';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../components/hoc/WithClass';

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[App.js] inside constructir', props);
  }

  componentWillMount() {
    console.log('[App.js] inside componentWillMount');
  }

  componentDidMount() {
    console.log('[App.js] inside componentDidMount');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] inside shouldComponentUpdate', nextProps, nextState);
  //   return nextState.persons !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] inside componentDidUpdate');
  }

  state = {
    persons: [
      { name: 'Max', age: 28, id: 0 },
      { name: 'Manu', age: 32, id: 1 },
      { name: 'Sue', age: 42, id: 2 }
    ],
    showPersons: false,
    toggleClickedCounter: 0
  }

  togglePersonsHandler = () => {
    this.setState((prevState) => {
      return { 
        showPersons: !prevState.showPersons, 
        toggleClickedCounter: prevState.toggleClickedCounter + 1
      }
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
    console.log('[App.js] inside render');
    let persons = null;

    if (this.state.showPersons) {
      persons = (
          <PersonList
            nameChangedHandler={this.nameChangedHandler}
            deletePersonHandler={this.deletePersonHandler} 
            persons={this.state.persons} />);      
    } 

    return (
      <React.Fragment>
        <button
          onClick={() => this.setState({ showPersons: true })} >
          Show Persons
        </button>
        <Cockpit 
          persons={this.state.persons}
          showPersons={this.state.showPersons}
          togglePersonsHandler={this.togglePersonsHandler} />
        {persons}
      </React.Fragment>
    );
  }
}

export default withClass(App, classes.App);
