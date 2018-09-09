import React from 'react';
import './Person.css';

const Person = () => {
    return (
        <p className="Person">
            I'm a Person and I am {Math.floor(Math.random() * 30)} yeas old.
        </p>
    );
}

export default Person;