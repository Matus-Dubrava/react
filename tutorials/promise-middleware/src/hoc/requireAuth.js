import React, { Component } from 'react';
import { connect } from 'react-redux';

const requireAuth = (ChildComponent) => {
    class ComposedComponent extends Component {
        componentDidMount() {
            this.forceRedirect();
        }

        componentDidUpdate() {
            this.forceRedirect();
        }

        forceRedirect() {
            if (!this.props.isAuthenticated) {
                this.props.history.replace('/');
            }
        }

        render() {
            return <ChildComponent {...this.props} />;
        }
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated
        };
    };

    return connect(mapStateToProps)(ComposedComponent);
};

export default requireAuth;