import React from 'react';
import Navigation from '../publicElements/Navigation'
import ClienteRead from './ClienteRead'
import ClienteNew from './ClienteNew'
import ClientEdit from './ClientEdit'

import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory
} from "react-router-dom";

function Clientes() {
    let match = useRouteMatch();
    const history = useHistory();
    if(localStorage.getItem('login') !== 'true'){
      history.push('/')
    }
    return (
      <div >
        <Navigation />
        <section className="titulos">
          <h1>Clientes</h1>
        </section>
        <center className="container">
          <Link to={`${match.url}`}><button className="btn btn-primary">Lista</button></Link>&nbsp;&nbsp;&nbsp;
          <Link to={`${match.url}/nuevo`}><button className="btn btn-primary">Crear</button></Link>
          <br/>
          <br/>
        </center>
        <Switch>
          <Route exact={true} path={match.path}>
            <ClienteRead />
          </Route>
          <Route exact={true} path={`${match.path}/nuevo`}>
            <ClienteNew />
          </Route>
          <Route exact={true} path={`${match.path}/edit/:id`}>
            <ClientEdit />
          </Route>
        </Switch>
        
      </div>
    );
  }
  
  export default Clientes;