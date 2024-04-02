const { Schema, model } = require('mongoose');
const todoSchema = require('./Todo');

const projectSchema = new Schema({
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  todos: [todoSchema],
})

const Project = model('Project', projectSchema);

module.exports = Project;