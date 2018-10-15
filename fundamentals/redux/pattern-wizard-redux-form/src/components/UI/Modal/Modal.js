import React from 'react';

import './Modal.css';

const Modal = props => {
    return <div className="form-modal">{props.children}</div>;
};

export default Modal;
