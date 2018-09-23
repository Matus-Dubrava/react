import React from 'react';

import './PurchaseSummary.css';

const purchaseSummary = (props) => {
    const items = props.items.map((item) => {
        return ( 
            <li key={item.id} >
                {item.name} - {item.price}
            </li>
        );
    });

    return (
        <div className="PurchaseSummary">
            <ul>
                {items}
            </ul>

            <p style={{ marginTop: '2rem' }}>
                Total price: 
                <span style={{ fontWeight: "700"}}> {props.totalPrice} EUR</span>
            </p>

            <button 
                onClick={props.purchaseContinued}
                className="PurchaseSummary__PurchaseBtn">Continue</button>

            <button
                onClick={props.purchaseCanceled}
                className="PurchaseSummary__CancelBtn">Cancel</button>
        </div>
    );
};

export default purchaseSummary;