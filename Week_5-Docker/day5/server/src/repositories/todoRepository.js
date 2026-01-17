const Todo = require('../models/todo');

class TodoRepository {
  async create(todoData) {
    const todo = new Todo(todoData);
    return await todo.save();
  }

  async findAll() {
    return await Todo.find().sort({ createdAt: -1 }); // Newest first
  }
}

module.exports = new TodoRepository();
