import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./Layouts/home/Home";
import Favourites from "./Layouts/favoutites/Favourites";
import axios from "axios";
import { store } from "./store";
import { GET_BEERS } from "./store/constants";

class App extends React.Component {
  state = { search: "", page: 1, scrollToBottom: false };

  componentDidMount() {
    //adding Event Listener for scrolling event for Infinite Scrolling and paging
    window.onscroll = e => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // you're at the bottom of the page
        this.setState({ page: this.state.page + 1 }, () => {
          this.getBeer(this.state.page);
        });
      }
    };
    console.log("hoem");
    this.getBeer(this.state.page);
  }

  getBeer = async page => {
    axios
      .get(`/beers?page=${page}&per_page=20`)
      .then(res => res.data)
      .then(data => {
        data.map(obj => {
          return (obj.fav = false);
        });
        // this.props.getBeer(data);
        store.dispatch({
          type: GET_BEERS,
          payload: {
            beers: [...data]
          }
        });
      });
  };

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
