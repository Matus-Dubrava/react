import React from 'react';

const orderSummary = (props) => {
  const ingredientKeys = Object.keys(props.ingredients);
  const ingredients = ingredientKeys.map((igKey) => 
    <li key={igKey}>
      <span style={{textTransform: 'capitalize'}}>{igKey}</span>
        : {props.ingredients[igKey]}
    </li>
  );

  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredients}
      </ul>
      <p>Continue to Checkout?</p>
    </React.Fragment>
  );
};

export default orderSummary;