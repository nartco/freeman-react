import React from "react";
import ReactDice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";

export default class GameDice extends React.Component {
  constructor(props) {
    super(props);
    this.rollDoneCallback = this.rollDoneCallback.bind(this);
    this.state = {disabled: false};

  }

  render() {
    return (
      <div>
        <ReactDice
          numDice={2}
          rollDone={this.rollDoneCallback}
          disableIndividual={true}
          ref={dice => (this.reactDice = dice)}
        />
        <button disabled={this.state.disabled} onClick={() => this.rollAll()}>Lancer</button>
      </div>
    );
  }

  rollAll() {
    this.setState({disabled: true});
    this.reactDice.rollAll();
    setTimeout(() => { this.setState({disabled: false}); }, 2000);
  }

  rollDoneCallback(num, arrayNum) {
    this.props.setNumber(arrayNum);
  }
}
