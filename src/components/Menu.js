import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import {link} from 'react-router-dom'

const Menu = (props) => (
  <nav id='menu'>
    <Link to='/'>Usuarios</Link>
    <Link to='/tareas'>Tareas</Link>
  </nav>
);

export default Menu;
