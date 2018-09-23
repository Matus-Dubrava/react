import * as actionTypes from './actionTypes';

export const cartAdd = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) { cart = {}; }

    let storedProduct = cart[product.id];
    if (!storedProduct) {
        cart[product.id] = product;
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    return {
        type: actionTypes.CART_ADD,
        product
    };
};

export const cartRemoveItem = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    delete cart[id];
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(cart));

    return {
        type: actionTypes.CART_REMOVE_ITEM,
        id
    };
};

export const cartFetchItems = () => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];

    return {
        type: actionTypes.CART_FETCH_ITEMS,
        items: Object.keys(items).map((id) => items[id])
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const purchaseCancel = () => {
    return {
        type: actionTypes.PURCHASE_CANCEL
    };
};

export const purchaseFinished = () => {
    localStorage.removeItem('cart');

    return {
        type: actionTypes.PURCHASE_FINISHED
    };
};