import * as actionTypes from './actionTypes';

const initialState = {
  loading: false,
  error: false,
  data: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_START: 
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_DATA_FAIL: 
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      };
    
    default: return state;
  }
};

export default reducer;