import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import './Cart.css';
import * as actions from '../../store/actions/index';
import CartItem from '../../components/CartItem/CartItem';
import Modal from '../../components/UI/Modal/Modal';
import PurchaseSummary from '../../components/PurchaseSummary/PurchaseSummary';
import PurchasePayment from '../../components/PurchaseSummary/PurchasePayment/PurchasePayment';

class Cart extends Component {
    componentDidMount() {
        this.props.onCartFetchItems();
    }

    removeCartItemHandler = (id) => {
        this.props.onCartRemoveItem(id);
    }

    initPurchaseHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/cart/purchaseSummary/stage1');
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/cart/purchaseSummary/stage2');
    }

    purchaseCancelHandler = () => {
        this.props.onPurchaseCancel();
        this.props.history.replace('/cart');
    }

    render() {
        let cartItems = this.props.cartItems.map((item, index) => {
            return (
                <CartItem 
                    itemRemoved={() => this.removeCartItemHandler(item.id)}
                    key={index}
                    price={item.price}
                    name={item.name}/>
            );
        });

        if (!this.props.cartItems.length) {
            cartItems = (
                <p>Cart is empty, start adding
                    <Link to="/products"> items.</Link>
                </p> 
            );   
        }

        const totalPriceStyle = {
            fontWeight: '700'
        };

        let cartRedirect = null;
        if (!this.props.purchasing) {
            cartRedirect = <Redirect to="/cart" />
        }

        return (
            <Switch>
                <Route 
                    path="/cart/purchaseSummary/stage1" 
                    render={() => (
                        <React.Fragment>
                            {cartRedirect}
                            <Modal show={this.props.purchasing}>
                                <PurchaseSummary 
                                    purchasing={this.props.purchasing}
                                    purchaseContinued={this.purchaseContinueHandler}
                                    purchaseCanceled={this.purchaseCancelHandler}
                                    totalPrice={this.props.totalPrice}
                                    items={this.props.cartItems} />
                            </Modal>
                        </React.Fragment>
                    )} />

                <Route 
                    path="/cart/purchaseSummary/stage2" 
                    render={() => (
                        <React.Fragment>
                            {cartRedirect}
                            <Modal show={this.props.purchasing}>
                                <PurchasePayment
                                    purchaseCanceled={this.purchaseCancelHandler} 
                                    />
                            </Modal>
                        </React.Fragment>
                    )} />

                <Route
                    path="/cart" 
                    render={() => (
                        <div className="Cart">
                            {cartItems}
                            <p className="Cart_TotalPrice">Total Price: 
                                <span style={totalPriceStyle}> {this.props.totalPrice} EUR</span>
                            </p>
                            <button
                                disabled={this.props.totalPrice === 0}
                                onClick={this.initPurchaseHandler}
                                className="Cart__PurchaseBtn">Purchase</button>
                        </div>
                    )}/>
            </Switch>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems,
        totalPrice: state.cart.totalPrice,
        purchasing: state.cart.purchasing
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCartFetchItems: () => dispatch(actions.cartFetchItems()),
        onCartRemoveItem: (id) => dispatch(actions.cartRemoveItem(id)),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onPurchaseCancel: () => dispatch(actions.purchaseCancel())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);