import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Telefono from './components/telefonos/Telefono'
import Pedido from './components/pedidos/Pedido'
import Clientes from './components/clientes/clientes'


function App() {
  return (
    <Router >
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">HOME</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/telefonos">Telefonos</Nav.Link>
            <Nav.Link href="/clientes">Clientes</Nav.Link>
            <Nav.Link href="/reportes">Reportes</Nav.Link>
            <Nav.Link href="/pedidos">Pedidos</Nav.Link>
            <Nav.Link href="/usuarios">Usuarios</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">/</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path="/telefonos">
          <Telefono />
        </Route>

        <Route path="/pedidos">
          <Pedido />
        </Route>

        <Route path="/clientes">
          <Clientes />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
