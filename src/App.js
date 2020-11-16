import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Start from "./scenes/Start";
import Game from "./scenes/Game";
import GameOver from "./scenes/GameOver";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/game/:playersData'>
          <Game />
        </Route>
        <Route path='/gameOver'>
          <GameOver />
        </Route>
        <Route path='/'>
          <Start />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
