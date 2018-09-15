import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    this.setState({
      ingredients: {
        salad: +queryParams.get('salad'),
        meat: +queryParams.get('meat'),
        cheese: +queryParams.get('cheese'),
        bacon: +queryParams.get('bacon')
      },
      totalPrice: +queryParams.get('totalPrice')
    });
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          checkoutCancelled={this.checkoutCancelHandler}
          checkoutContinued={this.checkoutContinueHandler}
          ingredients={this.state.ingredients} />
        <Route 
          path={this.props.match.path + '/contact-data'} 
          render={(props) => (<ContactData 
            totalPrice={this.state.totalPrice}
            ingredients={this.state.ingredients}
            {...props} />)} />
      </div>
    );
  }
};

export default Checkout;