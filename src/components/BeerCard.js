import React from "react";

const BeerCard = ({ obj, removeFav, addFav }) => {
  return (
    <div className="card" key={obj.id}>
      <div className="myrow">
        {obj.fav ? (
          <i
            className="fas fa-heart right icon "
            id={obj.id}
            onClick={e => removeFav(e.target.id)}
          />
        ) : (
          <i
            className="far fa-heart right icon "
            id={obj.id}
            onClick={e => addFav(e.target.id)}
          />
        )}
      </div>
      <div className="beer-details">
        <div className="img-container">
          <img className="beer-image" src={obj.image_url} alt="beer" />
        </div>
        <div className="beer-name">
          <p className="name">{obj.name}</p>
          <p className="beer-desc">{obj.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BeerCard;
