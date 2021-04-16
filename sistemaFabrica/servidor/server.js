const Axios = require('axios');
const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const FriendModel = require("./models/Test");
const TelefonoModel = require("./models/Telefono");
const PedidoModel = require("./models/Pedido");
const ClientesModelo = require("./models/Clientes");
const UsuariosModelo = require("./models/Usuarios");
const RegistroModelo = require("./models/Registro");
const RegistroRestModelo = require("./models/RegistroRest");
const ReporteModel = require("./models/Reporte");
//const VentaModelo = require("./models/Venta");

async function saveRestLog(tienda, accion){
  const registro = new RegistroRestModelo({
    tienda: tienda,
    accion: accion,
  });
  await registro.save();
}

app.use(cors());
app.use(express.json());

var infosesion;

/// DATABASE CONNECTION
mongoose.connect(
  "mongodb+srv://admin:Hombresdecultura@clusterproyecto.fqawm.mongodb.net/fabrica?retryWrites=true&w=majority",
  { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }
);

app.get("/insert", async (req, res) => {
  const friend = new FriendModel({ name: "Jorge", age: 19 });
  await friend.save();
  res.send("Inserted DATA");
});

app.get("/read", async (req, res) => {
  const reporte = new ReporteModel({
    telcodigo: "P2020",
    cantidad: 5,
    total: 20,
    fecha: new Date(),
    tienda: "Tigo"
  });
  await reporte.save();
});

//TELEFONOS------------------------------------------------------------------
app.get("/getTelefono/:id", async (req, res) => {
  const id = req.params.id;
  TelefonoModel.findById(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/readTelefono", async (req, res) => {
  TelefonoModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/addTelefono", async (req, res) => {
  const telefono = new TelefonoModel({ 
    telcodigo: req.body.codigo,
    modelo: req.body.modelo,
    color: req.body.color,
    ram: req.body.ram,
    almacenamiento: req.body.memoria,
    procesador: req.body.procesador,
    cores: req.body.cores,
    descripcion: req.body.descripcion,
    preciofabrica: req.body.precio,
    imagenes: req.body.imagenes});
  await telefono.save();
  const registro = new RegistroModelo({
    usuario: infosesion._id,
    accion: "añadió el teléfono con el código:  " + req.body.codigo,
    fecha: new Date()
  });
  await registro.save();
  res.send("Inserted DATA");
});

app.put("/updateTelefono", async (req, res) => {
  const id = req.body._id;
  try {
    TelefonoModel.findById(id, (err, result) => {
      result.telcodigo = req.body.telcodigo;
      result.modelo = req.body.modelo;
      result.color = req.body.color;
      result.ram = Number(req.body.ram);
      result.almacenamiento = Number(req.body.almacenamiento);
      result.procesador = req.body.procesador;
      result.cores = Number(req.body.cores);
      result.descripcion = req.body.descripcion;
      result.preciofabrica = Number(req.body.preciofabrica);
      result.imagenes = req.body.imagenes
      result.save();
    });
    const registro = new RegistroModelo({
      usuario: infosesion._id,
      accion: "modificó el teléfono con el código:  " + req.body.codigo,
      fecha: new Date()
    });
    await registro.save();
  } catch(err){
    console.log(err);
  }
  
  res.send("updated")
});

app.delete("/deleteTelefono/:id", async (req, res) =>{
  const id = req.params.id;
  await TelefonoModel.findByIdAndRemove(id).exec();
  const registro = new RegistroModelo({
    usuario: infosesion._id,
    accion: "eliminó el teléfono  " + id,
    fecha: new Date()
  });
  await registro.save();
  res.send("item deleted");
})

//PEDIDOS---------------------------------------------------------------------
app.get("/getPedido/:id", async (req, res) => {
  const id = req.params.id;
  PedidoModel.findById(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/listPedidos", async (req, res) => {
  PedidoModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
  });

app.post("/addPedido", async (req, res) => {
  
  ClientesModelo.find({nombre: req.body.cliente, estado: "activo"}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let entrega = new Date();
      entrega.setDate(entrega.getDate() + (Number(result[0].tiempoEntrega) * 7));
      const pedido = new PedidoModel({ 
        telcodigo: req.body.telId,
        cantidad: req.body.cantidad,
        total: req.body.ventaTotal,
        cliente: req.body.cliente,
        fechaCompra: new Date(),
        fechaEntrega: entrega,});
      pedido.save();
    }
  })
  
  const registro = new RegistroModelo({
    usuario: infosesion._id,
    accion: "añadió el pedido con el ID:  " + req.body.telId,
    fecha: new Date()
  });
  await registro.save();
  res.send("Inserted DATA");
});

