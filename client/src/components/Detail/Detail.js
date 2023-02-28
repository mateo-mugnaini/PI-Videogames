import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../Redux/Actions/actions";
import "../Detail/Detail.css";

function Detail({ getDetail, videojuego }) {
  const { idVideojuegos } = useParams();

  useEffect(() => {
    getDetail(idVideojuegos);
  }, [idVideojuegos, getDetail]);

  useEffect(() => {
    console.log(videojuego);
  }, [videojuego]);

  return (
    <div className="contenedor-general">
      {videojuego && (
        <div className="contenedor-Textos-Detalle">
          {/* NOMBRE */}
          <div className="contenedor-Texto">
            <h1 className="TextoTitulo">NOMBRE:</h1>
            <h3 className="Texto">{videojuego?.name}</h3>
          </div>
          <div className="contenedor-imagen">
            <img className="imgDetalle" src={videojuego?.background_image} />
          </div>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    videojuego: state?.videojuego,
  };
}

export default connect(mapStateToProps, { getDetail })(Detail);
