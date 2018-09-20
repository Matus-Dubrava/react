import React from 'react';

import classes from './Hero.css';

const hero = (props) => {
  return (
    <section className={classes.Hero}>
      <header className={classes.HeroHeader}>
        <p>{props.email}</p>
        <button
          onClick={props.onLogout}>Logout</button>
      </header>
    </section>
  );
};

export default hero;