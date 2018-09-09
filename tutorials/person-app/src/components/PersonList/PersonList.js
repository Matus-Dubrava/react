import React from 'react';
import './PersonList.css';
import Person from './Person/Person';

const PersonList = (props) => {
	const persons = props.persons.map((pers, i) => (
		<Person 
			key={i}
			id={pers.id}
			name={pers.name}
			age={pers.age} 
			deletePersonHandler={props.deletePersonHandler}
			nameChangedHandler={props.nameChangedHandler} />	
	));

	return (
		<ul className="PersonList">
			{persons}
		</ul>
  );
}

export default PersonList;