app.put("/updatePedido", async (req, res) => {
  const id = req.body._id;
  const estado = req.body.estado;

  try {
    PedidoModel.findById(id, (err, result) => {
      result.estado = estado;
      result.save();
    });
    const registro = new RegistroModelo({
      usuario: infosesion._id,
      accion: "modificó el pedido con el ID:  " + req.body._id,
      fecha: new Date()
    });
    await registro.save();
  } catch(err){
    console.log(err);
  }
  res.send("updated")
});

//CLIENTES------------------------------------------------------------------

app.post("/insertCliente", async (req, res) => {
  const clientes = new ClientesModelo({ 
    nombre: req.body.nombre,
    url: req.body.url,
    password: req.body.password,
    estado: req.body.estado, 
    tiempoEntrega: Number(req.body.tiempoEntrega)
   });
  await clientes.save();
  const registro = new RegistroModelo({
    usuario: infosesion._id,
    accion: "añadió el cliente con el nombre:  " + req.body.nombre,
    fecha: new Date()
  });
  await registro.save();
  res.send("data insertada");
});

app.get("/getclientes/:id", async (req, res) => {
  const id = req.params.id;
  ClientesModelo.findById(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updateclientes", async (req, res) => {
  const id = req.body._id;
  try {
    ClientesModelo.findById(id, (err, result) => {
      result.nombre = req.body.nombre;
      result.url = req.body.url;
      result.password = req.body.password;
      result.estado = req.body.estado;
      result.save();
    });
    const registro = new RegistroModelo({
      usuario: infosesion._id,
      accion: "modificó el cliente con el nombre:  " + req.body.nombre,
      fecha: new Date()
    });
    await registro.save();
  } catch(err){
    console.log(err);
  }
  res.send("updated")
});

app.get("/readCliente", async (req, res) => {
  ClientesModelo.find({}, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
  });

app.delete("/deleteClientes/:id", async (req, res) =>{
  const id = req.params.id;
  await ClientesModelo.findByIdAndRemove(id).exec();
  const registro = new RegistroModelo({
    usuario: infosesion._id,
    accion: "eliminó el cliente con el ID:  " + req.params.id,
    fecha: new Date()
  });
  await registro.save();
  res.send("item deleted");
})

//USUARIOS------------------------------------------------------------------

app.post("/insertUsuarios", async (req, res) => {
  const usuarios = new UsuariosModelo({ 
    nombre: req.body.nombre,
    password: req.body.password,
    estado: req.body.estado
   });
  await usuarios.save();
  const registro = new RegistroModelo({
    usuario: infosesion._id,
    accion: "añadió el usuario con el nombre:  " + req.body.nombre,
    fecha: new Date()
  });
  await registro.save();
  res.send("data insertada");
});

app.get("/getusuarios/:id", async (req, res) => {
  const id = req.params.id;
  UsuariosModelo.findById(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updateusuarios", async (req, res) => {
  const id = req.body._id;
  
  try {
    UsuariosModelo.findById(id, (err, result) => {
      result.nombre = req.body.nombre;
      result.password = req.body.password;
      result.estado = req.body.estado;
      result.save();
    });
    const registro = new RegistroModelo({
      usuario: infosesion._id,
      accion: "modificó el usuario con el nombre:  " + req.body.nombre,
      fecha: new Date()
    });
    await registro.save();
  } catch(err){
    console.log(err);
  }
  res.send("updated")
});

app.get("/readUsuarios", async (req, res) => {
  UsuariosModelo.find({}, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
  });

app.delete("/deleteUsuarios/:id", async (req, res) =>{
  const id = req.params.id;
  await UsuariosModelo.findByIdAndRemove(id).exec();
  const registro = new RegistroModelo({
    usuario: infosesion._id,
    accion: "eliminó el usuario con el ID:  " + id,
    fecha: new Date()
  });
  await registro.save();
  res.send("item deleted");
})

//LOGIN ------------------------------------------------------


app.get("/login/:nom/:pass", async (req, res) => {
  const nombre = req.params.nom;
  const password = req.params.pass;

  UsuariosModelo.findOne({nombre: nombre, password: password}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if(result){
        if(result.estado === "activo"){
          res.send({msg: "Sesión iniciada", log: true, _id: result._id, nombre: result.nombre, password: result.password, estado: result.estado});
          infosesion = result;
        }else{
          res.send({log: false, msg : "Usuario o contraseña incorrecta"})
        }
      }else{
        res.send({log: false, msg : "Usuario o contraseña incorrecta"})
      }
    }
  });

})

//LOGS----------------------------------------------------
app.get("/registros", async (req, res) => {
  RegistroModelo.find({}, null, {sort: {fecha: 1}}, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
  });

app.get("/registrosRest", async (req, res) => {
  RegistroRestModelo.find({}, null, {sort: {fecha: 1}}, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
  });


//AGGREGATION ---------------------------------------

app.get("/listVentas", async (req, res) => {
  PedidoModel.aggregate([
    {$group: {
      "_id": "$telcodigo",
      "total": {$sum: "$ventaTotal"},
      "cantidad": {$sum: "$cantidad"}
    }}
  ])
  .then((response) => {
    res.send(response)
  })
  .catch((err) => {
    res.send(err);
  })
})

//REPORTES-------------------------
app.get("/restReportes", async (req, res) => {
  Axios.get('http://localhost:8080/reportes?name=Huawei')
      .then((response) => {
          res.send(response.data)
          response.data.map(r => {
            const reporte = new ReporteModel({
              telcodigo: r.telcodigo,
              cantidad: Number(r.cantidad),
              total: Number(r.total),
              fecha: new Date(),
              tienda: r.tienda
            });
            reporte.save();
          })
      }).catch(() => {
          console.log("err")
      })
});

app.get("/getReportes", async (req, res) => {
  
  ReporteModel.find({}, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
  });

//REST-----------------------------------------------
app.get("/test", async (req, res) => {
  res.send([{fabrica: "testhello", puerto: 8080, ip: "190"}])
  });

  app.post("/post", async (req, res) => {
    console.log(req.body);
    res.sendStatus(201)
    });

app.get("/restTelefonos/:us/:pass", async (req, res) => {
  const us = req.params.us;
  const pass = req.params.pass;
  ClientesModelo.exists({nombre: us, password: pass, estado: "activo"}, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if(result){

        TelefonoModel.find({}, (error, resultado) => {
          if (error) {
            res.send(error);
          } else {
            res.send(resultado);
          }
        });
      }
    }
  });
  saveRestLog(us, "Consulta de teléfonos");
});

app.get("/oneTel/:id/:us/:pass", async (req, res) => {
  const id = req.params.id;
  const us = req.params.us;
  const pass = req.params.pass;
  ClientesModelo.exists({nombre: us, password: pass, estado: "activo"}, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if(result){
        TelefonoModel.find({telcodigo: id}, (error, resultado) => {
          if (error) {
            res.send(error);
          } else {
            res.send(resultado);
          }
        });
      }
    }
  });
  saveRestLog(us, "Telefono codigo " + id + " guardado");
});

app.get("/restOrdenes/:us/:pass", async (req, res) => {
  const us = req.params.us;
  const pass = req.params.pass;
  ClientesModelo.exists({nombre: us, password: pass, estado: "activo"}, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if(result){
        PedidoModel.find({cliente: us, $or: [{estado: "Terminado"}, {estado: "Fabricacion"}]}, (error, resultado) => {
          if (error) {
            res.send(error);
          } else {
            var respuesta = resultado.map(r => 
               ({id: r._id, fechaEntrega: r.fechaEntrega, telcodigo: r.telcodigo, cantidad: r.cantidad, fechaCompra: r.fechaCompra, total: r.total, estado: r.estado, fabrica: r.fabrica})
            )
            res.send(respuesta);
          }
        });
      }
    }
  });
  saveRestLog(us, "Consulta de pedidos");
});

