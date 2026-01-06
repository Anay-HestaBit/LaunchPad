import AppError from '../utils/appError.js';

export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);

    req.body = parsed;

    next();
  } catch (error) {
    next(new AppError('Invalid request payload', 400, 'VALIDATION_ERROR'));
  }
};
