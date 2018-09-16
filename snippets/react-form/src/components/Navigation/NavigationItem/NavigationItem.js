import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationitem = (props) => {
  return (
    <li className={classes.NavigationItem} >
      <NavLink 
        {...props}
        activeClassName={classes.Active}
        search={props.queryString}
        to={props.pathname}>{props.linkname}</NavLink>
    </li>
  );
};

export default navigationitem;