app.post("/restActualizarPedido/:us/:pass", async (req, res) => {
  const us = req.params.us;
  const pass = req.params.pass;
  ClientesModelo.exists({nombre: us, password: pass, estado: "activo"}, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if(result){
          PedidoModel.findById(req.body.id, (error, resultado) => {
            if(error){
              console.log(error)
            }else{
              resultado.estado = req.body.estado;
              resultado.save();
            }
          });
        res.sendStatus(201)
      }
    }
  });
  saveRestLog(us, "Pedido " + req.body.estado);
});

app.post("/restAddPedido/:us/:pass", async (req, res) => {
  const us = req.params.us;
  const pass = req.params.pass;
  ClientesModelo.exists({nombre: us, password: pass, estado: "activo"}, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if(result){
        ClientesModelo.find({nombre: us, password: pass, estado: "activo"}, (e, r) => {
          if (e) {
            console.log(e);
          } else {
            let entrega = new Date();
            entrega.setDate(entrega.getDate() + (Number(r[0].tiempoEntrega) * 7));
            const pedido = new PedidoModel({ 
              telcodigo: req.body.telcodigo,
              cantidad: req.body.cantidad,
              total: (req.body.telefono.preciofabrica * req.body.cantidad),
              cliente: req.body.tienda,
              fechaEntrega: entrega,});
            pedido.save();
          }
        })
        res.sendStatus(201)
      }
    }
  });
  saveRestLog(us, "Nuevo pedido de teléfono codigo " + req.body.telcodigo);
});


app.listen(3001, () => {
  console.log("You are connected! port 3001");
});
