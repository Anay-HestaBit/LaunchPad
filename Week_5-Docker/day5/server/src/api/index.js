const express = require('express');
const todoRoute = require('./routes/todo');

module.exports = () => {
  const app = express.Router();
  todoRoute(app);

  return app;
};
