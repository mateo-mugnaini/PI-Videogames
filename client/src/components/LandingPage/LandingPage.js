//imports
import React from "react";
import { Link } from "react-router-dom";
import "../LandingPage/LandingPage.css";

//codigo

export default function LandingPage() {
  return (
    <div className="container-LandingPage">
      <div className="container-Textos">
        <div className="btn">
          <Link className="botonIngreso" to={"/home"}>
            <h1> start </h1>
          </Link>
        </div>
        <div className="texto-Landing">
          <h1> VIDEOGAMES </h1>
          <a
            className="link"
            href="https://www.linkedin.com/in/mateo-mugnaini"
            target="_blank"
            rel="noreferrer"
          >
            <h2> By Mateo Mugnaini </h2>
          </a>
        </div>
      </div>
    </div>
  );
}
