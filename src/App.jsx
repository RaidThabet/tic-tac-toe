/* eslint-disable no-unused-vars */
import { useState } from "react";
import Header from "../components/Header";
import Game from "../components/Game";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Game />
    </div>
  );
}

export default App;
