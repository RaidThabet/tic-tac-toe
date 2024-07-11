/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from "uuid";

export default function Board({ gameBoard, onSelect }) {
  return (
    <div id="board">
      {gameBoard.map((row, rowIndex) =>
        row.map((squareSymbol, colIndex) => (
          <button
            onClick={(event) => onSelect(rowIndex, colIndex)}
            disabled={squareSymbol ? true : false}
            className={"board-square " + squareSymbol}
            key={uuidv4()}
          >
            {squareSymbol}
          </button>
        ))
      )}
    </div>
  );
}
