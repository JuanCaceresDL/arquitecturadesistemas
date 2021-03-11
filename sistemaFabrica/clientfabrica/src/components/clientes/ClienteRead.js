import React, {useEffect, useState, Fragment} from 'react';
import Axios from 'axios'
import {
  Link
} from "react-router-dom";


function ClienteRead() {

  const [listClientes, setList] = useState([]);

  useEffect(() =>{
    Axios.get('http://localhost:3001/readCliente')
      .then((response) => {
          setList(response.data)
      }).catch(() => {
          alert('ERR')
      })
  }, [])

  const deletecli = (id) => {
    Axios.delete(`http://localhost:3001/deleteClientes/${id}`).then(() =>{
      setList(listClientes.filter(val => 
         val._id !== id
      ))
    }).catch(() => {
      alert("No se pudo borrar el elemento")
    })
  }

    return (
      <Fragment>
        <section className="table-responsive container-fluid">
          <table className="table table-striped table-hover table-sm">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Url</th>
                <th scope="col">Password</th>
                <th scope="col" className="d-flex justify-content-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listClientes.map(cli => {
                return <tr>
                  <th scope="row">{cli.nombre}</th>
                  <td>{cli.url}</td>
                  <td>{cli.password}</td>
                  <td className="d-flex justify-content-center">
                    <Link to={`/clientes/edit/${cli._id}`}><button className="btn btn-info"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></Link>
                    &nbsp;
                    <button onClick={() => {deletecli(cli._id)}} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button>
                    &nbsp;
                </td>
                </tr>
              })}
            </tbody>
          </table>
        </section>
      </Fragment>
    );
  }
  
  export default ClienteRead;