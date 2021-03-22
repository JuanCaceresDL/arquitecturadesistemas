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
                    <article className="col-sm-12">
                        <form onSubmit={enviarDatos}>

                        <div className="center">
                            <div className="card ">
                                <article className="card-body">
                                <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
                                <p className="text-success text-center" text="${msg}"></p>
                                <div className="input-group input-group-lg">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-user"></i></span>
                                    <input type="text" name="nombre" class="form-control" placeholder="Username" aria-label="Username" autocomplete="off" aria-describedby="basic-addon1"  onChange={handleInputChange}/>
                                </div>
                                <div className="input-group input-group-lg">
                                    <span className="input-group-text" id="basic-addon2"><i className="fa fa-lock"></i></span>
                                    <input type="password" name="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon2" onChange={handleInputChange}/>
                                </div>
                                <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block"> Login  </button>
                                </div>
                                <a href="#" className="btn">Forgot password?</a>
               
                                </article>
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