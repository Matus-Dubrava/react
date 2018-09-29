import * as actionTypes from '../actions/actionTypes';

const initialState = {
    forecasts: [],
    error: null
};

const weatherDataFatchSuccess = (state, action) => {
    return {
        ...state,
        forecasts: action.data,
        error: null
    };
};

const weatherDataFatchFail = (state, action) => {
    return {
        ...state,
        error: action.error
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WEATHER_DATA_FETCH_SUCCESS: return weatherDataFatchSuccess(state, action);
        case actionTypes.WEATHER_DATA_FETCH_FAIL: return weatherDataFatchFail(state, action);
        default: return state;
    }
};

export default reducer;