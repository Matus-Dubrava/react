import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

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
    purchasable: false,
    purchasing: false,
    loading: false
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

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert('You continue');
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Matus Dubrava',
        address: {
          street: 'Teststreet 12',
          zipCode: '12394',
          country: 'Slovakia'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };

    axios.post('/orders.json', order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((err) => {
        this.setState({ loading: false, purchasing: false });
        console.log(err);
      });
  };

  render() {
    const disableInfo = {...this.state.ingredients};
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
            totalPrice={this.state.totalPrice}
            purchaseContinueHandler={this.purchaseContinueHandler}
            purchaseCancelHandler={this.purchaseCancelHandler} 
            ingredients={this.state.ingredients} />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <React.Fragment>
        <Modal 
          purchaseCancelHandler={this.purchaseCancelHandler}
          show={this.state.purchasing} >
          {orderSummary}            
        </Modal>
        <Burger 
          ingredients={this.state.ingredients} />
        <BuildControls
          purchaseHandler={this.purchaseHandler}
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