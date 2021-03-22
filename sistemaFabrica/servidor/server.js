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
  FriendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
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
  const codigo = req.body.codigo;
  const telefono = new TelefonoModel({ 
    codigo: codigo,
    modelo: req.body.modelo,
    color: req.body.color,
    ram: req.body.ram,
    memoria: req.body.memoria,
    procesador: req.body.procesador,
    cores: req.body.cores,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
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
      result.codigo = req.body.codigo;
      result.modelo = req.body.modelo;
      result.color = req.body.color;
      result.ram = Number(req.body.ram);
      result.memoria = Number(req.body.memoria);
      result.procesador = Number(req.body.procesador);
      result.cores = Number(req.body.cores);
      result.descripcion = req.body.descripcion;
      result.precio = Number(req.body.precio);
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
  const pedido = new PedidoModel({ 
    telId: req.body.telId,
    cantidad: req.body.cantidad,
    ventaTotal: req.body.ventaTotal,
    estado: req.body.estado,
    cliente: req.body.cliente,
    fechaCompra: new Date(req.body.fechaCompra),
    fechaEntrega: new Date(req.body.fechaEntrega),});
  await pedido.save();
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
  const fechaEntrega = req.body.fechaEntrega;

  try {
    PedidoModel.findById(id, (err, result) => {
      result.estado = estado;
      result.fechaEntrega = fechaEntrega;
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
    estado: req.body.estado
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

//PRUEBAS AGGREGATION --------------------------------

//app.get("/listPedidos", (req, res) => {
 // pedidos.aggregate([{
   // $lookup: {
  //    from: 'telefonos',
   //   localField: 'telId',
   //   foreignField: 'id',
   //   as: 'output'
   // }
 // }]).then(result => res.json(result)).catch(err => console.log(err))
//})


app.listen(3001, () => {
  console.log("You are connected! port 3001");
});
