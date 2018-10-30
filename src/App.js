import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./Layouts/home/Home";
import Favourites from "./Layouts/favoutites/Favourites";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: []
    };
  }

  removeFav = id => {
    let arr = this.state.favourites.filter(item => item !== id);
    this.setState({ favourites: arr });
  };

  addFav = id => {
    this.setState({ favourites: [...this.state.favourites, id] });
  };

  // removeFav = id => {
  //   this.setState({favourites:})
  // }

  render() {
    return (
      <div className="beer-app">
        <Router>
          <div>
            <Navbar />
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  addFav={this.addFav}
                  removeFav={this.removeFav}
                  {...this.props}
                />
              )}
            />
            <Route
              exact
              path="/fav"
              render={() => (
                <Favourites
                  addFav={this.addFav}
                  removeFav={this.removeFav}
                  {...this.props}
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
