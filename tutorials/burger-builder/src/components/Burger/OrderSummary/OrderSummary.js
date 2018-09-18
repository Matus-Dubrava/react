import React, { Component } from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render() {
    const ingredientKeys = Object.keys(this.props.ingredients);
    const ingredients = ingredientKeys.map((igKey) => 
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>
          : {this.props.ingredients[igKey]}
      </li>
    );
  
    return (
      <React.Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredients}
        </ul>
        <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>   
        <p>Continue to Checkout?</p>
        <Button
          clicked={this.props.purchaseCancelHandler}
          btnType="Danger" >
          CANCEL</Button>
        <Button
          clicked={this.props.purchaseContinueHandler}
          btnType="Success" >
          CONTINUE</Button>
      </React.Fragment>
    );
  }
};

export default OrderSummary;