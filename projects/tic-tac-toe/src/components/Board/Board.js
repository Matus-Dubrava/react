import React from 'react';

import classes from './Board.css';
import BoardCell from './BoardCell/BoardCell';

const board = (props) => {
  const cells = Array.from({ length: 9 }).map((cell, i) => {
    const takenBy = props.board[i];

    return (
      <BoardCell 
        id={i}
        key={i}
        takenBy={takenBy}
        clicked={props.chooseCell} />
    );
  });

  return (
    <div
      className={classes.Board} >
        {cells}
    </div>
  );  
};

export default board;