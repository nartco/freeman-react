import React from "react";
import ReactDice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";

export default class GameDice extends React.Component {
  render() {
    return (
      <div>
        <ReactDice
          numDice={2}
          rollDone={this.rollDoneCallback}
          disableIndividual={true}
          ref={dice => (this.reactDice = dice)}
        />
        <button onClick={() => this.rollAll()}>x</button>
      </div>
    );
  }

  rollAll() {
    this.reactDice.rollAll();
  }

  rollDoneCallback(num) {
    console.log(`You rolled a ${num}`);
  }
}
