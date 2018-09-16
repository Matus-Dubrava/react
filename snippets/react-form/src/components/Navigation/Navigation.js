import React from 'react';

import classes from './Navigation.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigation = (props) => {
  return (
    <nav className={classes.Navigation} >
      <ul>
        <NavigationItem linkname='Home' pathname='/' exact />
        <NavigationItem linkname='Form' pathname='/users' />
      </ul> 
    </nav>
  );
};

export default navigation;