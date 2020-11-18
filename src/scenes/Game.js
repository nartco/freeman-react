import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import GameDice from "../components/GameDice";

const Game = () => {
  let { playersData } = useParams();
  const [players, setPlayers] = useState(JSON.parse(playersData));
  const [number, setNumber] = useState(0);
  const [freeman, setFreeman] = useState([]);
  const [start, setStart] = useState(false);
  const [index, setIndex] = useState(0);


  const init = nb => {
    console.log(nb);
    let freemanCopy = [...freeman];
    if (number[0] === 3 || number[1] === 3 || number[0] + number[1] === 3) {
      freemanCopy.push(index);
      setFreeman(freemanCopy);
    }
    index < Object.keys(players).length ? setIndex(index + 1) : setIndex(1);
    return freemanCopy.length === nb ? setStart(true) : setStart(false);
  };

  useEffect(() => {
    if (!start && Object.keys(players).length <= 4) init(1);
    else if (
      !start &&
      (Object.keys(players).length >= 5 && Object.keys(players).length <= 6)
    )
      init(2);
    else if (!start && Object.keys(players).length >= 7) init(3);
    else {
      console.log("fini");
    }
  }, [start, number]);

  console.log({ start }, { freeman });

  return (
    <div>
      <p>{freeman.map(i => players[i])}</p>
      <p>{`${players[index]} à toi de lancer !`}</p>
      <GameDice setNumber={setNumber} />
    </div>
  );
};

export default Game;
