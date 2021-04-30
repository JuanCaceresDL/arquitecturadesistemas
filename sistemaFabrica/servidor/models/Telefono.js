const {fabricaActual} = require("../../configuration")
const mongoose = require("mongoose");

const TelefonoShema = new mongoose.Schema({
    telcodigo: {
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
    almacenamiento: {
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
    preciofabrica: {
        type: Number,
        required: true
    },
    imagenes: {
        type: [String],
        required: false
    },
    fabrica: {
        type: String,
        default: fabricaActual
    }
});

const TelefonoModel = mongoose.model("telefonos", TelefonoShema);

module.exports = TelefonoModel;
