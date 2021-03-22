import React from 'react';
import Navigation from '../publicElements/Navigation'
import PedidoRead from './PedidoRead'
import PedidoNew from './PedidoNew'
import PedidoEdit from './PedidoEdit'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory
} from "react-router-dom";


function Pedido() {
    let match = useRouteMatch();
    const history = useHistory();
    if(localStorage.getItem('login') !== 'true'){
      history.push('/')
    }
    return (
      <div >
        <Navigation />
        <section className="titulos">
          <h1>Pedidos</h1>
        </section>
        <center className="container">
          <Link to={`${match.url}`}><button className="btn btn-primary">Lista</button></Link>&nbsp;&nbsp;&nbsp;
          <Link to={`${match.url}/nuevo`}><button className="btn btn-primary">Crear</button></Link>
          <br/>
          <br/>
        </center>
        <Switch>
          <Route exact={true} path={match.path}>
            <PedidoRead />
          </Route>
          <Route exact={true} path={`${match.path}/nuevo`}>
            <PedidoNew />
          </Route>
          <Route exact={true} path={`${match.path}/edit/:id`}>
            <PedidoEdit />
          </Route>
        </Switch>
        
      </div>
    );
  }
  
  export default Pedido;