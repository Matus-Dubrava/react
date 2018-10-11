import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../store/actions';
import Payments from '../Payments/Payments';

class Header extends Component {
    renderContent() {
        switch (this.props.isAuth) {
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
                            <Payments />
                        </li>
                        <li>
                            <a href="/api/logout">Logout</a>
                        </li>
                    </React.Fragment>
                );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.isAuth ? '/surveys' : '/'}
                        className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul className="right">{this.renderContent()}</ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps)(Header);
