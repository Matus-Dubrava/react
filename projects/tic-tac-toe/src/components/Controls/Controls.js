import React from 'react';

import classes from './Controls.css';

const controls = (props) => {
  return (
    <div
      className={classes.Controls} >
      <div>
        Current Player: {props.playerTurn}
      </div>
      <ul>
        <li>SCORE</li>
        <li>Player 1: {props.fstPlayerScore}</li>
        <li>Player 2: {props.sndPlayerScore}</li>
      </ul>
      <button
        onClick={props.resetScore} >
        RESET
      </button>
    </div>
  );
};

export default controls;