import React, {useState, Fragment} from 'react';
import {useHistory} from "react-router-dom";
import Axios from 'axios'
import {urlNode} from './components/publicElements/Url'

function Login() {

    const history = useHistory();
    if(localStorage.getItem('login') === 'true'){
      history.push('/home')
    }

    const [datos, setDatos] = useState({
        nombre: '',
        password: ''
      })

    const [msg, setMsg] = useState("");

      
      const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
      }
      
      const enviarDatos = (event) => {
        event.preventDefault()
        if(datos.nombre !== '' && datos.password !== ''){
            Axios.get(urlNode() + `/login/${datos.nombre}/${datos.password}`)
            .then((response) => {
                if(response.data.log){
                    setMsg(response.data.msg);
                    localStorage.setItem('login', 'true');
                    localStorage.setItem('nombre', response.data.nombre);
                    history.push(`/Home`);
                }else{
                    setMsg(response.data.msg);
                }
            }).catch(() => {
                setMsg('no ha podido iniciar sesión')
            })
        }else{
            setMsg('Ingrese todos los campos');
        }
      }

    return (
        <Fragment>
            <div className="centrar-vertical">
                <div className="card ">
                    <article className="card-body">
                        <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
                        <hr/>
                        <p className="text-success text-center" >{msg}</p>
                        <form onSubmit={enviarDatos}>
                        <div className="input-group input-group-lg">
                            <span className="input-group-text" id="basic-addon1"><i className="fa fa-user"></i></span>
                            <input type="text" name="nombre" className="form-control" placeholder="Username" aria-label="Username" autoComplete="off" aria-describedby="basic-addon1" onChange={handleInputChange} />
                        </div><br/>
                        <div className="input-group input-group-lg">
                            <span className="input-group-text" id="basic-addon2"><i className="fa fa-lock"></i></span>
                            <input type="password" name="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon2" onChange={handleInputChange}/>
                        </div><br/>
                        <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block"> Login  </button>
                        </div>
                        </form>
                    </article>
                </div>
            </div>
        </Fragment>
    );
  }
  
  export default Login;