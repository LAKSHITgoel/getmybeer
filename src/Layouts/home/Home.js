import React from "react";
import axios from "axios";
import withScroll from "../../components/withscroll/withScroll";
import Load from "./loading.gif";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20,
      search: "".split(" ").join("_"),
      results: [],
      loading: false,
      searching: false
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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

  getData = async () => {
    //=============if Search String is empty ===================================
    if (this.state.search === "") {
      await this.setState({ loading: true });
      axios
        .get(`/beers?page=${this.state.page}&per_page=${this.state.limit}`)
        .then(res => res.data)
        .then(data => {
          data.map(obj => {
            return (obj.fav = false);
          });
          this.setState({ results: this.state.results.concat(data) });
        })
        .then(() => this.setState({ loading: false }));
    }
    //=============if Search String is Not Empty================================
    if (this.state.search !== "") {
      await this.setState({ searching: true });
      axios
        .get(
          `/beers?page=${this.state.page}&per_page=${
            this.state.limit
          }&beer_name=${this.state.search}`
        )
        .then(res => res.data)
        .then(data => this.setState({ results: data }))
        .then(() => {
          this.setState({ searching: false });
          this.setState({ search: "" });
        });
    }
  };

  componentDidMount() {
    this.getData();
    console.log("scroll position", this.props.scrollPosition);
  }

  async componentWillReceiveProps(nextProps) {
    console.log("new scroll", nextProps.scrollPosition);
    if (nextProps.scrollPosition > 1500) {
      await this.setState({ loading: true });
      await this.setState({ page: this.state.page + 1 });
      this.getData();
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

export default withScroll(Home);
