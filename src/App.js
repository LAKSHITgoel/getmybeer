import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./Layouts/home/Home";
import Favourites from "./Layouts/favoutites/Favourites";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: [],
      scrollToBottom: false
    };
  }

  componentDidMount() {
    //adding Event Listener for scrolling event for Infinite Scrolling and paging
    window.onscroll = e => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // you're at the bottom of the page
        this.setState({ scrollToBottom: true });
      } else {
        this.setState({ scrollToBottom: false });
      }
    };
  }

  //remove favourites from state
  removeFav = async id => {
    let arr = await this.state.favourites.filter(item => item !== id);
    this.setState({ favourites: arr });
  };

  //add favourites into state
  addFav = async id => {
    await this.setState({ favourites: [...this.state.favourites, id] });
  };

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
                  {...this.state}
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
                  {...this.state}
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
