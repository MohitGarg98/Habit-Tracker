const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({

    status: {
        type: String,
        required: true
    },
    button: {
        type: Array, 
        "default": ["Not Done", "Not Done", "Not Done", "Not Done", "Not Done", "Not Done", "Not Done"]
    }
})


const Status = mongoose.model('Status', statusSchema);

module.exports = Status;