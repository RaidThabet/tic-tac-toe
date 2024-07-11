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
      return gameBoard[row][0];
    }
  }

  // check columns
  for (let col = 0; col < 3; col++) {
    if (
      gameBoard[0][col] &&
      gameBoard[0][col] === gameBoard[1][col] &&
      gameBoard[1][col] === gameBoard[2][col]
    ) {
      return gameBoard[0][col];
    }
  }

  // check diagonals
  if (
    gameBoard[0][0] &&
    gameBoard[0][0] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][2]
  ) {
    return gameBoard[0][0];
  }
  if (
    gameBoard[0][2] &&
    gameBoard[0][2] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][0]
  ) {
    return gameBoard[0][2];
  }

  if (gameLog.length === 9) {
    return "DRAW";
  }

  return "NONE";
}

export default function Game() {
  const [gameLog, setGameLog] = useState([]);
  const [score, setScore] = useState({ X: 0, O: 0 });
  // each element of the array is an object of the following form: { square: { row, col }, playerSymbol }
  // the array is sorted by time (newest selection is at index 0)
  // square: the played square
  // row, col: coordinates of the played square
  // player: the player who chose that square ('X' or 'O')
  const board = deriveGameBoard(gameLog);
  const winner = deriveWinner(gameLog, board);
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
              scoreX={score.X}
              scoreO={score.O}
              onReset={handleReset}
              currentPlayer={currentPlayer}
            />
            <Board gameBoard={board} onSelect={handleSelect} />
          </>
        )}
        {(winner === "DRAW" || winner === "X" || winner === "O") && (
          <GameOver winner={winner} onRestart={handleReset} />
        )}
      </main>
    </>
  );
}
