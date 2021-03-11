const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
    telId: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    ventaTotal: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    cliente: {
        type: String,
        required: true
    },
    fechaCompra: {
        type: Date,
        required: true
    },
    fechaEntrega: {
        type: Date,
        required: true
    }
});

const PedidoModel = mongoose.model("pedidos", PedidoSchema);

module.exports = PedidoModel;
