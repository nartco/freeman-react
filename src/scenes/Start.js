import React, { useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Container, Row, Form, Button } from "react-bootstrap";

import "../css/start.css";

const Start = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState({});
  const [inputPlayer, setInputPlayer] = useState([]);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const inputHandler = useCallback(
    (name, id) => {
      let playersCopy = players;
      playersCopy[id] = name;
      return setPlayers(playersCopy);
    },
    [players]
  );

  const init = useCallback(() => {
    let InputPlayersCopy = [];
    for (let i = 0; i < 4; i++) {
      InputPlayersCopy.push(
        <Form.Group controlId='formBasicEmail' key={i}>
          <Form.Control
            type='text'
            placeholder={`joueur ${i + 1}`}
            onChange={e => inputHandler(e.target.value, i + 1)}
          />
        </Form.Group>
      );
      if (i === 4) setIsLoading(false);
    }
    return setInputPlayer(InputPlayersCopy);
  }, [inputHandler]);

  const addPlayer = e => {
    const index = inputPlayer.length + 1;
    e.preventDefault();
    if (players.length === 12) return;
    setInputPlayer([
      ...inputPlayer,
      <Form.Group controlId='formBasicEmail' key={index}>
        <Form.Control
          type='text'
          placeholder={`joueur ${index}`}
          onChange={e => inputHandler(e.target.value, index)}
        />
      </Form.Group>
    ]);
  };

  const formHandler = e => {
    e.preventDefault();
    setError(false);
    if (Object.keys(players).length < 4) setError(true) else {

        let playersCopy = players;
        for (const [key, value] of Object.entries(playersCopy)) {
          value.trim() !== ""
            ? (playersCopy[key] = value.trim().toLowerCase())
            : setError(true);
        }
        setPlayers(playersCopy);
    }
    if (!error) {
      return setRedirect(true);
    }
  };
  console.log(error);

  useEffect(() => {
    init();
  }, [init]);

  if (redirect) {
    return <Redirect push to={`/game/${JSON.stringify(players)}`} />;
  }

  return (
    <Container>
      {isLoading === true ? (
        <p>loading</p>
      ) : (
        <React.Fragment>
          <h1 className='title'>Entrez le nom des joueurs</h1>
          <p className={error ? "informationFormError" : "informationForm"}>
            4 joueurs minimum
          </p>

          <Form className='startForm' onSubmit={formHandler}>
            {inputPlayer}
            {
              <Button variant='primary' onClick={e => addPlayer(e)}>
                +
              </Button>
            }

            <Row className='justify-content-md-center'>
              <Button variant='primary' type='submit'>
                C'est parti !
              </Button>
            </Row>
          </Form>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Start;
