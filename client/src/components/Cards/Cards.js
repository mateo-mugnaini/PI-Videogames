import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import "../Cards/Cards.css";

export default function Cards() {
  /* ----------------------------CARD---------------------------- */
  const games = useSelector((state) => state?.videogames);

  /* ----------------------------PAGINADO---------------------------- */
  const [numeroPagina, setNumeroPagina] = useState(1);

  const grupo = 15;
  const conteoFinal = numeroPagina * grupo;
  const conteoInicial = conteoFinal - grupo;

  const game =
    games && games.slice ? games.slice(conteoInicial, conteoFinal) : [];

  const paginas = [];

  const numPaginas = Math.ceil(games?.length / grupo);

  for (let i = 1; i <= numPaginas; i++) {
    paginas.push(i);
  }

  // React.useEffect(() => console.log(games));

  return (
    /* ------------------------------CONTENEDOR GENERAL------------------------------ */
    <div className="contenedor-general-cards">
      <div className="contenedor-paginado">
        {/* ------------------------------CONTENEDOR PAGINADO------------------------------ */}
        <div>
          {/* ------------------------------BOTON ATRAS------------------------------ */}
          <button
            className="btnPag"
            onClick={() => setNumeroPagina(numeroPagina - 1)}
            disabled={numeroPagina === 1}
          >
            ◄
          </button>
          {/* ------------------------------BOTONES PAGINAS------------------------------ */}
          {paginas.map((pagina) => (
            <button
              key={pagina}
              className={`btnPag ${pagina === numeroPagina ? "active" : ""}`}
              onClick={() => setNumeroPagina(pagina)}
            >
              {pagina}
            </button>
          ))}
          {/* ------------------------------BOTON PROXIMO------------------------------ */}
          <button
            className="btnPag"
            onClick={() => setNumeroPagina(numeroPagina + 1)}
            disabled={numeroPagina === Math.ceil(games?.length / grupo)}
          >
            ►
          </button>
        </div>
      </div>
      {/* ------------------------------CARTAS------------------------------ */}
      <div className="contenedor-cards">
        {game.length > 0 &&
          game.map((e) => {
            const gamesArray = [];
            e.genres?.map((el) => gamesArray.push(el.name));
            e.genders?.map((el) => gamesArray.push(el.name));
            return (
              <Card
                key={e.id}
                id={e.id}
                nombre={e.name}
                background_image={e.background_image || e.image}
                generos={gamesArray.length > 0 && gamesArray.join(", ")}
              />
            );
          })}
      </div>
      <div className="contenedor-paginado-fondo">
        {/* ------------------------------CONTENEDOR PAGINADO------------------------------ */}
        <div>
          {/* ------------------------------BOTON ATRAS------------------------------ */}
          <button
            className="btnPag"
            onClick={() => setNumeroPagina(numeroPagina - 1)}
            disabled={numeroPagina === 1}
          >
            ◄
          </button>
          {/* ------------------------------BOTONES PAGINAS------------------------------ */}
          {paginas.map((pagina) => (
            <button
              key={pagina}
              className={`btnPag ${pagina === numeroPagina ? "active" : ""}`}
              onClick={() => setNumeroPagina(pagina)}
            >
              {pagina}
            </button>
          ))}
          {/* ------------------------------BOTON PROXIMO------------------------------ */}
          <button
            className="btnPag"
            onClick={() => setNumeroPagina(numeroPagina + 1)}
            disabled={numeroPagina === Math.ceil(games?.length / grupo)}
          >
            ►
          </button>
        </div>
      </div>
    </div>
  );
}
