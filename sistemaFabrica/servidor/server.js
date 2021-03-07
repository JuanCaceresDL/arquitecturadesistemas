const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const FriendModel = require("./models/Test");
const TelefonoModel = require("./models/Telefono");

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
  const codigo = req.body.codigo;
  const modelo = req.body.modelo;
  const color = req.body.color; 
  const ram = Number(req.body.ram);
  const memoria = Number(req.body.memoria);
  const procesador = Number(req.body.procesador);
  const cores = Number(req.body.cores);
  const descripcion = req.body.descripcion;
  const precio = Number(req.body.precio);

  try {
    TelefonoModel.findById(id, (err, result) => {
      result.codigo = codigo;
      result.modelo = modelo;
      result.color = color;
      result.ram = ram;
      result.memoria = memoria;
      result.procesador = procesador;
      result.cores = cores;
      result.descripcion = descripcion;
      result.precio = precio;
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

app.listen(3001, () => {
  console.log("You are connected! port 3001");
});
