import React, {useEffect, useState, Fragment} from 'react';
import {highlightText} from '../publicElements/functions'
import Axios from 'axios'
import {
  Link
} from "react-router-dom";


function UsuariosRead() {

  const [listUsuarios, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [updown, setUpdown] = useState({up: false, sortkey: ""})

  useEffect(() =>{
    Axios.get('http://localhost:3001/readUsuarios')
      .then((response) => {
          setList(response.data)
      }).catch(() => {
          alert('ERR')
      })
  }, [])

  const deleteus = (id) => {
    Axios.delete(`http://localhost:3001/deleteUsuarios/${id}`).then(() =>{
      setList(listUsuarios.filter(val => 
         val._id !== id
      ))
    }).catch(() => {
      alert("No se pudo borrar el elemento")
    })
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const onSort = (event, sortKey) => {
    
    const data = listUsuarios;
    if(updown.up){
      data.sort((a,b) => a[sortKey].toString().localeCompare(b[sortKey]));
      setUpdown({up: false, sortkey: sortKey})
    }else{
      data.sort((a,b) => b[sortKey].toString().localeCompare(a[sortKey]));
      setUpdown({up: true, sortkey: sortKey})
    }
    setList(data);
  }

  const items = listUsuarios.filter((data)=>{
    if(search === "")
        return data
    else if(data.nombre.toLowerCase().includes(search.toLowerCase()) || 
    data.password.toLowerCase().includes(search.toLowerCase()) || 
    data.estado.toLowerCase().includes(search.toLowerCase())){
        return data
    }
  }).map((us, index)=>{
    return(
      <tr key={index}>
        <th>{highlightText(us.nombre, search)}</th>
        <td>{highlightText(us.password, search)}</td>
        <td>{highlightText(us.estado, search)}</td>
        <td className="d-flex justify-content-center">
          <Link to={`/usuarios/edit/${us._id}`}><button className="btn btn-info"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></Link>
          &nbsp;
          <button onClick={() => {deleteus(us._id)}} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button>
          &nbsp;
      </td>
      </tr>
    )
  })

    return (
      <Fragment>
        <section className="container">
          <center>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></span>
              </div>
              <input onChange={handleSearch} type="text" class="form-control" placeholder="Busqueda" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
          </center>
        </section>

        <section className="table-responsive container-fluid">
          <table className="table table-striped table-hover table-sm">
            <thead className="thead-dark">
              <tr>
                <th scope="col" onClick={e => onSort(e, "nombre")}>Nombre <i hidden={"nombre" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                <th scope="col" onClick={e => onSort(e, "password")}>Password <i hidden={"password" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                <th scope="col" onClick={e => onSort(e, "estado")}>Estado <i hidden={"estado" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                <th scope="col" className="d-flex justify-content-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
        </section>
      </Fragment>
    );
  }
  
  export default UsuariosRead;