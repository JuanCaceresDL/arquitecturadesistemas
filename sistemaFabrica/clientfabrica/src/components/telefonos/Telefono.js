import React from 'react';
import Navigation from '../publicElements/Navigation'
import TelefonoRead from './TelefonoRead'
import TelefonoNew from './TelefonoNew'
import TelefonoEdit from './TelefonoEdit'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory
} from "react-router-dom";


function Telefono() {
    let match = useRouteMatch();
    const history = useHistory();
    if(localStorage.getItem('login') !== 'true'){
      history.push('/')
    }
    return (
      <div >
        <Navigation />
        <section className="titulos">
          <h1>Telefonos</h1>
        </section>

        <center className="container">
          
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
          <Route exact={true} path={`${match.path}/edit/:id`}>
            <TelefonoEdit />
          </Route>
        </Switch>
        
      </div>
    );
  }
  
  export default Telefono;