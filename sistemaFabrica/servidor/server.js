const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const FriendModel = require("./models/Test");
const TelefonoModel = require("./models/Telefono");
const PedidoModel = require("./models/Pedido");

app.use(cors());
app.use(express.json());

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
    precio: req.body.precio});
  await telefono.save();
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
      result.descripcion = req.body.descripcion;;
      result.precio = Number(req.body.precio);
      result.save();
    });
  } catch(err){
    console.log(err);
  }
  res.send("updated")
});

app.delete("/deleteTelefono/:id", async (req, res) =>{
  const id = req.params.id;
  await TelefonoModel.findByIdAndRemove(id).exec();
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
  });
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
  } catch(err){
    console.log(err);
  }
  res.send("updated")
});

app.listen(3001, () => {
  console.log("You are connected! port 3001");
});
