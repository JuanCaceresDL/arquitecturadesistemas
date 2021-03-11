import React, {useState, Fragment, useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import Axios from 'axios'

function PedidoNew() {
    
    let { id } = useParams();
    const history = useHistory()

    const [datos, setDatos] = useState({
        telId: '',
        cantidad: '',
        ventaTotal: '',
        estado: 'Fabricacion',
        cliente: '1',
        fechaCompra: '',
        fechaEntrega: '',
      })
    
    useEffect(() =>{

    Axios.get(`http://localhost:3001/getPedido/${id}`).then((response) => {
        let dat = response.data;
        let newData = {
            telId: dat.telId,
            cantidad: dat.cantidad,
            ventaTotal: dat.ventaTotal,
            estado: dat.estado,
            cliente: dat.cliente,
            fechaCompra: formatoFechas(dat.fechaCompra),
            fechaEntrega: formatoFechas(dat.fechaEntrega),
        }
            setDatos(newData)
        }).catch(() => {
            alert('No se pudo obtener el pedido')
        })
    }, [])
      
    const handleInputChange = (event) => {
    setDatos({
        ...datos,
        [event.target.name] : event.target.value
    })
    }

    const formatoFechas = (fechaS) => {
        let fecha = new Date(fechaS)
        let day = fecha.getDate();
        let month = fecha.getMonth() + 1;
        let year = fecha.getFullYear();
        if(month >= 1 && month <= 9){
            month = `0${month}`;
        }
        if(day > 0 && day < 9){
            day = `0${day}`;
        }
        return `${year}-${month}-${day}`;
    }
      
      const enviarDatos = (event) => {
        event.preventDefault()
        Axios.put('http://localhost:3001/updatePedido', {
            _id: id,
            estado: datos.estado,
            fechaEntrega: Date(datos.fechaEntrega)}).then(() => {
                alert('Se ha modificado el pedido')
                history.push("/pedidos")
            }).catch(() => {
                alert('No se ha podido guardar')
            })
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
                                <label className="col-sm-2 col-form-label">Codigo Teléfono</label>
                                <div className="col-sm-10">
                                    <label className="form-control" ><a href={`/telefonos/edit/${datos.telId}`}>{datos.telId}</a></label>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Cantidad</label>
                                <div className="col-sm-10">
                                    <input type="number" disabled={true} className="form-control" value={datos.cantidad}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Total</label>
                                <div className="col-sm-10">
                                    <input type="text" disabled={true} className="form-control" value={datos.ventaTotal}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Codigo Teléfono</label>
                                <div className="col-sm-10">
                                    <label className="form-control" ><a href={`/clientes/edit/${datos.cliente}`}>{datos.cliente}</a></label>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Estado</label>
                                <div className="col-sm-10">
                                    <select onChange={handleInputChange} className="form-control" name="estado">
                                        <option value="Fabriacion">Fabricación</option>
                                        <option value="Terminado">Terminado</option>
                                        <option value="Entregado">Entregado</option>
                                        <option value="Cancelado">Cancelado</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Fecha de compra</label>
                                <div className="col-sm-10">
                                    <input disabled={true} type="date" className="form-control" value={datos.fechaCompra}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Fecha de entrega</label>
                                <div className="col-sm-10">
                                    <input type="date" className="form-control" name="fechaEntrega" value={datos.fechaEntrega} placeholder="Fecha de entrega" onChange={handleInputChange} />
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
  
  export default PedidoNew;