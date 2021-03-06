import React from 'react';
import TelefonoRead from './TelefonoRead'
import TelefonoNew from './TelefonoNew'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";


function Telefonos() {
    let match = useRouteMatch();
    return (
      <div >
        <center className="container">
          <br/>
          <h1>Telefonos</h1>
          <Link to={`${match.url}`}><button className="btn btn-primary">Lista</button></Link>&nbsp;&nbsp;&nbsp;
          <Link to={`${match.url}/nuevo`}><button className="btn btn-primary">Crear</button></Link>
          <br/>
          <br/>
        </center>
        <Switch>
          <Route exact={true} path={match.path}>
            <TelefonoRead />
          </Route>
          <Route exact={true} path={`${match.path}/nuevo`}>
            <TelefonoNew />
          </Route>
        </Switch>
        
      </div>
    );
  }
  
  export default Telefonos;