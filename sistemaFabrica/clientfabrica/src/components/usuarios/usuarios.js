import React from 'react';
import UsuariosRead from './usuariosRead'
import UsuariosNew from './usuariosNew'
import UsuariosEdit from './usuariosEdit'
import UsuariosLogin from './usuarioslogin'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";


function Usuarios() {
    let match = useRouteMatch();
    return (
      <div >
        <center className="container">
          <br/>
          <h1>Usuarios</h1>
          <Link to={`${match.url}`}><button className="btn btn-primary">Lista</button></Link>&nbsp;&nbsp;&nbsp;
          <Link to={`${match.url}/nuevo`}><button className="btn btn-primary">Crear</button></Link>
          <br/>
          <br/>
        </center>
        <Switch>
          <Route exact={true} path={match.path}>
            <UsuariosRead />
          </Route>
          <Route exact={true} path={`${match.path}/nuevo`}>
            <UsuariosNew />
          </Route>
          <Route exact={true} path={`${match.path}/edit/:id`}>
            <UsuariosEdit />
          </Route>
          <Route exact={true} path={`${match.path}/usuarioslogin`}>
            <UsuariosLogin />
          </Route>
        </Switch>
        
      </div>
    );
  }
  
  export default Usuarios;