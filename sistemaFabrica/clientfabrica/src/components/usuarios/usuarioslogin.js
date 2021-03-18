import React, {useState, Fragment} from 'react';
import {useHistory} from "react-router-dom";
import Axios from 'axios'

function UsuariosLogin() {
    const history = useHistory()

    const [datos, setDatos] = useState({
        nombre: '',
        password: ''
      })
    const [usuario, setUsuario] = useState({
        _id : '',
        nombre: '',
        password: ''
    })

      
      const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
      }
      
      const enviarDatos = (event) => {
        event.preventDefault()
        if(datos.nombre != '' && datos.password != ''){
            Axios.get(`http://localhost:3001/login/${datos.nombre}/${datos.password}`)
            .then((response) => {
                if(response.data.log){
                    setUsuario({...usuario, ["_id"]: response.data._id, ["nombre"]: response.data.nombre, ["password"]: response.data.password})
                    alert(response.data.msg)
                }else{
                    alert(response.data.msg)
                }
            }).catch(() => {
                alert('no ha podido iniciar sesión')
            })
        }else{
            alert('Ingrese todos los campos')
        }
      }

    return (
        <Fragment>
            <section className="container">
                <div className="row">
                    <article className="col-sm-8">
                        <form onSubmit={enviarDatos}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Nombre</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="nombre" placeholder="Nombre" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">password</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="password" placeholder="Password" onChange={handleInputChange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-secondary">Iniciar</button>
                            </div>
                            </div>
                        </form>
                    </article>
                </div>
            </section>
        </Fragment>
    );
  }
  
  export default UsuariosLogin;