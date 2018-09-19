import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.totalPrice.toFixed(2)}$</strong></p>
      {controls.map((ctrl) => 
        <BuildControl
          disabled={props.disabledInfo[ctrl.type]}
          removeIngredientHandler={props.removeIngredientHandler}
          addIngredientHandler={props.addIngredientHandler} 
          key={ctrl.label}
          type={ctrl.type} 
          label={ctrl.label} /> 
      )}
      <button 
        onClick={props.purchaseHandler}
        className={classes.OrderButton}
        disabled={!props.purchasable && props.isAuthenticated} >
        {props.isAuthenticated ? "ORDER NOW" : "SIGN UP TO ORDER"}
      </button>
    </div>
  );
};

export default buildControls;