import * as actionTypes from '../actions/actionTypes';

const initialState = {
    products: [],
    error: null,
    loading: false
};

const fetchProductsSuccess = (state, action) => {
    const storedProducts = JSON.parse(localStorage.getItem('cart')) || [];
    const storedKeys = Object.keys(storedProducts);
    const products = action.products.reduce((acc, prod) => {
        if (storedKeys.includes(prod.id)) { prod.state = 'in-cart'; }
        acc.push(prod);
        return acc;
    }, []);

    return {
        ...state,
        products,
        error: null,
        loading: false
    };
}

const fetchProductsFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    };
};

const fetchProductsStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS_SUCCESS: return fetchProductsSuccess(state, action);
        case actionTypes.FETCH_PRODUCTS_START: return fetchProductsStart(state, action);
        case actionTypes.FETCH_PRODUCTS_FAIL: return fetchProductsFail(state, action);
        default: return state;
    }
};

export default reducer;