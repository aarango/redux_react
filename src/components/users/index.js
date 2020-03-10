import React, { Component } from "react";

import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";

import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import Tabla from "./tabla";

class Usuarios extends Component {
  componentDidMount() {
    this.props.traerTodos();
  }

  ponerContenido = () => {
    if (this.props.cargango) {
      return <Spinner />;
    }

    if (this.props.error) {
      return <Fatal mensaje={this.props.error} />; // Como Users es el Padre de Fatal, Capturo el error de URL y se lo envio al componente Fatal para que el lo pueda ver
    }

    return <Tabla usuarios={this.props.usuarios} />;
  };

  render() {
    return (
      <div>
        <h1>Usuarios</h1>
        {this.ponerContenido()}
      </div>
    );
  }
}

const mapStatetoProps = reducers => {
  return reducers.usuariosReducer;
};

export default connect(mapStatetoProps, usuariosActions)(Usuarios); // el primer parametro del conect resive, son todos los reducer que el provedor entrega al usuario, el usuario ( compoente )
