const todoService = require('../../services/todoService');
const logger = require('../../utils/logger');

exports.createTodo = async (req, res, next) => {
  try {
    const { text } = req.body;
    const todo = await todoService.addTodo(text);
    return res.status(201).json(todo);
  } catch (e) {
    logger.error('Error creating todo: %o', e);
    return next(e);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await todoService.getTodos();
    return res.status(200).json(todos);
  } catch (e) {
    logger.error('Error fetching todos: %o', e);
    return next(e);
  }
};
