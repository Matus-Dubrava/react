import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

import * as actions from '../actions';

class Header extends Component {
    renderLinks() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login With Google</a>
                    </li>
                );
            default:
                return (
                    <React.Fragment>
                        <li>
                            <StripeCheckout
                                name="MaApp"
                                description="get 5 credits for 5$"
                                amount={500}
                                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                                token={token => this.props.onHandleToken(token)}
                            >
                                <button className="btn">Add Credits</button>
                            </StripeCheckout>
                        </li>
                        <li
                            style={{
                                margin: '0 10px'
                            }}
                        >
                            Credits: {this.props.auth.credit}
                        </li>
                        <li>
                            <a href="/auth/logout">Logout</a>
                        </li>
                    </React.Fragment>
                );
        }
    }

    render() {
        return (
            <div className="nav-wrapper">
                <nav>
                    <div className="left">
                        <Link to="/">MyApp</Link>
                    </div>
                    <ul className="right">{this.renderLinks()}</ul>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHandleToken: token => dispatch(actions.handleStripeToken(token))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
