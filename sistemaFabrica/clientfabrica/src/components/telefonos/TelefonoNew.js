import React, {useState, Fragment} from 'react';
import Axios from 'axios'

function TelefonoNew() {

    const [datos, setDatos] = useState({
        codigo: '',
        modelo: '',
        color: '',
        ram: '',
        memoria: '',
        procesador: '',
        cores: '',
        descripcion: '',
        precio: ''
      })
      
      const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
      }
      
      const enviarDatos = (event) => {
        event.preventDefault()
        Axios.post('http://localhost:3001/addTelefono', {
            codigo: datos.codigo,
            modelo: datos.modelo,
            color: datos.color,
            ram: Number(datos.ram),
            memoria: Number(datos.memoria),
            procesador: datos.procesador,
            cores: Number(datos.cores),
            descripcion: datos.descripcion,
            precio: Number(datos.precio)}).then(() => {
                alert('Se ha añadido un nuevo teléfono')
            }).catch(() => {
                alert('No se ha podido guardar')
            })
        console.log('enviando datos...' + datos.precio + ' ' + datos.modelo + ' ' + datos.color + ' ' + datos.ram + ' ' + datos.memoria)
      }

    return (
        <Fragment>
            <section className="container">
                <div className="row">
    
                    <article className="col-sm-4 justify-content-center">
                        <a href="/telefonos"><button className="btn btn-secondary">Regresar</button></a>
                    </article>

                    <article className="col-sm-8">
                        <form onSubmit={enviarDatos}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Código</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="codigo" placeholder="Código" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Modelo</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="modelo" placeholder="Modelo" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Color</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="color" placeholder="Color" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Ram</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" name="ram" placeholder="Memora Ram GB" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Almacenamiento</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" name="memoria" placeholder="Almacenamiento GB" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Procesador</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="procesador" placeholder="Procesador" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Cores</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" name="cores" placeholder="Cores" onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Descripción</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="descripcion" placeholder="Descripción" onChange={handleInputChange}/>
                                </div>
                            </div>
                            <br/>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Precio de fábrica</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" name="precio" placeholder="Precio de Fabrica" onChange={handleInputChange}/>
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
  
  export default TelefonoNew;