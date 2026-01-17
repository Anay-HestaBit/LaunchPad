const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../api');

module.exports = ({ app }) => {
  app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  app.use('/api', routes());

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  });
};
