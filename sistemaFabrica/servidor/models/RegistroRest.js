const mongoose = require("mongoose")

const Registroschema = new mongoose.Schema({
    tienda: {
        type: String,
        required: true
    },
    accion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true,
        default: new Date()
    },
});

const RegistroModelo = mongoose.model('restlog', Registroschema);
module.exports = RegistroModelo;
//