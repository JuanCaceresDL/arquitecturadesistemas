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
        <h1>Telefonos</h1>
        <Link to={`${match.url}/nuevo`}><button>Crear teléfono</button></Link>

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