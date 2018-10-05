import React, { Component } from 'react';
import { connect } from 'react-redux';

const requireAuth = (ChildComponent) => {
    class ComposedComponent extends Component {
        componentDidMount() {
            if (!this.props.authenticated) {
                this.forceRedirect();
            }
        }

        componentDidUpdate() {
            if (!this.props.authenticated) {
                this.forceRedirect();
            }
        }

        forceRedirect() {
            this.props.history.replace('/');
        }

        render() {
            return <ChildComponent {...this.props} />;
        }
    }

    const mapStateToProps = (state) => {
        return {
            authenticated: state.auth.authenticated
        };
    };

    return connect(mapStateToProps)(ComposedComponent)
};

export default requireAuth;