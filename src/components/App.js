import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./Menu";
import Usuarios from "./users/index";

const Tareas = () => <div> Tareas</div>;

const App = () => (
  <BrowserRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Usuarios} />
      <Route exact path="/" component={Tareas} />
    </div>
  </BrowserRouter>
);

export default App;
