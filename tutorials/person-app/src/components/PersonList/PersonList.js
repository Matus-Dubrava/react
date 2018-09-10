import React, { Component } from 'react';
import './PersonList.css';
import Person from './Person/Person';

class PersonList extends Component {
  componentWillMount() {
    console.log('[Persons.js] inside componentWillMount');
  }

  componentDidMount() {
    console.log('[Persons.js] inside componentDidMount');
  }

	render() {
    console.log('[Persons.js] inside render');

		const persons = this.props.persons.map((pers, i) => (
			<Person 
				key={i}
				id={pers.id}
				name={pers.name}
				age={pers.age} 
				deletePersonHandler={this.props.deletePersonHandler}
				nameChangedHandler={this.props.nameChangedHandler} />	
		));
    
    return (
      <ul className="PersonList">
        {persons}
      </ul>
    );
	}
}

export default PersonList;