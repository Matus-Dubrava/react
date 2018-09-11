import React from 'react';

import classes from './NavigationItem.css';

const navigationItem = (props) => {
  const style = { 
    backgroundColor: '#8f5c2c',
    borderBottom: '4px solid #40a4c8',
    color: 'white'
  };

  return (
    <li className={classes.NavigationItem}>
      <a 
        // className={props.active ? classes.active : null}
        style={props.active ? style : null}
        href={props.link} >
        {props.children}</a>
    </li>
  );
};

export default navigationItem;