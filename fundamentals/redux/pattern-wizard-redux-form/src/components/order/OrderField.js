import React from 'react';

const OrderField = ({ label, input, meta: { touched, error } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} />
            <p className="red-text">{touched && error}</p>
        </div>
    );
};

export default OrderField;
