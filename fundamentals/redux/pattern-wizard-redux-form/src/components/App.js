import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import OrderForm from './order/OrderForm';

const App = props => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header />

                    <Route path="/" exact render={() => <h4>Home Page</h4>} />
                    <Route path="/order" component={OrderForm} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
