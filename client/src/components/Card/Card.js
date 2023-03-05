import React from "react";
import { Link } from "react-router-dom";
import "../Card/Card.css";

export default function Card(props) {
  return (
    <div className="contenedor-general-card">
      <div className="fondo-card">
        <div className="contenedor-card"></div>
        <Link to={`/detalle/${props.id}`}>
          <div className="img-card">
            <img
              className="img"
              src={props.background_image}
              alt={props.nombre}
            />
          </div>
        </Link>
        <div className="contenedor-textos">
          <div className="titulo">
            <div className="nombre">
              <h2>{props.nombre}</h2>
            </div>
          </div>
          <div className="generos">
            <h3>Generos: {props.generos}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
