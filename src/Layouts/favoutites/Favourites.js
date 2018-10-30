import React, { Component } from "react";
import Load from "./loading.gif";

export default class Favourites extends Component {
    constructor(props){
        super(props);
        this.state={
            searching:false,
            results:[]
        }
    }

    componentDidMount(){
        
    }

    addToFav = e => {
        const { results } = this.state;
        let obj = { ...results[e.target.id - 1], fav: true };
        // console.log("cdc", obj);
        let arr = results;
        arr[e.target.id - 1] = obj;
        console.log(arr);
        this.setState({ results: arr });
        this.props.addFav(e.target.id);
      };
    
      removeFromFav = e => {
        const { results } = this.state;
        let obj = { ...results[e.target.id - 1], fav: false };
        // console.log("cdc", obj);
        let arr = results;
        arr[e.target.id - 1] = obj;
        console.log(arr);
        this.setState({ results: arr });
        this.props.removeFav(e.target.id);
      };

  render() {
    return (
      <div className="container">
        {this.state.searching ? (
          <div className="loader">
            <img src={Load} className="loading" alt="loading" />
          </div>
        ) : (
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
            {this.state.loading && (
              <div className="loader">
                <img src={Load} className="loading" alt="loading" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
