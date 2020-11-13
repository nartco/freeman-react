import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GameDice from "../components/GameDice";

const Game = () => {
  let { players } = useParams();
  const [playersArray, setPlayersArray] = useState(JSON.parse(players));

  return (
    <div>
      <GameDice />
    </div>
  );
};

export default Game;
