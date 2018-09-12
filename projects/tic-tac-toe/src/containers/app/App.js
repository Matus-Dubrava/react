import React, { Component } from 'react';

import classes from './App.css';
import Board from '../../components/Board/Board';
import Controls from '../../components/Controls/Controls';
import Modal from '../../components/UI/Modal/Modal';

const ROWS = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
const COLS = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
const DIAG = [[0, 4, 8], [2, 4, 6]];

class App extends Component {
  state = {
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    playerTurn: 1,
    fstPlayerScore: 0,
    sndPlayerScore: 0,
    finished: false,
    winner: 0
  };

  checkCells(board, ids) {
    let winner = 0;
 
    const takenBy = ids.map((id) => board[id]);
    if (takenBy.every((pos) => pos === 1)) { winner = 1; }
    if (takenBy.every((pos) => pos === 2)) { winner = 2; }

    return winner;
  }

  checkGameState(board) {
    const winningOptions = [...ROWS, ...COLS, ...DIAG];
    let winner = 0;
  
    winningOptions.forEach((opt) => {
      if (winner === 0) {
        winner = this.checkCells(board, opt);
      }
    });

    return winner;
  }

  chooseCellHandler = (id) => {
    if (this.state.finished) {
      alert('Game has finished, press continue to start a new game');
    } else if (this.state.board[id] === 0) {
      this.setState((prevState) => {
        const board = [...prevState.board];
        board[id] = prevState.playerTurn;
        const playerTurn = prevState.playerTurn === 1 ? 2 : 1;
        
        const winner = this.checkGameState(board);
        let fstPlayerScore = prevState.fstPlayerScore;
        let sndPlayerScore = prevState.sndPlayerScore;
        let finished = prevState.finished;

        if (winner !== 0) {
          finished = true;
        }
        if (winner === 1) { fstPlayerScore++; }
        if (winner === 2) { sndPlayerScore++; }

        if (!board.some((id) => id === 0)) { finished = true; }

        return { 
          board, 
          playerTurn, 
          fstPlayerScore, 
          sndPlayerScore,
          finished,
          winner
        };
      });
    } else {
      alert('Cell is already taken');
    }
  };

  newGameHandler = () => {
    this.setState({ 
      board: this.state.board.map((v) => 0),
      finished: false,
      winner: 0 
    });
  };

  resetScoreHandler = () => {
    this.setState({
      board: this.state.board.map((v) => 0),
      finished: false,
      fstPlayerScore: 0,
      sndPlayerScore: 0,
      winner: 0
    });
  }

  render() {
    let winner = 'DRAW';
    if (this.state.winner === 1) { winner = 'WINNER: player 1'; }
    if (this.state.winner === 2) { winner = 'WINNER: player 2'; }

    return (
      <React.Fragment>
        <Modal
          show={this.state.finished} >
          <h2
            className={classes.modalTitle} >
            {winner}
          </h2>
          <button
            className={classes.contBtn}
            onClick={this.newGameHandler} >
            CONTINUE
          </button>
        </Modal>
        <div className={classes.App}>
          <Controls 
            resetScore={this.resetScoreHandler}
            fstPlayerScore={this.state.fstPlayerScore}
            sndPlayerScore={this.state.sndPlayerScore}
            playerTurn={this.state.playerTurn} />
          <Board 
            board={this.state.board}
            chooseCell={this.chooseCellHandler} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
