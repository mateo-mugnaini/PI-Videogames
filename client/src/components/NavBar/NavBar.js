import React from "react";
import Searchbar from "./Searchbar/Searchbar";
import "../NavBar/NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="contenedor-navbar">
        <div className="div-Btn-NV">
          <Link className="btn-NV" to="/home">
            <p> HOME </p>{" "}
          </Link>
        </div>
        <div>
          <Searchbar />
        </div>
        <div className="div-Btn-NV">
          <Link className="btn-NV" to="/gamecreated">
            <p> GAME CREATE </p>{" "}
          </Link>
        </div>
        <div className="div-Btn-NV">
          <Link className="btn-NV" to="/">
            <p> Exit </p>{" "}
          </Link>
        </div>
      </div>
    </nav>
  );
}
