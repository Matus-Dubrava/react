import React from 'react';

import classes from './BoardCell.css';

const boardCell = (props) => {
  let symbol = '';
  let assignedClasses = [classes.BoardCell];

  if (props.takenBy === 1) { 
    symbol = 'o'; 
    assignedClasses.push(classes.green);
  }

  if (props.takenBy === 2) { 
    symbol = 'x'; 
    assignedClasses.push(classes.red);
  }

  return (
    <div
      className={assignedClasses.join(' ')} 
      onClick={props.clicked.bind(this, props.id)} >
      {symbol}
    </div>
  );
};

export default boardCell;