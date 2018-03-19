// Adds a layer of methods to easily save, edit retreive and delete data from the MongoDB
// Allows us to create our Models and Schemas easily
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create todo Schema & model
const TodoSchema = new Schema({
  task: {
    type: String,
    required: [true, 'Todo field is required']
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});

// Todo model represents the todo collection in the database
// MongDB will pluralize 'todo' to 'todo's' collection
const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;
