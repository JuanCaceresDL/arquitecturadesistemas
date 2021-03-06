import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Telefono from './components/telefonos/Telefono'


function App() {
  return (
    <Router >
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">HOME</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/telefonos">Telefonos</Nav.Link>
            <Nav.Link href="/clientes">Clintes</Nav.Link>
            <Nav.Link href="/pedidos">Reportes</Nav.Link>
            <Nav.Link href="/Usuarios">Pedidos</Nav.Link>
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
      </Switch>
    </Router>
  );
}

export default App;
