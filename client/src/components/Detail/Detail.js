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
    console.log(idVideojuegos);
  }, []);

  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <div className="contenedor-general-detalle">
      //
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
    videojuego: state?.videogame,
  };
}

export default connect(mapStateToProps, { getDetail })(Detail);
