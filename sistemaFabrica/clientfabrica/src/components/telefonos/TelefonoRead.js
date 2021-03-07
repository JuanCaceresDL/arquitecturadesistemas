import React, {useEffect, useState, Fragment} from 'react';
import Axios from 'axios'
import {
  Link
} from "react-router-dom";


function TelefonoRead() {

  const [listTelefonos, setList] = useState([]);

  useEffect(() =>{
    Axios.get('http://localhost:3001/readTelefono')
      .then((response) => {
          setList(response.data)
      }).catch(() => {
          alert('ERR')
      })
  }, [])

  const deleteTel = (id) => {
    Axios.delete(`http://localhost:3001/deleteTelefono/${id}`).then(() =>{
      setList(listTelefonos.filter(val => 
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
                <th scope="col">Codigo</th>
                <th scope="col">Modelo</th>
                <th scope="col">Descripción</th>
                <th scope="col">Precio</th>
                <th scope="col" className="d-flex justify-content-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listTelefonos.map(tel => {
                return <tr>
                  <th scope="row">{tel.codigo}</th>
                  <td>{tel.modelo}</td>
                  <td>{tel.descripcion}</td>
                  <td>{tel.precio}</td>
                  <td className="d-flex justify-content-center">
                    <Link to={`/telefonos/edit/${tel._id}`}><button className="btn btn-info"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></Link>
                    &nbsp;
                    <button onClick={() => {deleteTel(tel._id)}} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button>
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
  
  export default TelefonoRead;