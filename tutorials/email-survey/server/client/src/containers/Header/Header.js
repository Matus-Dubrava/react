import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

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
                    <li>
                        <a href="/api/logout">Logout</a>
                    </li>
                );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">Emaily</a>
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
