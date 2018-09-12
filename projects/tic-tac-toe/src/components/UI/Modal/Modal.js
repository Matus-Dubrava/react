import React from 'react';

import classes from './Modal.css';

const modal = (props) => {
  let assignedClasses = [classes.Modal];
  if (props.show) {
    assignedClasses.push(classes.visible);
  }

  return (
    <div 
      className={assignedClasses.join(' ')} >
      {props.children}
    </div>
  );
};

export default modal;