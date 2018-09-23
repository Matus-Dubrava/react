import * as actionTypes from './actionTypes';

export const fetchProductsStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START
    }
}

export const fetchProductsSuccess = (products) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        products
    };
};

export const fetchProductsFail = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAIL,
        error
    };
};

export const fetchProducts = () => {
    const products = [
        {
            name: 'React-Redux full course',
            price: 489,
            id: 'asdusac',
            state: 'initial'
        },
        {
            name: 'Angular Masterclass',
            price: 799,
            id: 'jf329a',
            state: 'initial'
        },
        {
            name: 'Node.js internals with Event-loop and libuv',
            price: 499,
            id: 'daffi923f2',
            state: 'initial'
        }
    ];

    return (dispatch) => {
        dispatch(fetchProductsStart());

        setTimeout(() => {
            dispatch(fetchProductsSuccess(products));
        }, 1000);
    };
};
