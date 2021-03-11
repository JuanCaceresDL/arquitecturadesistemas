import React from 'react';
import ClienteRead from './ClienteRead'
import ClienteNew from './ClienteNew'
import ClientEdit from './ClientEdit'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";


function Clientes() {
    let match = useRouteMatch();
    return (
      <div >
        <center className="container">
          <br/>
          <h1>Clientes</h1>
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