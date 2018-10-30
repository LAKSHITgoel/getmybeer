import React, { Component } from "react";
import Load from "./loading.gif";
import axios from "axios";

export default class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      results: [],
      favourites: this.props.favourites
    };
  }

  //Get Favourites Item when the component mounts
  async componentDidMount() {
    const { favourites } = this.state;
    //set loading state to true
    this.setState({ loading: true });
    favourites.map(id => {
      axios
        .get(`https://api.punkapi.com/v2/beers/${Number(id)}`)
        .then(res => {
          res.data[0].fav = true;
          return res.data;
        })
        .then(data => {
          this.setState({ results: this.state.results.concat(data) });
        });
    });
    //set Loading state to false
    await this.setState({ loading: false });
  }

  //add item to favourites
  addToFav = e => {
    const { results } = this.state;
    let arr = results.map(obj => {
      if (Number(obj.id) === Number(e.target.id)) {
        return { ...obj, fav: true };
      } else {
        return obj;
      }
    });
    this.setState({ results: arr });
    this.props.addFav(e.target.id);
  };

  //delete item from favourites
  removeFromFav = e => {
    const { results } = this.state;
    let arr = results.map(obj => {
      if (Number(obj.id) === Number(e.target.id)) {
        return { ...obj, fav: false };
      } else {
        return obj;
      }
    });
    this.setState({ results: arr });
    this.props.removeFav(e.target.id);
  };

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container">
          {
            <div>
              {this.state.loading && (
                <div className="loader">
                  <img src={Load} className="loading" alt="loading" />
                </div>
              )}
              <div className="results">
                {this.state.results.map(obj => {
                  return (
                    <div className="card" key={obj.id}>
                      <div className="myrow">
                        {obj.fav ? (
                          <i
                            className="fas fa-heart right icon "
                            id={obj.id}
                            onClick={this.removeFromFav}
                          />
                        ) : (
                          <i
                            className="far fa-heart right icon "
                            id={obj.id}
                            onClick={this.addToFav}
                          />
                        )}
                      </div>
                      <div className="beer-details">
                        <div className="img-container">
                          <img
                            className="beer-image"
                            src={obj.image_url}
                            alt="beer"
                          />
                        </div>
                        <div className="beer-name">
                          <p className="name">{obj.name}</p>
                          <p className="beer-desc">{obj.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
