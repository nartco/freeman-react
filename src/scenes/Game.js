import React, { useState, useEffect } from "react";
import { Container, Row, Form, Button, Table, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import GameDice from "../components/GameDice";

const rules = require("../rules.json");

const Game = () => {
  let { players } = useParams();
  players = JSON.parse(players);
  const [number, setNumber] = useState(0);
  const [freeman, setFreeman] = useState([]);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [round, setRound] = useState(1);
  const [index, setIndex] = useState(0);
  const [rule, setRule] = useState();

  const play = () => {
    if (number === 0) return;
    if (number[0] === number[1]) {
      let text = `${rules.rules2} ${number[0]} gorgées`;
      if (number[0] === 6) {
        text = `${rules.rules3} ${number[0]} gorgées`;
      } else if (number[0] === 3) {
        text = `${rules.rules0} et ${number[0]} gorgées à distribuer`;
      }
      setRule(text);
    } else if (number[0] === 3 || number[1] === 3) {
      let text = `${rules.rules1}`;
      if (number[0] + number[1] === 7) {
        text = `${rules.rules1} sans oublier ${rules.rules4} (${
          players[index === 1 ? Object.keys(players).length : index - 1]
        }) tu bois !`;
      } else if (number[0] + number[1] === 11) {
        text = `${rules.rules1} sans oublier ${rules.rule5} (${
          players[index === Object.keys(players).length ? 1 : index + 1]
        }) tu bois !`;
      } else if (
        (number[0] === 6 && number[1] === 3) ||
        (number[0] === 3 && number[1] === 6)
      ) {
        text = `${rules.rules1} sans oublier les ${rules.rules8}`;
      }
      setRule(text);
    } else if (
      (number[0] === 2 && number[1] === 1) ||
      (number[0] === 1 && number[1] === 2)
    ) {
      setRule(rules.rules0);
    } else if (number[0] + number[1] === 7) {
      let text = `${rules.rules4} (${
        players[index === 1 ? Object.keys(players).length : index - 1]
      }) tu bois !`;
      setRule(text);
    } else if (number[0] + number[1] === 11) {
      let text = `${rules.rules5} (${
        players[index === Object.keys(players).length ? 1 : index + 1]
      }) tu bois !`;
      setRule(text);
    } else if (
      (number[0] === 6 && number[1] === 1) ||
      (number[0] === 1 && number[1] === 6)
    ) {
      setRule(rules.rules6);
    } else if (
      (number[0] === 6 && number[1] === 2) ||
      (number[0] === 2 && number[1] === 6)
    ) {
      setRule(rules.rules7);
    } else if (
      (number[0] === 6 && number[1] === 3) ||
      (number[0] === 3 && number[1] === 6)
    ) {
      setRule(rules.rules8);
    } else {
      if (
        index === Object.keys(players).length &&
        (freeman[freeman.length - 1] === 1 && round !== 1)
      ) {
        setEnd(true);
      } else if (freeman[freeman.length - 1] === index + 1 && round !== 1) {
        setEnd(true);
      } else {
        setRound(round + 1);
        setRule(rules.rules9);
        return index < Object.keys(players).length
          ? setIndex(index + 1)
          : setIndex(1);
      }
    }
  };

  const init = nb => {
    setEnd(false);
    setRound(1);
    let freemanCopy = [...freeman];
    if (number[0] === 3 || number[1] === 3 || number[0] + number[1] === 3) {
      freemanCopy.push(index);
      setFreeman(freemanCopy);
    }
    if (freemanCopy.length !== nb) {
      if (index === Object.keys(players).length) {
        freemanCopy[0] === 1 || freemanCopy[1] === 1
          ? setIndex(2)
          : setIndex(1);
      } else {
        freemanCopy[0] === index + 1 || freemanCopy[1] === index + 1
          ? setIndex(index + 2)
          : setIndex(index + 1);
      }
    } else if (freemanCopy.length === nb) {
      setNumber(0);
      return setStart(true);
    }
  };

  const reset = () => {
    setFreeman([]);
    setNumber(0);
    setStart(false);
    setEnd(false);
    setIndex(0);
    setRule("");
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
      play();
    }
  }, [start, number]);

  return (
    <Container>
  <Row className="justify-content-center">
  {start ? (
        <h1>Freeman</h1>
      ) : (
        <h1>Tour pour choisir le ou les freeman(s) </h1>
      )}
  </Row>
  <Row className="justify-content-center">
  <p className="info">
        {start
          ? null
          : "Celui qui fait un 3 devient freeman | si double 3, double boira ce freeman"}
      </p>
    </Row>
    { freeman.length !== 0 &&
    <Row className="justify-content-center">
    <Table striped bordered hover  hover variant="dark"  size="sm" className="freemanList">
  <thead>
    <tr>
      <th>Liste des freemans</th>
    </tr>
  </thead>
  <tbody>
{freeman.map(i => <tr><td>{players[i]}</td></tr>)}
  </tbody>
</Table>
    
    </Row>
  }
  <Row className="justify-content-center">
   
    <p>{rule}</p>
    </Row>
    <Row className="justify-content-center">
   <p>{`${players[index]} à toi de lancer !`}</p>
    </Row>
    <Row className="justify-content-center">
     {end && (
        <div className="end">
          <p>Le tour est fini !</p>{" "}
          <button onClick={() => reset()}>Changez de freeman(s)</button>{" "}
          <button>résultats</button>
        </div>
      )}
      </Row>
      <Row className="justify-content-center">
     <GameDice setNumber={setNumber} />

  </Row>
</Container>
   
  );
};

export default Game;
