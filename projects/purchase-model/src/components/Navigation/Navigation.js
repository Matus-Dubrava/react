import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

const navigation = (props) => {
    let cartItemCounter = null;
    if (props.numItems > 0) {
        cartItemCounter = (
            <span className="CartItemCount">
                {props.numItems}
            </span>
        );
    }
    
    return (
        <nav className="Navigation">
            <ul className="Navigation__list Navigation__list--left">
                <li className="Navigation__item">
                    <NavLink to="/">Home</NavLink>
                </li>
                <li className="Navigation__item">
                    <NavLink to="/products">Products</NavLink>
                </li>
                <li className="Navigation__item">
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
            </ul>

            <ul className="Navigation__list Navigation__list--right">
                <li className="Navigation__item">
                    <NavLink to="/cart"> 
                        <div className="ShoppingCartIcon"></div> {cartItemCounter}
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default navigation;