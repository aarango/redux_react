import React, { Component } from "react";
import { connect } from "react-redux";
import Fatal from "../General/Fatal";

import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActios";
import Spinner from "../General/Spinner";
import Comentarios from './Comentarios'

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { 
  traerPorUsuario: publicacionesTraerPorUsuario,
   abrirCerrar,traerComentarios } = publicacionesActions;

class Publicaciones extends Component {
  async componentDidMount() {
    const {
      usuariosTraerTodos,
      publicacionesTraerPorUsuario,
      match: {
        params: { key }
      }
    } = this.props;

    if (!this.props.usuariosReducer.usuarios.length) {
      await usuariosTraerTodos();
    }

    if (this.props.usuariosReducer.error) {
      return;
    }
    // Si las publicaciones estan en el props del UserReducer x key
    // Con este if sabemos si un usuario ya ha traido sus publicaciones
    if (
      !(
        "publicaciones_key" in
        this.props.usuariosReducer.usuarios[this.props.match.params.key]
      )
    ) {
      publicacionesTraerPorUsuario(key);
    }
  }

  // FUNCIÓN PARA SABER SI HAY UN ERROR O SI ESTA CARGANDO EL REDUCER DEL USUAROI

  ponerUsuario = () => {
    const {
      usuariosReducer,
      match: {
        params: { key }
      }
    } = this.props;

    if (usuariosReducer.error) {
      return <Fatal mensaje={usuariosReducer.error} />;
    }

    if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
      return <Spinner />;
    }

    const nombre = usuariosReducer.usuarios[key].name;

    return <h1>Publicaciones de {nombre}</h1>;
  };

  ponerPublicaciones = () => {
    const {
      usuariosReducer,
      usuariosReducer: { usuarios },
      publicacionesReducer,
      publicacionesReducer: { publicaciones },
      match: {
        params: { key }
      }
    } = this.props;

    if (!usuarios.length) return; // Si no ha  cargado usuarios no haga nada
    if (usuariosReducer.error) return; // Si aparece un error no haga nada ya lo esta manejando los usuarios
    if (publicacionesReducer.cargando) {
      // Si esta cargando las piblicaciones ponga el spinner
      return <Spinner />;
    }
    if (publicacionesReducer.error) {
      // Si hay un error cargando las publicaciones diga un mensaje
      return <Fatal mensaje={publicacionesReducer.error} />;
    }

    //Valido  si las publicaciones no tengan nada no retorne nada ( No han cargado aun los usuarios, debe esperar a que cargue primero)
    if (!publicaciones.length) return; // Si no carga las publicaciones no haga nada.

    // Valido si se trae el usuario, ahora necesito ir a la publicación  y traerme la llave que le corresponde a ese usuario
    if (!("publicaciones_key" in usuarios[key])) return;

    console.log("llegúe al key");

    const { publicaciones_key } = usuarios[key];

    return this.mostrarInfo(
      publicaciones[publicaciones_key],
      publicaciones_key
    )
  };

	mostrarInfo = (publicaciones, pub_key) => (
		publicaciones.map((publicacion, com_key) => (
			<div
				key={publicacion.id}
				className='pub_titulo'
				onClick={ () => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios) }
			>
				<h2>
					{ publicacion.title }
				</h2>
				<h3>
					{ publicacion.body }
				</h3>
				{ (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios} /> : [] }
			</div>
		))
  );
  
  mostrarComentarios = (pub_key, com_key, comentarios) => {
    console.log("comentarios",comentarios)
    this.props.abrirCerrar(pub_key,com_key)
    if(!comentarios.length) { // Si no hay comentarios busquelos
      this.props.traerComentarios (pub_key,com_key)
    }
    
  }

	render() {
    console.log(this.props)
		return (
			<div>
				{ this.ponerUsuario() }
				{ this.ponerPublicaciones() }
			</div>
		);
	}
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
  return { usuariosReducer, publicacionesReducer };
};

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerPorUsuario,
  abrirCerrar,
  traerComentarios
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
