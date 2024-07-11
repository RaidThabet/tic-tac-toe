/* eslint-disable react/prop-types */
import Player from "./Player";

export default function Menu({ scoreX, scoreO, onReset, currentPlayer }) {
  return (
    <div className="menu-container">
      <span id="players">
        <Player
          score={scoreX}
          active={currentPlayer === "X" ? "playing" : ""}
          initialName={"Player 1"}
          symbol={"X"}
        />
        <Player
          score={scoreO}
          active={currentPlayer === "O" ? "playing" : ""}
          initialName={"Player 2"}
          symbol={"O"}
        />
      </span>
      {/* <span>
        <button onClick={onReset} id="reset">
          Reset
        </button>
      </span> */}
    </div>
  );
}
