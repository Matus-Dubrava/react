import React from 'react';

import classes from './Backdrop.css';

const backdrop = (props) => {
  let attachedClasses = [classes.Backdrop, classes.hidden];
  if (props.show) {
    attachedClasses = [classes.Backdrop];
  }

  return (
    <div
      onClick={props.clicked}
      className={attachedClasses.join(' ') }>
    </div>
  );
};

export default backdrop;