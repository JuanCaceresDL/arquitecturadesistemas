const mongoose = require("mongoose")

const Registroschema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    accion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
});

const RegistroModelo = mongoose.model('log', Registroschema);
module.exports = RegistroModelo;
