import React from "react";
import "../About/About.css";

export default function About() {
  return (
    <div className="contenedor-aboutme">
      <div className="fondo-aboutme">
        <div className="contenedor-textos-aboutme">
          <div className="titulo-about">
            <h1>About</h1>
          </div>
          <div className="cuadros1">
            <div className="contenedor-subtexto">
              <div className="about-proyect">
                <h3 className="titulo-about-proyect">Videogames - PI</h3>
                <p className="texto-about">
                  Este proyecto es parte del bootcamp de Full Stack Developer de
                  Soy Henry, esta single page aplicacion(SPA) consume datos de
                  la api de videojuegos. En esta aplicacion vas a poder crear un
                  nuevo videojuego, ordenarlos albafeticamente,por genero y
                  filtrar entre todos los juegos, los traidos por la API o los
                  que vos creates. Si tienes alguna recomendacion de como
                  mejorar esta aplicación no dudes en hacermelo saber por MD en
                  mi LinkedIn (Link al final)
                </p>
              </div>
            </div>
            <div className="contenedor-tecnologias">
              <div className="tecnologias">
                <h3 className="titulo-tecnologias">Tecnologias utilizadas</h3>
                <p className="tecnologias">- HTML</p>
                <p className="tecnologias">- CSS</p>
                <p className="tecnologias">- SASS</p>
                <p className="tecnologias">- JavaScript</p>
                <p className="tecnologias">- React</p>
                <p className="tecnologias">- Redux</p>
                <p className="tecnologias">- Express</p>
                <p className="tecnologias">- PostgreSQL</p>
              </div>
            </div>
          </div>
          <div className="cuadros2">
            <div className="contenedor-sobremi">
              <div className="about-me">
                <h3 className="titulo-sobremi">About Me</h3>
                <p className="texto-sobremi">
                  Me llamo Mateo Mugnaini, tengo 24 años vivo en Córdoba Capital
                  - Argentina
                </p>
              </div>
            </div>
            <div className="contenedor-contacto">
              <div className="contacto-aboutme">
                <h2 className="titulo-contacto">Redes de contacto</h2>
                <a
                  className="botones-link"
                  href="https://github.com/mateo-mugnaini"
                  target="_blank"
                >
                  GitHub
                </a>
                <a
                  className="botones-link"
                  href="https://www.linkedin.com/in/mateo-mugnaini/"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <a
                  className="botones-link"
                  href="https://www.instagram.com/mateo.mugnaini/"
                  target="_blank"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
