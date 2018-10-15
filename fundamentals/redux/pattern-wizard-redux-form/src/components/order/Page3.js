import React from 'react';
import { connect } from 'react-redux';

import page1Fields from './page1Fields';
import page2Fields from './page2Fields';

const Page3 = props => {
    const page1Review = page1Fields.map(field => (
        <div key={field.name}>
            <label>{field.name}</label>
            <div>{props.orderFormValues[field.name]}</div>
        </div>
    ));

    const page2Review = page2Fields.map(field => (
        <div key={field.name}>
            <label>{field.name}</label>
            <div>{props.orderFormValues[field.name]}</div>
        </div>
    ));

    return (
        <div>
            <h5>3/3</h5>
            <h4>Finalize Order</h4>
            {page1Review}
            {page2Review}
            <button
                onClick={props.onCancel}
                type="button"
                className="btn red darken3 white-text left"
            >
                <i className="material-icons left">arrow_back</i>
                Back
            </button>
            <button
                onClick={props.onContinue}
                type="button"
                className="btn tiel white-text right"
            >
                <i className="material-icons right">done</i>
                Send Order
            </button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        orderFormValues: state.form.orderForm.values
    };
};

export default connect(mapStateToProps)(Page3);
