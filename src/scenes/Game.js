import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GameDice from "../components/GameDice";

const Game = () => {
  let { playersData } = useParams();
  const [players, setPlayers] = useState(JSON.parse(playersData));
  const [number, setNumber] = useState(0);
  const [freeman, setFreeman] = useState([]);
  const [start, setStart] = useState(false);
  const [index, setIndex] = useState(0);
  const init = () => {
    if (number[0] === 3 || number[1] === 3 || number[0] + number[1] === 3) {
      setFreeman(freeman.concat(index));
    } else if (number[0] === 3 && number[1] === 3) {
      setFreeman(freeman.concat(index));
    }
    if (index < Object.keys(players).length) {
      setIndex(index + 1);
    } else {
      setIndex(1);
    }
  };

  useEffect(() => {
    if (
      !start &&
      ((Object.keys(players).length < 5 && freeman.length === 1) ||
        (Object.keys(players).length < 7 && freeman.length === 2) ||
        (Object.keys(players).length > 6 && freeman.length === 3))
    ) {
      setStart(true);
    } else if (!start) {
      init();
    } else if (start) {
      console.log("bueno");
    }
  }, [start, number, freeman]);


  return (
    <div>
      <p>{`${players[index]} à toi de lancer !`}</p>
      <GameDice setNumber={setNumber} />
    </div>
  );
};

export default Game;
