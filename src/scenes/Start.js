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
    for (let i = 0; i < 3; i++) {
      InputPlayersCopy.push(
        <Form.Group controlId='formBasicEmail' key={i}>
          <Form.Control
            autoComplete='off'
            type='text'
            placeholder={`joueur ${i + 1}`}
            onChange={e => inputHandler(e.target.value, i + 1)}
          />
        </Form.Group>
      );
      if (i === 3) setIsLoading(false);
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
          autoComplete='off'
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
    if (Object.keys(players).length < 3) {
      setError(true);
    } else {
      let playersCopy = players;
      let error = false;
      for (const [key, value] of Object.entries(playersCopy)) {
        value.trim() !== ""
          ? (playersCopy[key] = value.trim().toLowerCase())
          : (error = true);
      }
      setError(error);
      setPlayers(playersCopy);
      if (!error) return setRedirect(true);
    }
  };

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
          <h1 className='title'>Freeman</h1>
          <h2 className='title'>Entrez le nom des joueurs</h2>
          <p className={error ? "informationFormError" : "informationForm"}>
            3 joueurs minimum
          </p>

          <Form className='startForm' onSubmit={formHandler}>
            {inputPlayer}
            <Row className='justify-content-center'>
              <Button
              style={{backgroundColor:"rgb(27 27 27)", borderColor: "rgba(39, 170, 54, 0.8)", borderWidth: 5, color: '#29a936', fontWeight: 'bolder', boxShadow: "1px 3px 5px 6px rgba(0,0,0,0.58)"}}
                variant='primary'
                onClick={e => addPlayer(e)}
                className='addButton'
              >
                +
              </Button>
            </Row>

            <Row className='justify-content-center'>
              <Button variant='primary' type='submit' style={{backgroundColor:"rgb(27 27 27)", borderColor: "rgba(39, 170, 54, 0.8)", borderWidth: 5, color: '#29a936', fontWeight: 'bolder', boxShadow: "1px 3px 5px 6px rgba(0,0,0,0.58)"}}>
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
