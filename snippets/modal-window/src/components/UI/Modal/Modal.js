import React from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
  let attachedClasses = [classes.Modal, classes.Close];
  if (props.show) {
    attachedClasses = [classes.Modal, classes.Open];
  }

  return (
    <React.Fragment>
      <Backdrop
        clicked={props.closeModal} 
        show={props.show} />
      <div 
        className={attachedClasses.join(' ')} >
        <div>
          Here some content for modal window.
        </div>
        <button
          className={classes.btnClose}
          onClick={props.closeModal} >
          cancel
        </button>
      </div>
    </React.Fragment>
  );
}

export default modal;