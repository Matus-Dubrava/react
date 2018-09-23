import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './PurchasePayment.css';
import * as actions from '../../../store/actions/index';

class PurchasePayment extends Component {
    state = {
        paymentMethod: 'visa'
    }

    inputChangeHandler = (method) => {
        this.setState({ paymentMethod: method });
    }

    purchaseStepBackHandler = () => {
        this.props.history.goBack();
    }

    purchaseFinishedHandler = () => {
        this.props.onPurchaseFinish();
        alert('PURCHASED');
    }

    render() {
        return (
            <div className="PurchasePayment">
                <div>
                    <label htmlFor="visa">Visa</label>
                    <input
                        id="visa"
                        onClick={() => this.inputChangeHandler('visa')}
                        defaultChecked
                        type="radio" 
                        name="method" 
                        value="visa" />
                </div>
                
                <div>
                    <label htmlFor="paypal">PayPal</label>
                    <input 
                        onClick={() => this.inputChangeHandler('paypal')}
                        id="paypal"
                        type="radio" 
                        name="method" 
                        value="paypal" />
                </div>

                <button 
                    onClick={this.purchaseFinishedHandler}
                    className="PurchaseSummary__PurchaseBtn">Finish</button>
    
                <button 
                    onClick={this.purchaseStepBackHandler}
                    className="PurchaseSummary__BackBtn">Back</button>

                <button
                    onClick={this.props.purchaseCanceled}
                    className="PurchaseSummary__CancelBtn">Cancel</button>
            </div>

        );
    }
};

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPurchaseFinish: () => dispatch(actions.purchaseFinished())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PurchasePayment));