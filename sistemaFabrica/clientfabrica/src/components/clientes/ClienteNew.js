import React, {useState, Fragment} from 'react';
import {useHistory} from "react-router-dom";
import Axios from 'axios'

function ClienteNew() {
    const history = useHistory()

    const [datos, setDatos] = useState({
        nombre: '',
        url: '',
        password: '',
        estado: ''
      })
      
      const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
      }
      
      const enviarDatos = (event) => {
        event.preventDefault()
        Axios.post('http://localhost:3001/insertCliente', {
            nombre: datos.nombre,
            url: datos.url,
            password: datos.password,
            estado: datos.estado}).then(() => {
                alert('Se ha añadido un nuevo cliente')
                history.push("/clientes")
            }).catch(() => {
                alert('No se ha podido guardar')
            })
      }

    return (
        <Fragment>
            <section className="container">
                <div className="row">
    
                    <article className="col-sm-4 justify-content-center">
                        <a href="/clientes"><button className="btn btn-secondary">Regresar</button></a>
                    </article>

                    <article className="col-sm-8">
                        <form onSubmit={enviarDatos}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Nombre</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="nombre" placeholder="Nombre" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">url</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="url" placeholder="Url" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">password</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="password" placeholder="Password" onChange={handleInputChange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Estado</label>
                                <div className="col-sm-10">
                                    <select onChange={handleInputChange} className="form-control" name="estado">
                                        <option value="">seleccione</option>
                                        <option value="activo">activo</option>
                                        <option value="inactivo">inactivo</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-secondary">Agregar</button>
                            </div>
                            </div>
                        </form>
                    </article>
                </div>
            </section>
        </Fragment>
    );
  }
  
  export default ClienteNew;