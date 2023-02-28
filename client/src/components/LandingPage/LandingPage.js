//imports
import React from "react";
import { Link } from "react-router-dom";
import "../LandingPage/LandingPage.css";

//codigo

export default function LandingPage() {
  return (
    <div className="container-LandingPage">
      <div className="container-Textos">
        <div className="container-Text">
          <div>
            <Link className="botonIngreso" to={"/home"}>
              <h1> Bienvenidos </h1>
            </Link>
          </div>
          <div className="texto-Landing">
            <h1> API VIDEOGAMES </h1>
            <h2> By Mateo Mugnaini </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
