import userRepo from '../repositories/user.repository.js';
import AppError from '../utils/appError.js';
import { emailQueue } from '../jobs/email.queue.js';

class UserService {
  async createUser(payload, requestId) {
    const { name, email, password } = payload;

    const existing = await userRepo.findByEmail(email);
    if (existing) {
      throw new AppError('Email already registered', 409, 'USER_EXISTS');
    }

    const user = await userRepo.create({
      name,
      email,
      passwordHash: password,
    });

    await emailQueue.add(
      'welcome-email',
      {
        userId: user._id.toString(),
        email: user.email,
        requestId,
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      }
    );

    return user;
  }
}

export default new UserService();
