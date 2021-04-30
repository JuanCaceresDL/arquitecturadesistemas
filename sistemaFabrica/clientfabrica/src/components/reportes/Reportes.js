import React, {useEffect, useState} from 'react';
import Navigation from '../publicElements/Navigation'
import {useHistory} from "react-router-dom";
import {urlNode} from '../publicElements/Url'
import Axios from 'axios'

import Select from 'react-select'
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

function Reportes() {

    const history = useHistory();
    if(localStorage.getItem('login') !== 'true'){
      history.push('/')
    }

    const [reportes, setReportes] = useState([]);
    const [correo, setCorreo] = useState("");
    const [fecha, setFecha] = useState("");
    const [tiendas, setTiendas] = useState([])

    useEffect(() =>{
      Axios.get(urlNode() + '/getReportes')
        .then((response) => {
          setReportes(response.data)
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
        }).catch(() => {
            alert('ERR')
        })
    }

    const tiendasArray = reportes.map(r => r.tienda);

    const tiendasDisponibles = tiendasArray.filter((item,index)=>{
      return tiendasArray.indexOf(item) === index;
    }).map(r => {return {value: r, label: r}})

    const manageCorreos = (event) =>{
      setCorreo(event.target.value)
    }

    const handleFecha = (event) =>{
      setFecha(event.target.value)
    }

    const handleTiendas = (event) =>{
      setTiendas(event.map(e => e.value))
    }

    const enviarCorreos = () =>{
      if(dataFilter.length === 0 || correo === ""){
        alert('Reporte o correo vacío, no se puede enviar')
      }else{
        Axios.post(urlNode() + '/sendReportes', {
          correo: correo,
          datos: dataFilter
        }).then(() => {
          alert('Se han enviado a los correos')
          setCorreo("")
        }).catch(() => {
            alert('No se ha podido enviar')
        })
      }
      
    }

    const dataFilter = reportes.filter(r => {
        if(fecha === ""){
          return r
        }else{
          let fc = new Date(fecha);
          fc.setDate(fc.getDate() + 1)
          let rf = new Date(r.fecha)
          if(rf.toDateString() === fc.toDateString()){
            return r
          }
        }
      }).filter(r => {
        if(tiendas.length === 0){
          return r
        }else{
          if(tiendas.indexOf(r.tienda) >= 0){
            return r
          }
        }
      })

      const items = dataFilter.map((d, index) => (
        <tr key={index}>
          <th scope="row">{d.telcodigo}</th>
          <td>{d.cantidad}</td>
          <td>{d.tienda}</td>
          <td>{d.fecha}</td>
        </tr>
      ))

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
              </center><br/>

              <center><h3>Filtros</h3></center>
              <hr/>
              <h4>Fecha</h4>
              <div className="d-flex justify-content-center">
                <input type="date" className="form-control" name="fecha" value={fecha} onChange={handleFecha} />
                <button onClick={() => setFecha("")} className="btn btn-danger"><i class="fa fa-times-circle" aria-hidden="true"></i></button>
              </div><br/>
              <h4>Tiendas</h4>
              <Select options={tiendasDisponibles} isMulti className="basic-multi-select" classNamePrefix="Tiendas" onChange={handleTiendas}/>
            </article>

            <article className="col-sm-8">
              <center>
                  <h3>Enviar arhivo de excel</h3>
                  <div  className="d-flex justify-content-center">
                      <input onChange={manageCorreos} value={correo} className="form-control" name="actualImagen" placeholder="Enviar a correo" autoComplete="off"/>
                      <br/>
                      <button onClick={enviarCorreos} className="btn btn-secondary" type="submit">Enviar</button>
                  </div>
                  <br/> 
              </center>
              
              <section className="table-responsive container-fluid">
                <table className="table table-striped table-hover table-sm">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col" >TelCodigo</th>
                      <th scope="col" >Cantidad</th>
                      <th scope="col" >Tienda</th>
                      <th scope="col" >Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items}
                  </tbody>
                </table>
              </section>

            </article>
          </div>

        </section>

      </div>
    );
  }
  
  export default Reportes;