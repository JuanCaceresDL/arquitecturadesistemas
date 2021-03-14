import React, {useState, Fragment, useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import Axios from 'axios'

function TelefonoEdit() {

    let { id } = useParams();
    const history = useHistory()

    const [imgs, setImg] = useState([]);
    const [datos, setDatos] = useState({
        codigo: '',
        modelo: '',
        color: '',
        ram: '',
        memoria: '',
        procesador: '',
        cores: '',
        descripcion: '',
        precio: '',
        imagenes: [],
        _id:'',
        __v: '',
        actualImagen :''
      })

    useEffect(() =>{

        Axios.get(`http://localhost:3001/getTelefono/${id}`).then((response) => {
              setDatos(response.data)
              setImg(response.data.imagenes)
          }).catch(() => {
              alert('ERR')
          })
      }, [])

    useEffect(() => {
        setDatos({...datos, ["imagenes"] : imgs});
    }, [imgs])
      
      const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
      }
      
      const enviarDatos = (event) => {
        event.preventDefault()
        Axios.put('http://localhost:3001/updateTelefono', datos).then(() => {
                alert('Se ha actualizado correctamente')
                history.push("/telefonos");
            }).catch(() => {
                alert('No se ha podido actualizar')
            })
      }

      const enviarImagen = (event) => {
        event.preventDefault();
        if(datos.actualImagen !== ""){
            setImg([...imgs, datos.actualImagen])
            setDatos({...datos, ["actualImagen"] : ''});
        }
      }

      const deleteImagen = (index) =>{
          setImg(i => i.filter((m, ind) => ind !== index));
      }

    return (
        <Fragment>
            <section className="container">
                <div className="row">
    
                    <article className="col-sm-4 justify-content-center">
                        <center>
                            <h3>Imagenes</h3>
                            <form onSubmit={enviarImagen} class="d-flex justify-content-center">
                                <input className="form-control" name="actualImagen" placeholder="Imagen Url" value={datos.actualImagen} autoComplete="off" onChange={handleInputChange}/>
                                <br/>
                                <button className="btn btn-secondary" type="submit"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                            </form>
                            <br/>
                            {imgs.map((i, index) => 
                                <div key={index} className="divImg">
                                    <img className="imagen" src={i} alt="img" /><br/>
                                    <button onClick={() => deleteImagen(index)} className="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                </div>
                            )}   
                        </center>
                    </article>

                    <article className="col-sm-8">
                        <form onSubmit={enviarDatos}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Código</label>
                                <div className="col-sm-10">
                                    <input type="text" value={datos.codigo} className="form-control" name="codigo" placeholder="Código" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Modelo</label>
                                <div className="col-sm-10">
                                    <input type="text" value={datos.modelo} className="form-control" name="modelo" placeholder="Modelo" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Color</label>
                                <div className="col-sm-10">
                                    <input type="text" value={datos.color} className="form-control" name="color" placeholder="Color" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Ram</label>
                                <div className="col-sm-10">
                                    <input type="number" value={datos.ram} className="form-control" name="ram" placeholder="Memora Ram GB" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Almacenamiento</label>
                                <div className="col-sm-10">
                                    <input type="number" value={datos.memoria} className="form-control" name="memoria" placeholder="Almacenamiento GB" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Procesador</label>
                                <div className="col-sm-10">
                                    <input type="text" value={datos.procesador} className="form-control" name="procesador" placeholder="Procesador" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Cores</label>
                                <div className="col-sm-10">
                                    <input type="number" value={datos.cores} className="form-control" name="cores" placeholder="Cores" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Descripción</label>
                                <div className="col-sm-10">
                                    <input type="text" value={datos.descripcion} className="form-control" name="descripcion" placeholder="Descripción" onChange={handleInputChange}/>
                                </div>
                            </div>
                            <br/>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Precio de fábrica</label>
                                <div className="col-sm-10">
                                    <input type="text" value={datos.precio} className="form-control" name="precio" placeholder="Precio de Fabrica" onChange={handleInputChange}/>
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
  
  export default TelefonoEdit;