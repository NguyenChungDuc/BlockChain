const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    card: {
        type: String,
        required: true,
    },
    diagnosis: {
        type: String,
        required: true,
    },
    doctor: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Patient', patientSchema);