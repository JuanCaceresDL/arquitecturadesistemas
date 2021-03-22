import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Axios from 'axios'

function Navigation(){
  const history = useHistory();

  const salir = () => {
      localStorage.setItem('login', 'false');
      history.push(`/`);
  }

  return(
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
            <Nav.Link eventKey={2} href="#">
              <button onClick={salir} className="btn btn-outline-success my-2 my-sm-0" type="submit">Log Out</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
      )
    }

export default Navigation;