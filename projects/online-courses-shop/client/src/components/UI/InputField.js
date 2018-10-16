import React from 'react';

const Field = ({ inputProps, label, value, changed, required }) => {
    return (
        <div>
            <label>{label}</label>
            <input
                {...inputProps}
                value={value}
                onChange={changed}
                required={required}
            />
        </div>
    );
};

export default Field;
