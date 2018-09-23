import React from 'react';

import './CartItem.css';

const cartItem = (props) => {
    return (
        <div className="CartItem">
            <h3>{props.name}</h3>
            <div>
                <p>price: {props.price} EUR</p>
                <button 
                    onClick={props.itemRemoved}
                    className="CartItem__BtnRemove">Remove</button>
            </div>
        </div>
    );
};

export default cartItem;