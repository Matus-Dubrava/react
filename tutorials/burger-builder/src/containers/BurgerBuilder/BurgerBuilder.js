import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    this.props.onFetchIngredients();
  }

  // check if there is at least one ingredient with non-zero
  // value, if there is not such ingredient, return false
  getPurchaseState(ingredients) {
    const ingredientsKeys = Object.keys(ingredients);
    const sum = ingredientsKeys.reduce((acc, v) => {
      return acc + ingredients[v]; 
    }, 0); 
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disableInfo = {...this.props.ings};
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <React.Fragment>
          <Burger 
              ingredients={this.props.ings} />
          <BuildControls
            purchaseHandler={this.purchaseHandler}
            purchasable={this.getPurchaseState(this.props.ings)}
            totalPrice={this.props.totalPrice}
            disabledInfo={disableInfo} 
            removeIngredientHandler={this.props.onIngredientRemoved}
            addIngredientHandler={this.props.onIngredientAdded} />
        </React.Fragment>
      );

      orderSummary = (
        <OrderSummary
              totalPrice={this.props.totalPrice}
              purchaseContinueHandler={this.purchaseContinueHandler}
              purchaseCancelHandler={this.purchaseCancelHandler} 
              ingredients={this.props.ings} />
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

const addStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    totalPrice: state.burger.totalPrice
  };
};

const addDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => {dispatch(actionCreators.addIngredient(ingredientName))},
    onIngredientRemoved: (ingredientName) => {dispatch(actionCreators.removeIngredient(ingredientName))},
    onFetchIngredients: () => {dispatch(actionCreators.fetchIngredients())}
  };
};

export default connect(addStateToProps, addDispatchToProps)(withErrorHandler(BurgerBuilder, axios));