import React, { PureComponent } from 'react';
import './PersonList.css';
import Person from './Person/Person';

class PersonList extends PureComponent {
  componentWillMount() {
    console.log('[Persons.js] inside componentWillMount');
  }

  componentDidMount() {
    console.log('[Persons.js] inside componentDidMount');
  }

  componentWillReceiveProps(nextProps) {
    console.log('[UPDATE Persons.js] inside componentWillReceiveProps', nextProps)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE Persons.js] inside shouldComponentUpdate', nextProps, nextState);
  //   return nextProps.persons !== this.props.persons ||
  //     nextProps.deletePersonHandler !== this.props.deletePersonHandler ||
  //     nextProps.nameChangedHandler !== this.props.nameChangedHandler;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE Persons.js] inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE Persons.js] inside componentDidUpdate');
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