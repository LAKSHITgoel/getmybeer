import React from "react";
// import Loader from "../../components/Loader";
import BeerCard from "../../components/BeerCard";
import { connect } from "react-redux";
import {
  getBeer,
  addToFav,
  searchBeer,
  removeFromFav
} from "../../store/actionCreators";
// import axios from "axios";

class Home extends React.Component {
  state = { search: "", page: 1, scrollToBottom: false };

  componentDidMount() {
    //adding Event Listener for scrolling event for Infinite Scrolling and paging
    window.onscroll = e => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // you're at the bottom of the page
        this.setState({ page: this.state.page + 1 }, () => {
          this.props.getBeer(this.state.page);
        });
      }
    };
    this.props.getBeer(this.state.page);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

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
          <form
            onSubmit={() =>
              this.srchBeer(this.state.search.split(" ").join("_"))
            }
            className="container"
          >
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
            <div className="results">
              {this.props.beers &&
                this.props.beers.map(obj => (
                  <BeerCard
                    key={obj.id}
                    addFav={this.props.addToFav}
                    removeFav={this.props.removeFromFav}
                    obj={obj}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  beers: state.beers
});

export default connect(
  mapStateToProps,
  { getBeer, addToFav, searchBeer, removeFromFav }
)(Home);
