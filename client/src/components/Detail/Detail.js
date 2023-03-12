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
      {videojuego[0] && (
        <div className="contenedor-detalle-general">
          {/* ----------------------------IMAGEN---------------------------- */}
          <div className="subcontenedor-3-detalle">
            <div className="contenedor-detalle-imagen">
              <img
                className="detalle-imagen"
                src={videojuego[0]?.background_image || videojuego[0].image}
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
                <p>{videojuego[0]?.name}</p>
              </div>
            </div>
            {/* ----------------------------RATING---------------------------- */}
            <div className="contenedor-detalle-rating">
              <div className="detalle-rating-titulo">
                <h1>Rating: </h1>
              </div>
              <div className="detalle-rating">
                <p>{videojuego[0]?.rating || props.rating}</p>
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
                {(videojuego[0]?.genres &&
                  videojuego[0]?.genres.map((genero, i) => (
                    <p key={i}>{genero.name},</p>
                  ))) ||
                  (videojuego[0]?.genders &&
                    videojuego[0]?.genders.map((genero, i) => (
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
                    __html: videojuego[0]?.description,
                  }}
                />
              </p>
            </div>
            <div className="detalle-plataformas-titulo">
              <h1>Plataformas: </h1>
            </div>
            <div className="detalle-plataformas">
              {(videojuego[0]?.platforms &&
                videojuego[0]?.platforms.map((plataforma, i) => (
                  <p key={i}>{plataforma.platform.name},&nbsp;</p>
                ))) ||
                (videojuego[0]?.platform &&
                  videojuego[0]?.platform.map((plataforma, i) => (
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
