const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({

    habit: {
        type: String,
        required: true
    },
    status: {
        type: Array, 
        "default": ["Not Done", "Not Done", "Not Done", "Not Done", "Not Done", "Not Done", "Not Done"]
    }
})

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;