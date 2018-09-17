import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  // componentDidMount() {
  //   axios.get('https://burger-builder-32ae6.firebaseio.com/ingredients.json')
  //     .then((res) => {
  //       this.setState({ ingredients: res.data });
  //     })
  //     .catch((err) => {
  //       console.log('error');
  //       this.setState({ error: true });
  //     });
  // }

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
    const queryParams = [];
    for (let key in this.state.ingredients) {
      queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.state.ingredients[key]));
    }
    queryParams.push('totalPrice=' + this.state.totalPrice);

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&')
    });
  };

  render() {
    const disableInfo = {...this.state.ingredients};
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger =this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
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

      orderSummary = (
        <OrderSummary
              totalPrice={this.state.totalPrice}
              purchaseContinueHandler={this.purchaseContinueHandler}
              purchaseCancelHandler={this.purchaseCancelHandler} 
              ingredients={this.state.ingredients} />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }


    return (
      <React.Fragment>
        <Modal 
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing} >
          {orderSummary}            
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);