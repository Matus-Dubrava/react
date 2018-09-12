import React, { Component } from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate() {
    console.log('Modal will update');
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop 
          clicked={this.props.purchaseCancelHandler}
          show={this.props.show} />
        <div 
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
          className={classes.Modal} >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
};

export default Modal;