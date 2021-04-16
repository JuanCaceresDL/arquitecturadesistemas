const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
    telcodigo: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        required: true,
        default: "Fabricacion"
    },
    cliente: {
        type: String,
        required: true
    },
    fechaCompra: {
        type: Date,
        required: true,
        default: new Date()
    },
    fechaEntrega: {
        type: Date,
        required: true
    },
    fabrica: {
        type: String,
        required: true,
        default: "Huawei"
    }
});

const PedidoModel = mongoose.model("pedidos", PedidoSchema);

module.exports = PedidoModel;
