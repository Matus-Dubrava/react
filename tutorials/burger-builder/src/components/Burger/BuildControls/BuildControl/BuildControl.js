import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        disabled={props.disabled} 
        onClick={props.removeIngredientHandler.bind(this, props.type)}
        className={classes.Less} >
        Less</button>
      <button
        onClick={props.addIngredientHandler.bind(this, props.type)} 
        className={classes.More} >
        More</button>
    </div>
  );
};

export default buildControl;