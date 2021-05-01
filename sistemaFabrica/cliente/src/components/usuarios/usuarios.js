import React from 'react';
import Navigation from '../publicElements/Navigation'
import UsuariosRead from './usuariosRead'
import UsuariosNew from './usuariosNew'
import UsuariosEdit from './usuariosEdit'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory
} from "react-router-dom";


function Usuarios() {
    let match = useRouteMatch();
    const history = useHistory();
    if(localStorage.getItem('login') !== 'true'){
      history.push('/')
    }
    return (
      <div >
        <Navigation />
        <section className="titulos">
          <h1>Usuarios</h1>
        </section>
        <center className="container">
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
        </Switch>
        
      </div>
    );
  }
  
  export default Usuarios;