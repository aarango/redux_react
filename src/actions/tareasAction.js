import axios from "axios";
import {
  TRAER_TODAS,
  CARGANDO,
  ERROR,
  CAMBIO_TITULO,
  CAMBIO_USUARIO_ID,
  GUARDAR,
  ACTUALIZAR
} from "../types/tareasTypes";

export const traerTodas = () => async dispatch => {
  dispatch({
    type: CARGANDO
  });

  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    const tareas = {}; // creo el objeto vacio
    respuesta.data.map(
      (
        tar // itero por aca objeto que tengo,
      ) =>
        (tareas[tar.userId] = {
          // a mi objeto vacio de tareas le agrego el tar.userId
          ...tareas[tar.userId], // ponme todo lo que esta dentro de la misma variable .. inmutable ( Puede que si o puede que no)
          [tar.id]: {
            // cuando ya tengo todo el objeto del UserId, le agrego el ID de la tarea
            ...tar // //  Ponme todo lo que tiene el ID del tar.id del useR.ID
          }
        })
    );

    dispatch({
      type: TRAER_TODAS,
      payload: tareas
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "Información de tareas no disponible."
    });
  }
};

export const cambioUsuarioId = usuario_id => dispatch => {
  dispatch({
    type: CAMBIO_USUARIO_ID,
    payload: usuario_id
  });
};

export const cambioTitulo = titulo => dispatch => {
  dispatch({
    type: CAMBIO_TITULO,
    payload: titulo
  });
};

export const agregar = nueva_tarea => async dispatch => {
  dispatch({
    type: CARGANDO
  });

  try {
    const respuesta = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      nueva_tarea
    );

    console.log(respuesta.data);

    dispatch({
      type: GUARDAR
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: " Intente mas tarde"
    });
  }
};

export const editar = tarea_editada =>  async dispatch => {
  dispatch({
    type: CARGANDO
  });

  try {
    const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`,
      tarea_editada );

    console.log(respuesta.data);

    dispatch({
      type: GUARDAR,
    });
  } 
  catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: " Intente mas tarde"
    });
  }
};


export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
	const { tareas } = getState().tareasReducer;
	const seleccionada = tareas[usu_id][tar_id];

	const actualizadas = {
		...tareas
	};
	actualizadas[usu_id] = {
		...tareas[usu_id]
	};
	actualizadas[usu_id][tar_id] = {
		...tareas[usu_id][tar_id],
		completed: !seleccionada.completed
	}

	dispatch({
		type: ACTUALIZAR,
		payload: actualizadas
	})
};