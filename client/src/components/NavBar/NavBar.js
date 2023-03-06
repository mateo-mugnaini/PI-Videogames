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
            <p> Home </p>
          </Link>
        </div>
        <div className="boton-aboutme">
          <div className="div-Btn-NV">
            <Link className="btn-NV" to="/about">
              <p> About </p>
            </Link>
            {/* <a
            className="btn-NV"
            href="https://www.linkedin.com/in/mateo-mugnaini/"
            target="_blank"
            rel="noreferrer"
          >
            <p> Linkedin </p>
          </a> */}
          </div>
        </div>
        <div>
          <Searchbar />
        </div>
        <div className="div-Btn-NV">
          <Link className="btn-NV" to="/gamecreate">
            <p> Create Game </p>
          </Link>
        </div>
        <div className="div-Btn-NV">
          <Link className="btn-NV-Exit" to="/">
            <p> Exit </p>
          </Link>
        </div>
      </div>
    </nav>
  );
}
