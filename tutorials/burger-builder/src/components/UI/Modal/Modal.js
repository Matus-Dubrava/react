import React from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
  return (
  <React.Fragment>
    <Backdrop 
      purchaseCancelHandler={props.purchaseCancelHandler}
      show={props.show} />
    <div 
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
      className={classes.Modal} >
      {props.children}
    </div>
  </React.Fragment>
  );
};

export default modal;