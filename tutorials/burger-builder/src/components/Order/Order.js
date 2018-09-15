import React from 'react';

import classes from './Order.css';

const order = (props) => {
  const ingredients = Object.keys(props.ingredients)
    .map((key) => {
      return <span
        style={{ 
          textTransform: 'capitalize', 
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid grey',
          padding: '5px'
        }} 
        key={key}>{key} ({props.ingredients[key]}) </span>
    });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  );
}

export default order;