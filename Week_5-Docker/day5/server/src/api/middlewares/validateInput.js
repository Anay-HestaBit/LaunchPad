const logger = require('../../utils/logger');

const validateInput = (req, res, next) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    logger.warn('Validation Failed: Missing task text');
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Task text is required',
    });
  }

  next();
};

module.exports = validateInput;
