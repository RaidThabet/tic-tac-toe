/* eslint-disable react/prop-types */
import { useState } from "react";
export default function Player({
  playerName,
  symbol,
  active,
  score,
  onChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(playerName);

  function handleClick() {
    if (isEditing) {
      onChange(symbol, name);
    }
    setIsEditing(!isEditing);
  }

  function handleChange(event) {
    const { value } = event.target;
    setName(value);
  }

  return (
    <span className={"player " + active}>
      {!isEditing && (
        <p className="player-name">
          {name.toUpperCase()} <br /> {score}
        </p>
      )}
      {isEditing && (
        <input
          className="player-name"
          type="text"
          value={name}
          onChange={handleChange}
        />
      )}
      <p className={"player-symbol " + symbol}>{symbol}</p>
      <button onClick={handleClick}>{isEditing ? "SAVE" : "EDIT"}</button>
    </span>
  );
}
