import React, {useState, Fragment, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {urlNode} from '../publicElements/Url'
import Axios from 'axios'

function PedidoNew() {

    const history = useHistory()

    const [datos, setDatos] = useState({
        telcodigo: '',
        cantidad: '',
        ventaTotal: '',
        estado: 'Fabricacion',
        cliente: '1',
      })
    
    const [valor, setValor] = useState(0);
    const [tel, setTel] = useState([]);
    const [cli, setCli] = useState([]);

    useEffect(() =>{
    Axios.get(urlNode() + '/readTelefono')
        .then((response) => {
            setTel(response.data)
        }).catch(() => {
            alert('ERR Telefonos')
        })

        Axios.get(urlNode() + '/readCliente')
        .then((response) => {
            setCli(response.data)
        }).catch(() => {
            alert('ERR Clientes')
        })
    }, [])

    useEffect(() =>{
        setValor(valor)
        }, [valor])
      
      const handleInputChange = (event) => {
          if(event.target.name === "telcodigo" && event.target.value === ""){
            setValor(0);
          }
          if(event.target.name === "telcodigo" && event.target.value !== "" && datos.cantidad !== ""){
            let telActual = tel.filter(t => t._id === event.target.value)[0];
            setValor(telActual.precio * Number(datos.cantidad));
          }
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
      }

      const setTotal = (event) => {
          if(datos.telcodigo !== ""){
          var telActual = tel.filter(t => t._id === datos.telcodigo)[0];
          setValor(telActual.preciofabrica * Number(event.target.value));
        }
      }
      
      const enviarDatos = (event) => {
        event.preventDefault()
        let fc = new Date(datos.fechaCompra);
        let fe = new Date(datos.fechaEntrega);
        var telActual = tel.filter(t => t._id === datos.telcodigo)[0];
        Axios.post(urlNode() + '/addPedido', {
            telId: telActual.telcodigo,
            cantidad: Number(datos.cantidad),
            ventaTotal: valor,
            estado: datos.estado,
            cliente: datos.cliente,
            fechaCompra: fc.setDate(fc.getDate() + 1),
            fechaEntrega: fe.setDate(fe.getDate() + 1)}).then(() => {
                alert('Se ha añadido un nuevo pedido')
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
                                <label className="col-sm-2 col-form-label">Código teléfono</label>
                                <div className="col-sm-10">
                                    <select onChange={handleInputChange} className="form-control" name="telcodigo">
                                        <option value="">Telefonos</option>
                                        {tel.map((t, index) => <option key={index} value={t._id}>{t.telcodigo}</option>)}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Cantidad</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control" name="cantidad" placeholder="cantidad" onInput={setTotal} onChange={handleInputChange} autoComplete="off"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Total</label>
                                <div className="col-sm-10">
                                    <input type="text" disabled={true} className="form-control" name="ventaTotal" placeholder="Total" value={valor}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Cliente</label>
                                <div className="col-sm-10">
                                    <select onChange={handleInputChange} className="form-control" name="cliente">
                                        <option value="">Seleccione un cliente</option>
                                        {cli.filter(c => c.estado === "activo").map((c, index) => <option key={index} value={c.nombre}>{c.nombre}</option>)}
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
  
  export default PedidoNew;