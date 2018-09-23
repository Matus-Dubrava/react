import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cartItems: [],
    totalPrice: 0,
    purchasing: false
};

const getPrice = (items) => {
    return items.reduce((acc, item) => {
        return acc + item.price;
    }, 0);
}

const cartAdd = (state, action) => {
    const chosenProduct = action.product;
    chosenProduct.state = 'in-cart';

    return {
        ...state,
        cartItems: [...state.cartItems, chosenProduct],
        totalPrice: state.totalPrice + chosenProduct.price
    };
};

const cartRemoveItem = (state, action) => {
    const newItems = state.cartItems.filter((item) => {
        return item.id !== action.id;
    });

    return {
        ...state,
        cartItems: newItems,
        totalPrice: getPrice(newItems)
    };
};

const cartFetchItems = (state, action) => {
    let newItems = [...state.cartItems];

    action.items.forEach((item) => {
        let isInCart = false;
        state.cartItems.forEach((cItem) => {
            if (cItem.id === item.id) {
                isInCart = true;
            }
        });

        if (!isInCart) {
            newItems.push(item);        
        }
    });

    return {
        ...state,
        cartItems: newItems,
        totalPrice: getPrice(newItems)
    };
};

const purchaseInit = (state, action) => {
    return {
        ...state,
        purchasing: true
    };
};

const purchaseCancel = (state, action) => {
    return {
        ...state,
        purchasing: false
    };
};

const purchaseFinished = (state, action) => {
    return {
        ...state,
        purchasing: false,
        cartItems: [],
        totalPrice: 0
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CART_ADD: return cartAdd(state, action);
        case actionTypes.CART_FETCH_ITEMS: return cartFetchItems(state, action);
        case actionTypes.CART_REMOVE_ITEM: return cartRemoveItem(state, action);
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_CANCEL: return purchaseCancel(state, action);
        case actionTypes.PURCHASE_FINISHED: return purchaseFinished(state, action);
        default: return state;
    }
};

export default reducer;