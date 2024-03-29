const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
    todoText: {
        type: String,
        required: true,
        trim: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    todoAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
    },
    });

const Todo = model('Todo', todoSchema);

module.exports = Todo;