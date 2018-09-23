import React from 'react';

import './Backdrop.css';

const backdrop = (props) => {
    let overlay = null;
    if (props.show) {
        overlay = <div className="Backdrop"></div>;
    }

    return (
        <React.Fragment>
            {overlay}
        </React.Fragment>
    );
};

export default backdrop;