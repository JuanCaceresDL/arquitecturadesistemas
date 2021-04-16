const mongoose = require("mongoose")

const Clienteschema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    tiempoEntrega: {
        type: Number,
        required: true
    }
});

const ClientesModelo = mongoose.model('clientes', Clienteschema);
module.exports = ClientesModelo;