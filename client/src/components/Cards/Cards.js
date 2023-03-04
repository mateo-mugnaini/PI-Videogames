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

  const paginas = [];
  // for (let i = 1; i <= game; i++) {
  //   paginas.push(
  //     <button
  //       key={i}
  //       className={`btnPag ${numeroPagina === i ? "active" : ""}`}
  //       onClick={() => setNumeroPagina(i)}
  //     >
  //       {i}
  //     </button>
  //   );
  // }

  const numPaginas = Math.ceil(games?.length / grupo);

  for (let i = 1; i <= numPaginas; i++) {
    paginas.push(i);
  }

  React.useEffect(() => console.log(games));

  return (
    <div className="contenedor-general-cards">
      <div className="contenedor-paginado">
        <div>
          {paginas.map((pagina) => (
            <button
              key={pagina}
              className={`btnPag ${pagina === numeroPagina ? "active" : ""}`}
              onClick={() => setNumeroPagina(pagina)}
            >
              {pagina}
            </button>
          ))}
          <button
            className="btnPag"
            onClick={() => setNumeroPagina(numeroPagina - 1)}
            disabled={numeroPagina === 1}
          >
            BACK
          </button>
          <button
            className="btnPag"
            onClick={() => setNumeroPagina(numeroPagina + 1)}
            disabled={numeroPagina === Math.ceil(games?.length / grupo)}
          >
            NEXT
          </button>
        </div>
      </div>
      <div className="contenedor-cards">
        {game.length > 0 &&
          game.map((e) => {
            const gamesArray = [];
            e.genres?.map((el) => gamesArray.push(el.name));
            return (
              <Card
                key={e.id}
                id={e.id}
                nombre={e.name}
                background_image={e.background_image}
                generos={
                  gamesArray.length > 0 ? gamesArray.join(", ") : e.genres
                }
              />
            );
          })}
      </div>
    </div>
  );
}
