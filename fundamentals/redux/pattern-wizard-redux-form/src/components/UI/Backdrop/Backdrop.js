import React from 'react';
import { withRouter } from 'react-router-dom';

import './Backdrop.css';

const Backdrop = props => {
    return (
        <div
            onClick={() => {
                props.history.push('/');
            }}
            className="form-backdrop"
        />
    );
};

export default withRouter(Backdrop);
