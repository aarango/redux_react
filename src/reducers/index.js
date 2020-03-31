import { combineReducers } from "redux";
import usuariosReducer from "./usuariosReducers";
import publicacionesReducer from "./publicacionesReducers";
import tareasReducer  from './tareasReducer'

export default combineReducers({
  usuariosReducer,
  publicacionesReducer,
  tareasReducer
});
