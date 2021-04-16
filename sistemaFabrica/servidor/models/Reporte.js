const mongoose = require("mongoose");

const ReporteSchema = new mongoose.Schema({
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
    fecha: {
        type: Date,
        required: true
    },
    tienda: {
        type: String,
        required: true
    }
});

const ReporteModel = mongoose.model("reportes", ReporteSchema);

module.exports = ReporteModel;
