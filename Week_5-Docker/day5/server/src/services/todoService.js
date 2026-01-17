const todoRepository = require('../repositories/todoRepository');
const logger = require('../utils/logger');

class TodoService {
  async addTodo(text) {
    logger.info(`Creating new todo: ${text}`);
    return await todoRepository.create({ text });
  }

  async getTodos() {
    return await todoRepository.findAll();
  }
}

module.exports = new TodoService();
