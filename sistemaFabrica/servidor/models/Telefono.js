const mongoose = require("mongoose");

const TelefonoShema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    ram: {
        type: Number,
        required: true
    },
    memoria: {
        type: Number,
        required: true
    },
    procesador: {
        type: String,
        required: true
    },
    cores: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    imagenes: {
        type: [String],
        required: false
    }
});

const TelefonoModel = mongoose.model("telefonos", TelefonoShema);

module.exports = TelefonoModel;
