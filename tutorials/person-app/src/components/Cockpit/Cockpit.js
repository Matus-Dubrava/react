import React from 'react';

import classes from './Cockpit.css';

const cockpit = (props) => {
  const headerClasses = [];
  const btnClasses = [classes.btn];

  if (props.persons.length < 3) {
    headerClasses.push(classes.red);
  }

  if (props.persons.length < 2) {
    headerClasses.push(classes.bold);
  }

  if (props.showPersons) {
    btnClasses.push(classes['btn--red']);
  }

  return (
    <React.Fragment>
      <h1>Hi, I am a React App</h1>
      <p 
        className={headerClasses.join(' ')} >
        This is really working</p>
      <button 
        className={btnClasses.join(' ')}
        onClick={props.togglePersonsHandler}>Toggle Persons</button>
      <button
        onClick={props.loginHandler}>
        Log in</button>
    </React.Fragment>
  );
};

export default cockpit;