/* eslint-disable react/prop-types */
export default function GameOver({ winner, onRestart }) {
  return (
    <div className="game-over">
      <h1>GAME OVER!</h1>
      {winner === "DRAW" ? (
        <p>GAME ENDED WITH A DRAW.</p>
      ) : (
        <p>{winner} WON!</p>
      )}
      <button onClick={onRestart}>RESTART</button>
    </div>
  );
}
