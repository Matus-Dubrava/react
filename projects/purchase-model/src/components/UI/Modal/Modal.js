import React from 'react';

import './Modal.css';

const modal = (props) => {
    let modal = null;
    if (props.show) {
        modal = <div className="Modal">{props.children}</div>;
    }

    return (
        <React.Fragment>
            {modal}
        </React.Fragment>    
    );
};

export default modal;