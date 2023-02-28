import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import "../Cards/Cards.css";

export default function Cards() {
  /* CARD */
  const games = useSelector((state) => state?.videogames);

  /* PAGINADO */

  const [numeroPagina, setNumeroPagina] = useState(1);

  const grupo = 15;
  const conteoFinal = numeroPagina * grupo;
  const conteoInicial = conteoFinal - grupo;

  const game =
    games && games.slice ? games.slice(conteoInicial, conteoFinal) : [];

  return (
    <div className="contenedor-general">
      <div className="contenedor-card">
        {game.length > 0 &&
          game.map((e) => {
            const gamesArray = [];
            e.genres?.map((el) => gamesArray.push(el.name));
            return (
              <Card
                id={e.id}
                nombre={e.name}
                background_image={e.background_image}
                generos={gamesArray.length > 0 ? gamesArray.join() : e.genres}
              />
            );
          })}
      </div>
      <div className="contenedor-paginado">
        <div>
          <button
            className="btnPag"
            onClick={() => setNumeroPagina(numeroPagina - 1)}
            disabled={numeroPagina === 1}
          >
            BACK
          </button>
          <button className="btnPag">{numeroPagina}</button>
          <button
            className="btnPag"
            onClick={() => setNumeroPagina(numeroPagina + 1)}
            disabled={numeroPagina === Math.ceil(game.length / grupo)}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
