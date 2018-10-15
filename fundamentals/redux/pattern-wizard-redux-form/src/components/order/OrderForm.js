import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

class OrderForm extends Component {
    state = {
        showPage: 0
    };

    renderForm() {
        if (this.state.showPage === 0) {
            return (
                <Page1
                    onContinue={() => this.gotoPage(1)}
                    onCancel={() => {
                        this.props.history.push('/');
                    }}
                />
            );
        } else if (this.state.showPage === 1) {
            return (
                <Page2
                    onContinue={() => this.gotoPage(2)}
                    onCancel={() => {
                        this.gotoPage(0);
                    }}
                />
            );
        } else if (this.state.showPage === 2) {
            return (
                <Page3
                    onContinue={() => {
                        this.props.history.push('/');
                    }}
                    onCancel={() => {
                        this.gotoPage(1);
                    }}
                />
            );
        }
    }

    gotoPage = pageNum => {
        this.setState({
            showPage: pageNum
        });
    };

    render() {
        return (
            <div>
                <Backdrop />
                <Modal>{this.renderForm()}</Modal>
            </div>
        );
    }
}

export default reduxForm({
    form: 'orderForm'
})(OrderForm);
