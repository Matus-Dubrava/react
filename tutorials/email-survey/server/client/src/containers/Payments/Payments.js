import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                // US dolar cents, 500 => 5 dolars
                name="Emaily"
                description="$5 for 5 email credits"
                amount={500}
                token={token => this.props.onHandleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">Add Credits</button>
            </StripeCheckout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onHandleToken: token => dispatch(actions.handleToken(token))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Payments);
