import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false
  };

  getPurchaseState(ingredients) {
    const ingredientsKeys = Object.keys(ingredients);
    const sum = ingredientsKeys.reduce((acc, v) => {
      return acc + ingredients[v]; 
    }, 0); 
    return sum > 0;
  }

  addIngredientHandler = (type) => {
    this.setState((prevState) => {
      const ingredients = {...prevState.ingredients};
      ingredients[type] += 1;
      const priceAddition = INGREDIENT_PRICES[type];

      return { 
        ingredients, 
        totalPrice: prevState.totalPrice + priceAddition,
        purchasable: this.getPurchaseState(ingredients) 
      };
    });
  };

  removeIngredientHandler = (type) => {
    this.setState((prevState) => {
      const ingredients = {...prevState.ingredients};
      let priceDeduction = 0;

      if (ingredients[type] > 0) { 
        ingredients[type] -= 1;
        priceDeduction = INGREDIENT_PRICES[type];
      }

      return { 
        ingredients,
        totalPrice: prevState.totalPrice - priceDeduction,
        purchasable: this.getPurchaseState(ingredients)
      };
    });
  };

  render() {
    const disableInfo = {...this.state.ingredients};
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
      <React.Fragment>
        <Burger 
          ingredients={this.state.ingredients} />
        <BuildControls
          purchasable={this.state.purchasable}
          totalPrice={this.state.totalPrice}
          disabledInfo={disableInfo} 
          removeIngredientHandler={this.removeIngredientHandler}
          addIngredientHandler={this.addIngredientHandler} />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;