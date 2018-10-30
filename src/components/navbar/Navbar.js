import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar(props) {
  return (
    <nav className="navbar fixed-top">
      <div className="left">
        <p className="brand">Beans Loves Beer</p>
      </div>
      <div className="right">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/fav">
          Favourites
        </Link>
      </div>
    </nav>
  );
}
