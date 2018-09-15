import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  }

  componentDidMount() {
    console.log(this.props);
    const queryParams = new URLSearchParams(this.props.location.search);
    this.setState({
      ingredients: {
        salad: +queryParams.get('salad'),
        meat: +queryParams.get('meat'),
        cheese: +queryParams.get('cheese'),
        bacon: +queryParams.get('bacon')
      }
    })
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    console.log(this.state.ingredients);
    return (
      <div>
        <CheckoutSummary 
          checkoutCancelled={this.checkoutCancelHandler}
          checkoutContinued={this.checkoutContinueHandler}
          ingredients={this.state.ingredients} />
      </div>
    );
  }
};

export default Checkout;