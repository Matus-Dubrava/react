import React from 'react';

import Button from '../../UI/Button/Button';

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
      <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>   
      <p>Continue to Checkout?</p>
      <Button
        clicked={props.purchaseCancelHandler}
        btnType="Danger" >
        CANCEL</Button>
      <Button
        clicked={props.purchaseContinueHandler}
        btnType="Success" >
        CONTINUE</Button>
    </React.Fragment>
  );
};

export default orderSummary;