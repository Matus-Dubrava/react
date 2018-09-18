import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      console.log(action.orderData)
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };

      return {
        ...state,
        loading: false,
        orders: [...state.orders, newOrder],
        purchased: true
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      }
    case actionTypes.PRUCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }

    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.FETCH_ORDERS_SUCCESS:
      console.log(action.orders);

      const keys = Object.keys(action.orders);
      const orders = keys.map((id) => {
        return {
          id,
          ingredients: action.orders[id].ingredients,
          price: action.orders[id].price
        };
      });

      return {
        ...state,
        loading: false,
        orders
      };

    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};

export default reducer;
