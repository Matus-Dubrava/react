import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../store/actions';

class Navigation extends Component {
    renderButton() {
        let btnText = 'Sing In';
        if (this.props.isAuthenticated) {
            btnText = 'Sign Out';
        }

        return (
            <button
                onClick={this.props.onToggleAuth}
                className="btn btn-outline-success">
                {btnText}
            </button>
        );
    }

    render() {
        const margin = {
            margin: "0 10px"
        };

        return (
            <nav>
                <ul
                    style={{
                        margin: "20px",
                        display: "flex",
                        listStyle: "none",
                        alignItems: "center"
                    }}>
                    <li
                        style={margin}><Link to="/">Home</Link>
                    </li>
                    <li
                        style={margin}><Link to="/post">Add Comment</Link>
                    </li>
                    {this.renderButton()}
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleAuth: () => dispatch(actions.toggleAuth())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);