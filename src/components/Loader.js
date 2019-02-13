import React from "react";
import Load from "./loading.gif";

const Loader = WrappedComponent => {
  return props =>
    props.beers.length === 0 ? (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="loader">
          <img src={Load} className="loading" alt="loading" />
        </div>
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
};

export default Loader;
