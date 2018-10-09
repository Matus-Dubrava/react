import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

class Header extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">Emaily</a>
                    <ul className="right">
                        <li>
                            <a>Login With Google</a>
                        </li>
                        <button onClick={this.props.onUserFetch}>
                            fetch user
                        </button>
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserFetch: () => dispatch(actions.fetchUser())
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Header);
