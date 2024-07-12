/* eslint-disable react/prop-types */
import Player from "./Player";

export default function Menu({
  nameX,
  nameO,
  scoreX,
  scoreO,
  currentPlayer,
  onNameChange,
}) {
  function playerNameChange(symbol, newName) {
    onNameChange(symbol, newName);
  }

  return (
    <div className="menu-container">
      <span id="players">
        <Player
          onChange={playerNameChange}
          score={scoreX}
          active={currentPlayer === "X" ? "playing" : ""}
          playerName={nameX}
          symbol={"X"}
        />
        <Player
          onChange={playerNameChange}
          score={scoreO}
          active={currentPlayer === "O" ? "playing" : ""}
          playerName={nameO}
          symbol={"O"}
        />
      </span>
    </div>
  );
}
