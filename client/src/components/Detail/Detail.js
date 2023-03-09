import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../Redux/Actions/actions";
import "../Detail/Detail.css";

function Detail({ getDetail, videojuego }, props) {
  // const { getDetail } = props;
  const { idVideojuegos } = useParams();

  useEffect(() => {
    getDetail(idVideojuegos);

    // console.log(videojuego?.genres.name);
  }, []);

  // useEffect(() => {
  //   console.log(props);
  // }, [props]);

  console.log(videojuego);
  return (
    /*----------------------------CONTENEDOR GENERAL----------------------------*/
    <div className="detalle-fondo">
      {/*----------------------------CONTENEDOR DETALLE---------------------------- */}
      {videojuego && (
        <div className="contenedor-detalle-general">
          {/* ----------------------------IMAGEN---------------------------- */}
          <div className="subcontenedor-3-detalle">
            <div className="contenedor-detalle-imagen">
              <img
                className="detalle-imagen"
                src={videojuego?.background_image || videojuego.image}
              />
            </div>
          </div>
          <div className="subcontenedor-1-detalle">
            {/* ----------------------------NOMBRE----------------------------  */}
            <div className="contenedor-detalle-nombre">
              <div className="detalle-nombre-titulo">
                <h1>Nombre: </h1>
              </div>
              <div className="detalle-nombre">
                <p>{videojuego?.name}</p>
              </div>
            </div>
            {/* ----------------------------RATING---------------------------- */}
            <div className="contenedor-detalle-rating">
              <div className="detalle-rating-titulo">
                <h1>Rating: </h1>
              </div>
              <div className="detalle-rating">
                <p>{videojuego?.rating || props.rating}</p>
              </div>
            </div>
          </div>
          {/* ----------------------------GENEROS---------------------------- */}
          <div className="subcontenedor-2-detalle">
            <div className="contenedor-detalle-generos">
              <div className="detalle-generos-titulo">
                <h1>Géneros: </h1>
              </div>
              <div className="detalle-generos">
                {(videojuego?.genres &&
                  videojuego?.genres.map((genero, i) => (
                    <p key={i}>{genero.name},</p>
                  ))) ||
                  (videojuego?.genders &&
                    videojuego?.genders.map((genero, i) => (
                      <p key={i}>{genero.name},</p>
                    )))}
              </div>
            </div>
          </div>
          {/* ----------------------------PLATAFORMAS---------------------------- */}
          <div className="subcontenedor-4-detalle"></div>
          {/* ----------------------------DESCRIPCION---------------------------- */}
          <div className="contenedor-detalle-descripcion">
            <div className="detalle-descripcion-titulo">
              <h1>Descripcion: </h1>
            </div>
            <div className="detalle-descripcion">
              <p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: videojuego?.description,
                  }}
                />
              </p>
            </div>
            <div className="detalle-plataformas-titulo">
              <h1>Plataformas: </h1>
            </div>
            <div className="detalle-plataformas">
              {(videojuego?.platforms &&
                videojuego?.platforms.map((plataforma, i) => (
                  <p key={i}>{plataforma || plataforma.platform.name},&nbsp;</p>
                ))) ||
                (videojuego?.platform &&
                  videojuego?.platform.map((plataforma, i) => (
                    <p key={i}>{plataforma},</p>
                  )))}
            </div>
          </div>
        </div>
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
