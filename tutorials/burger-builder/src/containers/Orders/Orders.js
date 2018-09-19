import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner />;
    
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => 
        <Order 
          ingredients={order.ingredients}
          price={+order.price}
          key={order.id} />  
      );
    }

    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token) => {dispatch(actionCreators.fetchOrders(token))}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));