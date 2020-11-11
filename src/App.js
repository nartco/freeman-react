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
        <Route path='/'>
          <Start />
        </Route>
        <Route path='/game/:players'>
          <Game />
        </Route>
        <Route path='/gameOver'>
          <GameOver />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
