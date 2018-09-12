import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  let attachedClassed = [classes.SideDrawer, classes.Close];
  if (props.open) { 
    attachedClassed = [classes.SideDrawer, classes.Open]
  }

  return (
    <React.Fragment>
      <Backdrop 
        show={props.open}
        clicked={props.closed} />
      <div className={attachedClassed.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
}

export default sideDrawer;