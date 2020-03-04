import React, { Component } from "react";

import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";

import Spinner from '../General/Spinner'


class Usuarios extends Component {
  componentDidMount() {
    this.props.traerTodos();
  }

  ponerContenido = () => {
    if (this.props.cargango) {
      return <Spinner />
    }

    return (
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>{this.ponerFilas()}</tbody>
      </table>
    );
  };

  ponerFilas = () =>
    this.props.usuarios.map(usuario => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
      </tr>
    ));

  render() {
    return <div>{this.ponerContenido()}</div>;
  }
}

const mapStatetoProps = reducers => {
  return reducers.usuariosReducer;
};

export default connect(mapStatetoProps, usuariosActions)(Usuarios); // el primer parametro del conect resive, son todos los reducer que el provedor entrega al usuario, el usuario ( compoente )
