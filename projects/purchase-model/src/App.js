import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Products from './containers/Products/Products';
import Navigation from './components/Navigation/Navigation';
import Cart from './containers/Cart/Cart';
import Backdrop from './components/UI/Backdrop/Backdrop';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Backdrop show={this.props.purchasing} />

                    <Navigation 
                        numItems={this.props.cartItems.length} />

                    <Switch>
                        <Route path="/products" component={Products} />
                        <Route path="/cart" component={Cart} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems,
        purchasing: state.cart.purchasing
    };
};

export default connect(mapStateToProps)(App);
