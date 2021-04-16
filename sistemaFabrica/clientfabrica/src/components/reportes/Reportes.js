import React, {useEffect} from 'react';
import Navigation from '../publicElements/Navigation'
import {useHistory} from "react-router-dom";
import Axios from 'axios'

function Reportes() {

    const history = useHistory();
    if(localStorage.getItem('login') !== 'true'){
      history.push('/')
    }

    const [reportes, setReportes] = useState([]);

    useEffect(() =>{
      Axios.get(urlNode() + '/getReportes')
        .then((response) => {
          setReportes(response.data)
        }).catch(() => {
            alert('ERR')
        })
    }, [])

    return (
      <div >
        <Navigation />
        <section className="titulos">
          <h1>Reportes</h1>
        </section>

        <section className="container-fluid">
          <div className="row">

            <article className="col-sm-4">

              <center>
                <button className="btn btn-secondary">Pedir informe a tiendas</button>
              </center>

            </article>

            <article className="col-sm-8">
              <center>
                  <h3>Enviar arhivo de excel</h3>
                  <form  class="d-flex justify-content-center">
                      <input className="form-control" name="actualImagen" placeholder="Enviar a correo" autoComplete="off"/>
                      <br/>
                      <button className="btn btn-secondary" type="submit">Enviar</button>
                  </form>
                  <br/> 
              </center>

            </article>
          </div>

        </section>

      </div>
    );
  }
  
  export default Reportes;