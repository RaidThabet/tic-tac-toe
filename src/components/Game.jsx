/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import Menu from "./Menu";
import Board from "./Board";
import GameOver from "./GameOver";

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(gameLog) {
  let board = [...INITIAL_BOARD.map((innerArray) => [...innerArray])];

  for (const log of gameLog) {
    const { square, playerSymbol } = log;
    const { row, col } = square;
    board[row][col] = playerSymbol;
  }
  return board;
}

function deriveWinner(gameLog, gameBoard) {
  // check rows
  for (let row = 0; row < 3; row++) {
    if (
      gameBoard[row][0] &&
      gameBoard[row][0] === gameBoard[row][1] &&
      gameBoard[row][1] === gameBoard[row][2]
    ) {
      return {
        winner: gameBoard[row][0],
        winningSquares: [
          [row, 0],
          [row, 1],
          [row, 2],
        ],
      };
    }
  }

  // check columns
  for (let col = 0; col < 3; col++) {
    if (
      gameBoard[0][col] &&
      gameBoard[0][col] === gameBoard[1][col] &&
      gameBoard[1][col] === gameBoard[2][col]
    ) {
      return {
        winner: gameBoard[0][col],
        winningSquares: [
          [0, col],
          [1, col],
          [2, col],
        ],
      };
    }
  }

  // check diagonals
  if (
    gameBoard[0][0] &&
    gameBoard[0][0] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][2]
  ) {
    return {
      winner: gameBoard[0][0],
      winningSquares: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    };
  }
  if (
    gameBoard[0][2] &&
    gameBoard[0][2] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][0]
  ) {
    return {
      winner: gameBoard[0][2],
      winningSquares: [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    };
  }

  if (gameLog.length === 9) {
    return { winner: "DRAW", winningSquares: [] };
  }

  return { winner: "NONE", winningSquares: [] };
}

export default function Game() {
  const [gameLog, setGameLog] = useState([]);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [names, setNames] = useState({ X: "Player 1", O: "Player 2" });
  // each element of the array is an object of the following form: { square: { row, col }, playerSymbol }
  // the array is sorted by time (newest selection is at index 0)
  // square: the played square
  // row, col: coordinates of the played square
  // player: the player who chose that square ('X' or 'O')
  const board = deriveGameBoard(gameLog);
  const { winner, winningSquares } = deriveWinner(gameLog, board);
  useEffect(() => {
    if (winner === "X") {
      setScore((currentScore) => ({ ...currentScore, X: currentScore.X + 1 }));
    } else if (winner === "O") {
      setScore((currentScore) => ({ ...currentScore, O: currentScore.O + 1 }));
    }
  }, [winner]);
  let currentPlayer = "X";

  if (gameLog.length > 0) {
    currentPlayer = gameLog[0].playerSymbol === "X" ? "O" : "X";
  }

  function handleNameChange(symbol, newName) {
    if (symbol === "X") {
      setNames((currentNames) => {
        return { ...currentNames, X: newName };
      });
    } else {
      setNames((currentNames) => {
        return { ...currentNames, O: newName };
      });
    }
  }

  function handleReset() {
    setGameLog([]);
  }

  function handleSelect(rowIndex, colIndex) {
    setGameLog((currentGameLog) => {
      return [
        {
          square: { row: rowIndex, col: colIndex },
          playerSymbol: currentPlayer,
        },
        ...currentGameLog,
      ];
    });
    new Audio("../src/assets/draw.mp3").play();
  }

  return (
    <>
      <main>
        {winner === "NONE" && (
          <>
            <Menu
              nameX={names.X}
              nameO={names.O}
              scoreX={score.X}
              scoreO={score.O}
              onNameChange={handleNameChange}
              onReset={handleReset}
              currentPlayer={currentPlayer}
            />
            <Board
              gameBoard={board}
              onSelect={handleSelect}
              winningSquares={winningSquares}
            />
            <span>
              <button onClick={handleReset} id="reset">
                Reset
              </button>
            </span>
          </>
        )}
        {(winner === "DRAW" || winner === "X" || winner === "O") && (
          <GameOver winner={winner} onRestart={handleReset} />
        )}
      </main>
    </>
  );
}
