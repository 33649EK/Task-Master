const { Schema, model } = require('mongoose');
const todoSchema = require('./Todo');

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  todos: [todoSchema],
})

const Project = model('Project', projectSchema);

module.exports = Project;