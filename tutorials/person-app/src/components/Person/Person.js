import React from 'react';
import './Person.css';

const Person = (props) => {
  return (
      <p 
				className="Person"
      >
				I am {props.name} and I am {props.age} yeas old.
			</p>
	);
}

export default Person;