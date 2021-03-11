import React, {useEffect, useState, Fragment} from 'react';
import Axios from 'axios'
import {
  Link
} from "react-router-dom";


function PedidoRead() {

  const [listItems, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [updown, setUpdown] = useState({up: false, sortkey: ""})

  useEffect(() =>{
    Axios.get('http://localhost:3001/listPedidos')
      .then((response) => {
          setList(response.data)
      }).catch(() => {
          alert('ERR')
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const onSort = (event, sortKey) => {
    
    const data = listItems;
    if(updown.up){
      data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]));
      setUpdown({up: false, sortkey: sortKey})
    }else{
      data.sort((a,b) => b[sortKey].localeCompare(a[sortKey]));
      setUpdown({up: true, sortkey: sortKey})
    }
    setList(data);
  }

  const items = listItems.filter((data)=>{
    if(search === "")
        return data
    else if(data._id.toLowerCase().includes(search.toLowerCase())){
        return data
    }
  }).map((p, index)=>{
    return(
      <tr key={index}>
        <th scope="row">{p._id}</th>
        <td>{p.estado}</td>
        <td>{p.cliente}</td>
        <td>{(new Date(p.fechaCompra)).toLocaleDateString()}</td>
        <td>{(new Date(p.fechaEntrega)).toLocaleDateString()}</td>
        <td className="d-flex justify-content-center">
          <Link to={`/pedidos/edit/${p._id}`}><button className="btn btn-info"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></Link>
        </td>
      </tr>
    )
  })

    return (
      <Fragment>
        <section className="container">
          <center>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="fa fa-search" aria-hidden="true"></i></span>
              </div>
              <input onChange={handleSearch} type="text" class="form-control" placeholder="Busqueda" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
          </center>
        </section>

        <section className="table-responsive container-fluid">
          <table className="table table-striped table-hover table-sm">
            <thead className="thead-dark">
              <tr>
                <th scope="col" onClick={e => onSort(e, "_id")}>ID <i hidden={"_id" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                <th scope="col" onClick={e => onSort(e, "estado")}>Estado <i hidden={"estado" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                <th scope="col" onClick={e => onSort(e, "cliente")}>cliente <i hidden={"cliente" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                <th scope="col" onClick={e => onSort(e, "fechaCompra")}>FechaCompra <i hidden={"fechaCompra" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                <th scope="col" onClick={e => onSort(e, "fechaEntrega")}>FechaEntrega <i hidden={"fechaEntrega" === updown.sortkey ? false : true} className={updown.up ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i></th>
                <th scope="col" className="d-flex justify-content-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
        </section>
      </Fragment>
    );
  }
  
  export default PedidoRead;