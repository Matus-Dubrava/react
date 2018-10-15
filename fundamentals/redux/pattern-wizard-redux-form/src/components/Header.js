import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => {
    return (
        <div className="nav-wrapper teal white-text">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/order">Order</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
