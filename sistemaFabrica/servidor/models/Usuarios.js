const mongoose = require("mongoose")

const Usuarioschema = new mongoose.Schema({
    nombre: {
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
    }
});

const UsuariosModelo = mongoose.model('usuarios', Usuarioschema);
module.exports = UsuariosModelo;