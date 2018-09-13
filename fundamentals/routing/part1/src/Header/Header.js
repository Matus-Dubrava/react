import React from 'react';

import './Header.css';

const header = () => {
    return (
        <header class="header">
            <nav class="main-navigation">
                <ul class="main-navigation__list">
                    <li class="main-navigation__item"><a href="/">Home</a></li>
                    <li class="main-navigation__item"><a href="/products">Products</a></li>
                    <li class="main-navigation__item"><a href="/pricing">Pricing</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default header;