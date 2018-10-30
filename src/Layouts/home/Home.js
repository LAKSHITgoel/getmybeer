import React from "react";
import Load from "./loading.gif";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20,
      results: [],
      loading: false,
      searching: false,
      search: "".split(" ").join("_")
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getData = async () => {
    // console.log("getData");
    //=============if Search String is empty ===================================
    if (this.state.search === "") {
      // set loading state to true
      await this.setState({ loading: true });
      //send API call to get all the beers on initial HOME page Load
      axios
        .get(`/beers?page=${this.state.page}&per_page=${this.state.limit}`)
        .then(res => res.data)
        .then(data => {
          data.map(obj => {
            return (obj.fav = false);
          });
          //set API responce into results state
          this.setState({ results: this.state.results.concat(data) });
        })
        //set Loading state to false
        .then(() => this.setState({ loading: false }));
    }
    //=============if Search String is Not Empty================================
    if (this.state.search !== "") {
      // set Searching state to true
      await this.setState({ searching: true });
      //send API call to get all the beers on initial HOME page Load
      axios
        .get(
          `/beers?page=${this.state.page}&per_page=${
            this.state.limit
          }&beer_name=${this.state.search}`
        )
        .then(res => res.data)
        //set API responce into results state
        .then(data => this.setState({ results: data }))
        .then(() => {
          // set Searching state to false
          this.setState({ searching: false });
          this.setState({ search: "" });
        });
    }
  };

  //function for adding item to Favourites in App state
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

  //remove favourites from results in App State
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

  componentDidMount() {
    this.setState({ loading: true });
    this.getData();
  }

  async componentWillReceiveProps(nextProps) {
    // checks if scroll postion props has changed to true then
    //send API request for next page when scrolled to bottom
    if (nextProps.scrollToBottom === true) {
      await this.setState({ loading: true });
      await this.setState({ page: this.state.page + 1 });
      await this.getData();
    }
  }

  onSubmit = async e => {
    e.preventDefault();
    this.getData();
  };

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <div className="container">
          <br />
          <br />
          <form onSubmit={this.onSubmit} className="container">
            <div className="input-group">
              <input
                className="form-control form-control-lg input-group-prepend"
                type="text"
                value={this.state.search}
                name="search"
                onChange={this.onChange}
                placeholder="Search a Beer by Name..."
              />
              <input type="submit" className="btn btn-success" value="Search" />
            </div>
          </form>
          <br />
          <br />
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
        </div>
      </div>
    );
  }
}

export default Home;
