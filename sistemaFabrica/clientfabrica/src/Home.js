import React, {Fragment, useEffect, useState} from 'react';
import {urlNode} from './components/publicElements/Url'
import Navigation from './components/publicElements/Navigation'
import {useHistory}  from "react-router-dom";
import {highlightText} from './components/publicElements/functions'
import Axios from 'axios';

function Home(){
    const history = useHistory();
    if(localStorage.getItem('login') !== 'true'){
      history.push('/')
    }

    const [registro, setRegistros] = useState([]);
    const [registroRest, setRegistrosRest] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [searchVentas, setSearchVentas] = useState("");
    const [search, setSearch] = useState("");
    const [searchRest, setSearchRest] = useState("");
    const [updown, setUpdown] = useState({up: false, sortkey: ""})

    useEffect(() =>{
        Axios.get(urlNode() + '/registros')
          .then((response) => {
            setRegistros(response.data.sort((a,b) => b['fecha'].toString().localeCompare(a['fecha'])))
          }).catch(() => {
              alert('ERR')
          })

        Axios.get(urlNode() + '/registrosRest')
        .then((response) => {
          setRegistrosRest(response.data.sort((a,b) => b['fecha'].toString().localeCompare(a['fecha'])))
        }).catch(() => {
            alert('ERR')
        })
        
        Axios.get(urlNode() +  '/listVentas')
        .then((response) => {
          setVentas(response.data)
        }).catch(() => {
            alert('ERR')
        })
      }, [])

    const handleSearch = (event) => {
    setSearch(event.target.value);
    }

    const handleSearchRest = (event) => {
      setSearchRest(event.target.value);
      }

    const handleSearchVentas = (event) => {
      setSearchVentas(event.target.value);
      }

//LOGS---------------------
    const onSort = (event, sortKey, dato) => {
    
        const data = dato;
        if(updown.up){
          data.sort((a,b) => a[sortKey].toString().localeCompare(b[sortKey]));
          setUpdown({up: false, sortkey: sortKey})
        }else{
          data.sort((a,b) => b[sortKey].toString().localeCompare(a[sortKey]));
          setUpdown({up: true, sortkey: sortKey})
        }
        setRegistros(data);
      }
    
      const items = registro.filter((data)=>{
        if(search === "")
            return data
        else if(data.usuario.toLowerCase().includes(search.toLowerCase()) || 
        data.accion.toLowerCase().includes(search.toLowerCase()) || 
        data.fecha.toLowerCase().includes(search.toLowerCase())){
            return data
        }
      }).map((a, index)=>{
        return(
          <tr key={index}>
            <th scope="row"><a href={`/usuarios/edit/${a.usuario}`}>{a.usuario}</a></th>
            <td>{highlightText(a.accion, search)}</td>
            <td>{highlightText(a.fecha, search)}</td>
          </tr>
        )
      })

      const onSortRest = (event, sortKey, dato) => {
    
        const data = dato;
        if(updown.up){
          data.sort((a,b) => a[sortKey].toString().localeCompare(b[sortKey]));
          setUpdown({up: false, sortkey: sortKey})
        }else{
          data.sort((a,b) => b[sortKey].toString().localeCompare(a[sortKey]));
          setUpdown({up: true, sortkey: sortKey})
        }
        setRegistrosRest(data);
      }
    
      const items2 = registroRest.filter((data)=>{
        if(searchRest === "")
            return data
        else if(data.tienda.toLowerCase().includes(searchRest.toLowerCase()) || 
        data.accion.toLowerCase().includes(searchRest.toLowerCase()) || 
        data.fecha.toLowerCase().includes(searchRest.toLowerCase())){
            return data
        }
      }).map((a, index)=>{
        return(
          <tr key={index}>
            <th scope="row">{highlightText(a.tienda, search)}</th>
            <td>{highlightText(a.accion, searchRest)}</td>
            <td>{highlightText(a.fecha, searchRest)}</td>
          </tr>
        )
      })
//Agregation--------------------------------
      const onSortVentas = (event, sortKey) => {
    
        const data = ventas;
        if(updown.up){
          data.sort((a,b) => a[sortKey].toString().localeCompare(b[sortKey]));
          setUpdown({up: false, sortkey: sortKey})
        }else{
          data.sort((a,b) => b[sortKey].toString().localeCompare(a[sortKey]));
          setUpdown({up: true, sortkey: sortKey})
        }
        setVentas(data);
      }
    
      const itemsVentas = ventas.filter((data)=>{
        if(searchVentas === "")
            return data
        else if(data._id.toLowerCase().includes(searchVentas.toLowerCase()) || 
        data.cantidad.toString().toLowerCase().includes(searchVentas.toLowerCase()) || 
        data.total.toString().toLowerCase().includes(searchVentas.toLowerCase())){
            return data
        }
      }).map((a, index)=>{
        return(
          <tr key={index}>
            <th scope="row"><a href={`/telefonos/edit/${a._id}`}>{a._id}</a></th>
            <td>{highlightText(a.cantidad.toString(), searchVentas)}</td>
            <td>{highlightText(a.total.toString(), searchVentas)}</td>
          </tr>
        )
      })
      
    return(
        <Fragment>
            <Navigation/>
            <section className="presentacion">
                <h1>Bienvenido {localStorage.getItem('nombre').toUpperCase()}</h1>
            </section>

            <section className="container">
                <article>
                    <center>
                        <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></span>
                        </div>
                        <input onChange={handleSearch} type="text" className="form-control" placeholder="Busqueda Log" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </center>
                </article>
                <article className="separador">
                    <table className="table table-striped table-hover table-sm">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col" onClick={e => onSort(e, "usuario", registro)}>Usuario <i hidden={"usuario" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                            <th scope="col" onClick={e => onSort(e, "accion", registro)}>Accion <i hidden={"accion" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                            <th scope="col" onClick={e => onSort(e, "fecha", registro)}>Fecha <i hidden={"fecha" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                        </tr>
                        </thead>
                        <tbody>
                        {items}
                        </tbody>
                    </table>
                </article>
            </section>
            <hr/>

            <section className="container">
                <article>
                    <center>
                        <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon"><i className="fa fa-search" aria-hidden="true"></i></span>
                        </div>
                        <input onChange={handleSearchRest} type="text" className="form-control" placeholder="Busqueda LogRest" aria-label="Username" aria-describedby="basic-addon" />
                        </div>
                    </center>
                </article>
                <article className="separador">
                    <table className="table table-striped table-hover table-sm">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col" onClick={e => onSortRest(e, "tienda", registroRest)}>Tienda <i hidden={"tienda" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                            <th scope="col" onClick={e => onSortRest(e, "accion", registroRest)}>Accion <i hidden={"accion" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                            <th scope="col" onClick={e => onSortRest(e, "fecha", registroRest)}>Fecha <i hidden={"fecha" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                        </tr>
                        </thead>
                        <tbody>
                        {items2}
                        </tbody>
                    </table>
                </article>
            </section>
            <hr/>

            <div className="container">
            <section className="row">
              <article className="col-sm-6">
              <section>
                    <center>
                        <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></span>
                        </div>
                        <input onChange={handleSearchVentas} type="text" className="form-control" placeholder="Busqueda Ventas" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </center>
                </section>
                <section className="separador">
                    <table className="table table-striped table-hover table-sm">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col" onClick={e => onSortVentas(e, "_id")}>Telefono <i hidden={"_id" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                            <th scope="col" onClick={e => onSortVentas(e, "cantidad")}>Cantidad <i hidden={"cantidad" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                            <th scope="col" onClick={e => onSortVentas(e, "total")}>Total <i hidden={"total" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                        </tr>
                        </thead>
                        <tbody>
                        {itemsVentas}
                        </tbody>
                    </table>
                </section>

              </article>

            </section>

            </div>
        </Fragment> 
    )
}

export default Home;