// @flow

import React from 'react';
import './index.css';
import {Board} from './Board.js';

type Props = {...};

type Record = {|
  squares: Array<string>,
  isXTurn: boolean,
|};

type State = {|
  history: Array<Record>
|};

export class Game extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          isXTurn: true,
        },
      ],
    };
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (current.isXTurn ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares} 
            onClick={(i) => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
  
  handleClick(i: number) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = current.isXTurn ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        isXTurn: !current.isXTurn,
      }]),
    });
  }

  jumpTo(move: number) {
    this.setState({
      history: this.state.history.slice(0, move + 1),
    });
  } 

  calculateWinner(squares: Array<string>) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
}

