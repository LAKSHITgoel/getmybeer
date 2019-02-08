import React from "react";
import BeerCard from "../../components/BeerCard";
import { connect } from "react-redux";
import { addToFav, removeFromFav } from "../../store/actionCreators";

const Favourites = props => {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="results">
          {props.favourites &&
            props.favourites.map(obj => (
              <BeerCard
                key={obj.id}
                addFav={props.addToFav}
                removeFav={props.removeFromFav}
                obj={obj}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  favourites: state.favourites
});

export default connect(
  mapStateToProps,
  { addToFav, removeFromFav }
)(Favourites);
