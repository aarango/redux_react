import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import { Redirect } from "react-router-dom";

import * as tareasActions from "../../actions/tareasAction";

export class Guardar extends Component {
	componentDidMount() {
		const {
			match: { params: { usu_id, tar_id } },
			tareas,
			cambioUsuarioId,
			cambioTitulo
		} = this.props

		if (usu_id && tar_id) {
			const tarea = tareas[usu_id][tar_id];
			cambioUsuarioId(tarea.userId);
			cambioTitulo(tarea.title);
		}
	}

  cambioUsuarioId = event => {
    this.props.cambioUsuarioId(event.target.value); // le mando al action el evento
  };

  cambioTitulo = event => {
    this.props.cambioTitulo(event.target.value);
  };

  guardar = () => {
    const {
      match: {
        params: { usu_id, tar_id }
      },
      tareas,
      usuario_id,
      titulo,
      agregar,
      editar
    } = this.props;

    const nueva_tarea = {
      userId: usuario_id,
      title: titulo,
      completed: false
    };

    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      const tarea_editada = {
        ...nueva_tarea,
        completed: tarea.completed,
        id: tarea.id
      };
      editar(tarea_editada);
    } else {
      agregar(nueva_tarea);
    }
  };

  deshabilitar = () => {
    const { usuario_id, titulo, cargando } = this.props;
    if (cargando) {
      return true;
    }
    if (!usuario_id || !titulo) {
      // Deshabilitar Boton Si no se escriben en las casillas TITULO E ID
      return true;
    }

    return false;
  };

  mostrarAccion = () => {
    const { error, cargando } = this.props;

    if (cargando) {
      return <Spinner />;
    }
    if (error) {
      return <Fatal mensaje={error} />;
    }
  };

  render() {
    return (
      // Si la tarea Fue Guardada exitosamente rediriga a el listado de Tareas
      <div>
        {this.props.regresar ? <Redirect to="/tareas" /> : ""}
        <h1>Guardar Tarea</h1>
        Usuario id:
        <input
          type="number"
          value={this.props.usuario_id}
          onChange={this.cambioUsuarioId}
        />
        <br />
        <br />
        Título:
        <input value={this.props.titulo} onChange={this.cambioTitulo} />
        <br />
        <br />
        <button disabled={this.deshabilitar()} onClick={this.guardar}>
          Guardar
        </button>
        {this.mostrarAccion()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);
