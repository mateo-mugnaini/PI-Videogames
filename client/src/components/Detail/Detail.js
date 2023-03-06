import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../Redux/Actions/actions";
import "../Detail/Detail.css";

function Detail(props) {
  const { getDetail, videojuego } = props;
  const { idVideojuegos } = useParams();

  useEffect(() => {
    getDetail(idVideojuegos);
    // console.log(videojuego?.genres.name);
  }, []);

  useEffect(() => {
    // console.log(props);
  }, [props]);

  return (
    /*----------------------------CONTENEDOR GENERAL----------------------------*/
    <div className="contenedor-general-detalle">
      {/*----------------------------CONTENEDOR DETALLE---------------------------- */}
      {videojuego && (
        <>
          <div className="contenedor-textos">
            <div className="contenedor-titulo">
              <h1 className="titulo-detalle">Nombre: </h1>
              <p className="nombre-detalle">{videojuego?.name}</p>
            </div>
            <div className="contenedor-plataformas">
              <h1 className="titulo-detalle">Plataformas: </h1>
              <div className="plataformas-detalle">
                {videojuego?.platforms &&
                  videojuego?.platforms.map((plataforma, i) => (
                    <p className="plataforma" key={i}>
                      {plataforma.platform.name},{" "}
                    </p>
                  ))}
              </div>
            </div>
            <div className="contenedor-rating">
              <h1 className="titulo-detalle">Rating: </h1>
              <p className="nombre-detalle">{videojuego?.rating}</p>
            </div>
            <div className="contenedor-generos">
              <h1 className="titulo-detalle">Géneros: </h1>
              <div className="generos-detalle">
                {videojuego?.genres &&
                  videojuego?.genres.map((genero, i) => (
                    <p clasname="nombre-detalle" key={i}>
                      {genero.name},
                    </p>
                  ))}
              </div>
            </div>
            <div className="contenedor-descripcion">
              <h1 className="titulo-detalle">Descripcion: </h1>
              <p clasname="nombre-detalle">
                <div
                  dangerouslySetInnerHTML={{ __html: videojuego?.description }}
                />
              </p>
            </div>
          </div>
          <div className="contenedor-imagen">
            <img className="imgDetalle" src={videojuego?.background_image} />
          </div>
        </>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    videojuego: state?.videogame,
  };
}

export default connect(mapStateToProps, { getDetail })(Detail);
