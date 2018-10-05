import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

class Signout extends Component {
    componentDidMount() {
        this.props.onSignout();
    }

    render() {
        return <div>Sorry to see you go!</div>;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignout: () => dispatch(actions.signout())
    };
};

export default connect(null, mapDispatchToProps)(Signout);