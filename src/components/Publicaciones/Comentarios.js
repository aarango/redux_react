import React from "react";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import { connect } from "react-redux";


const Comentarios = props => {
  if (props.error) {
    return <Fatal mensaje={props.com_error} />;
  }
  if (props.com_cargando && props.comentarios.length) {
    return <Spinner />;
  }

  const ponerComentarios = () =>
    props.comentarios.map(comentario => (
      <li>
        <b>
          <u>{comentario.email}</u>
        </b>
        <br />
        {comentario.body}
      </li>
    ));
  return <ul>{ponerComentarios()}</ul>;
};

const mapSateteToProps = ({ publicacionesReducer }) => publicacionesReducer;

export default connect(mapSateteToProps)(Comentarios);
