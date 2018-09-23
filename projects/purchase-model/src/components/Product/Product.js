import React from 'react';
import { withRouter } from 'react-router-dom';

import './Product.css';

const product = (props) => {
    let addToCartButton = null;
    if (props.state === 'initial') {
        addToCartButton = (
            <button
                className="BtnAddToCart" 
                onClick={props.clicked}>Add to Cart</button>
        );
    } else if (props.state === 'in-cart') {
        addToCartButton = (
            <button
                className="BtnInCart" 
                onClick={() => {
                    props.history.push('/cart');
                }}>See In Cart</button>
        );
    }

    return (
        <div className="Product">
            <h3>{props.name}</h3>
            <p>price: {props.price} EUR</p>
            {addToCartButton}
        </div>
    );
};

export default withRouter(product);