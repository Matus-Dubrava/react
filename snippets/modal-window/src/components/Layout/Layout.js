import React, { Component } from 'react';

import Modal from '../UI/Modal/Modal';
import classes from './Layout.css';

class Layout extends Component {
  state = {
    showModal: false
  }

  toggleModalHandler = () => {
    this.setState((prevState) => {
      return { showModal: !prevState.showModal };
    });
  }

  closeModalHandler = () => {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          closeModal={this.closeModalHandler} 
          show={this.state.showModal} />
        <div className={classes.Layout}>
          <button
            onClick={this.toggleModalHandler} >
            SHOW MODAL
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;