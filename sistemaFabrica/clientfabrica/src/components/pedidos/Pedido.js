import React from 'react';
import PedidoRead from './PedidoRead'
import PedidoNew from './PedidoNew'
import PedidoEdit from './PedidoEdit'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";


function Pedido() {
    let match = useRouteMatch();
    return (
      <div >
        <center className="container">
          <br/>
          <h1>Pedidos</h1>
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