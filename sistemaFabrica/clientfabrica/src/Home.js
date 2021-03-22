import React, {Fragment, useEffect, useState} from 'react';
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
    const [search, setSearch] = useState("");
    const [updown, setUpdown] = useState({up: false, sortkey: ""})

    useEffect(() =>{
        Axios.get('http://localhost:3001/registros')
          .then((response) => {
            setRegistros(response.data.sort((a,b) => b['fecha'].toString().localeCompare(a['fecha'])))
          }).catch(() => {
              alert('ERR')
          })
      }, [])

    const handleSearch = (event) => {
    setSearch(event.target.value);
    }

    const onSort = (event, sortKey) => {
    
        const data = registro;
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
                        <input onChange={handleSearch} type="text" class="form-control" placeholder="Busqueda Log" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </center>
                </article>
                <article className="separador">
                    <table className="table table-striped table-hover table-sm">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col" onClick={e => onSort(e, "usuario")}>Usuario <i hidden={"usuario" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                            <th scope="col" onClick={e => onSort(e, "accion")}>Accion <i hidden={"accion" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                            <th scope="col" onClick={e => onSort(e, "fecha")}>Fecha <i hidden={"fecha" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                        </tr>
                        </thead>
                        <tbody>
                        {items}
                        </tbody>
                    </table>
                </article>
            </section>
        </Fragment> 
    )
}

export default Home;