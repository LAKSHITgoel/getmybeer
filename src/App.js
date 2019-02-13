import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./Layouts/home/Home";
import Favourites from "./Layouts/favoutites/Favourites";

class App extends React.Component {
  render() {
    return (
      <div className="beer-app">
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/fav" render={() => <Favourites />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
