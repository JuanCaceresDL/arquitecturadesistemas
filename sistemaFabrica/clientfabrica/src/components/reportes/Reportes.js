import React, {useEffect, useState} from 'react';
import Navigation from '../publicElements/Navigation'
import {useHistory} from "react-router-dom";
import {urlNode} from '../publicElements/Url'
import Axios from 'axios'

import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
          console.log(response.data)
        }).catch(() => {
            alert('ERR')
        })
    }, [])

    const pedirReportes = () => {
      Axios.post(urlNode() + '/restReportes').then(() => {
            alert('Se han añadido datos')
        }).catch(() => {
            alert('No se ha podido consultar')
        })
      Axios.get(urlNode() + '/getReportes')
        .then((response) => {
          setReportes(response.data)
          console.log(response.data)
        }).catch(() => {
            alert('ERR')
        })

    }

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
                <button onClick={pedirReportes} className="btn btn-secondary">Pedir informe a tiendas</button>
              </center>

            </article>

            <article className="col-sm-8">
              <center>
                  <h3>Enviar arhivo de excel</h3>
                  <form  className="d-flex justify-content-center">
                      <input className="form-control" name="actualImagen" placeholder="Enviar a correo" autoComplete="off"/>
                      <br/>
                      <button className="btn btn-secondary" type="submit">Enviar</button>
                  </form>
                  <br/> 

                <ExcelFile element={<button className="btn btn-secondary">Exportar Excel</button>} filename="ReporteVentas">
                  <ExcelSheet data={reportes} name="ReporteVentas">
                      <ExcelColumn label="TelCodigo" value="telcodigo"/>
                      <ExcelColumn label="Cantidad" value="cantidad"/>
                      <ExcelColumn label="Tienda" value="tienda"/>
                      <ExcelColumn label="Fecha" value="fecha"/>
                  </ExcelSheet>
              </ExcelFile>
              </center>

            </article>
          </div>

        </section>

      </div>
    );
  }
  
  export default Reportes;