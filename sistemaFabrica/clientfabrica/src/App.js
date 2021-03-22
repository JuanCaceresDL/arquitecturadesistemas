import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './styles/styles.scss'
import Login from './login'
import Home from './Home'
import Telefono from './components/telefonos/Telefono'
import Pedido from './components/pedidos/Pedido'
import Clientes from './components/clientes/clientes'
import Usuarios from './components/usuarios/usuarios'
import Reportes from './components/reportes/Reportes'

function App() {

  return (
    <Router >
      <Switch>

        <Route exact={true} path="/">
          <Login />
        </Route>

        <Route exact={true} path="/home">
          <Home />
        </Route>

        <Route path="/telefonos">
          <Telefono />
        </Route>

        <Route path="/pedidos">
          <Pedido />
        </Route>

        <Route path="/clientes">
          <Clientes />
        </Route>

        <Route path="/usuarios">
          <Usuarios />
        </Route>

        <Route path="/reportes">
          <Reportes />
        </Route>

        <Route path="*">
          <div>404 not found</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
