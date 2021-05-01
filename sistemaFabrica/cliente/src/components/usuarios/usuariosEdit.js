import React, {useState, Fragment, useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import {urlNode} from '../publicElements/Url'
import Axios from 'axios'

function UsuariosEdit() {

    let { id } = useParams();
    const history = useHistory()

    const [datos, setDatos] = useState({
        nombre: '',
        password: '',
        estado: '',
        _id:'',
        __v: ''
      })

    useEffect(() =>{

        Axios.get(urlNode() + `/getusuarios/${id}`).then((response) => {
              setDatos(response.data)
          }).catch(() => {
              alert('ERR')
          })
      }, [])

    
      
      const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
      }
      
      const enviarDatos = (event) => {
        event.preventDefault()
        Axios.put(urlNode() + '/updateusuarios', datos).then(() => {
                alert('Se ha actualizado correctamente')
                history.push("/usuarios");
            }).catch(() => {
                alert('No se ha podido actualizar')
            })
      }

    return (
        <Fragment>
            <section className="container">
                <div className="row">
    
                    <article className="col-sm-4 justify-content-center">
                        <a href="/usuarios"><button className="btn btn-secondary">Regresar</button></a>
                    </article>

                    <article className="col-sm-8">
                        <form onSubmit={enviarDatos}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Nombre</label>
                                <div className="col-sm-10">
                                    <input type="text" value={datos.nombre} className="form-control" name="nombre" placeholder="Nombre" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="text" value={datos.password} className="form-control" name="password" placeholder="Password" onChange={handleInputChange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Estado</label>
                                <div className="col-sm-10">
                                    <select onChange={handleInputChange} value={datos.estado}  className="form-control" name="estado">
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
  
  export default UsuariosEdit;