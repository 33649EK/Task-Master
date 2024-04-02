const { Schema } = require('mongoose');

const todoSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    });

module.exports = todoSchema;