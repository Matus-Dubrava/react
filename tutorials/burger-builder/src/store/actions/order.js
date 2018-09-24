// import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PRUCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, token) => {
  // return (dispatch) => {
  //   dispatch(purchaseBurgerStart());
  //   axios.post('/orders.json?auth=' + token, orderData)
  //     .then((res) => {
  //       dispatch(purchaseBurgerSuccess(res.data.name, orderData));
  //     })
  //     .catch((err) => {
  //       dispatch(purchaseBurgerFail(err));
  //     });
  // };
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData,
    token
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = (token, userId) => {
  // return (dispatch) => {
  //   dispatch(fetchOrdersStart());
  //   const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

  //   axios.get('./orders.json' + queryParams)
  //     .then((res) => {
  //       dispatch(fetchOrdersSuccess(res.data));
  //     })
  //     .catch((err) => {
  //       dispatch(fetchOrdersFail(err));
  //     });
  // };
  return {
    type: actionTypes.FETCH_ORDERS,
    token,
    userId
  };
};