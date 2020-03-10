import axios from "axios";
import { TRAER_TODOS, CARGANDO, ERROR } from "../types/userTypes";

export const traerTodos = () => async dispatch => {
  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({
        type: CARGANDO
    })

    dispatch({
      type: TRAER_TODOS,
      payload: respuesta.data
    });
  } catch (error) {
      console.log(error.message)
    
    dispatch({
        type: ERROR,
        payload: 'Algo Salió mal, Intenta mas tarde.'
    })
  }
};
