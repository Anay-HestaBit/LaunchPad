import userService from '../services/user.service.js';
import logger from '../utils/logger.js';

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body, req.requestId);
    logger.info({ requestId: req.requestId, userId: user._id }, 'User created');

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};
