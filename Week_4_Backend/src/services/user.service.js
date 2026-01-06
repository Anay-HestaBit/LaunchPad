import userRepo from '../repositories/user.repository.js';
import AppError from '../utils/appError.js';

class UserService {
  async createUser(payload) {
    const { name, email, password } = payload;

    const existing = await userRepo.findByEmail(email);
    if (existing) {
      throw new AppError('Email already registered', 409, 'USER_EXISTS');
    }

    return userRepo.create({
      name,
      email,
      passwordHash: password,
    });
  }
}

export default new UserService();
