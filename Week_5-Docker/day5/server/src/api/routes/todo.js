const express = require('express');
const todoController = require('../controllers/todoController');
const validateInput = require('../middlewares/validateInput');

const route = express.Router();

module.exports = (app) => {
  app.use('/todos', route);

  route.get('/', todoController.getTodos);

  route.post('/', validateInput, todoController.createTodo);
};
