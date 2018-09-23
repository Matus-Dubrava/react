import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Products.css';
import * as actions from '../../store/actions/index';
import Product from '../../components/Product/Product';
import Spinner from '../../components/UI/Spinner/Spinner';

class Products extends Component {
    componentDidMount() {
        this.props.onFetchProducts();
    }

    addToCartHandler = (event, prod) => {
        this.props.onAddProductToCart(prod);
    }

    render() {
        let productsElements = <Spinner />

        if (!this.props.loading) {
            productsElements = this.props.products.map((prod) => {
                return (
                    <Product 
                        state={prod.state}
                        clicked={(event) => this.addToCartHandler(event, prod)}
                        key={prod.id}
                        price={prod.price}
                        name={prod.name} />
                );
            });
        }

        return (
            <div className="Products">
                {productsElements}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        loading: state.products.loading,
        cartItem: state.cart.cartItems
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchProducts: () => dispatch(actions.fetchProducts()),
        onAddProductToCart: (product) => dispatch(actions.cartAdd(product))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
