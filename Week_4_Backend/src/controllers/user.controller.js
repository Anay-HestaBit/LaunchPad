import userService from '../services/user.service.js';

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

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
