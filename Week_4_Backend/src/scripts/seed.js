import mongoose from 'mongoose';
import config from '../config/index.js';
import logger from '../utils/logger.js';

import Account from '../models/Account.js';
import Order from '../models/Order.js';

async function seed() {
  try {
    logger.info('Starting database seeding...');

    // ---- Connect DB ----
    await mongoose.connect(config.dbUrl);
    logger.info('Database connected for seeding');

    // ---- Clean old data ----
    await Account.deleteMany();
    await Order.deleteMany();
    logger.info('Old data cleared');

    // ---- Create Accounts ----
    const accounts = await Account.insertMany([
      {
        firstName: 'Anay',
        lastName: 'Gupta',
        email: 'anay@example.com',
        password: 'password123',
        status: 'active',
      },
      {
        firstName: 'Rohit',
        lastName: 'Sharma',
        email: 'rohit@example.com',
        password: 'password123',
        status: 'active',
      },
      {
        firstName: 'Neha',
        lastName: 'Verma',
        email: 'neha@example.com',
        password: 'password123',
        status: 'blocked',
      },
      {
        firstName: 'Aman',
        lastName: 'Singh',
        email: 'aman@example.com',
        password: 'password123',
        status: 'active',
      },
      {
        firstName: 'Pooja',
        lastName: 'Mehta',
        email: 'pooja@example.com',
        password: 'password123',
        status: 'active',
      },
      {
        firstName: 'Vivek',
        lastName: 'Singh',
        email: 'vivek@example.com',
        password: 'password123',
        status: 'blocked',
      },
      {
        firstName: 'Aastha',
        lastName: 'Sharma',
        email: 'aastha@example.com',
        password: 'password123',
        status: 'blocked',
      },
      {
        firstName: 'Sunita',
        lastName: 'Verma',
        email: 'sunita@example.com',
        password: 'password123',
        status: 'blocked',
      },
      {
        firstName: 'Arshdeep',
        lastName: 'Singh',
        email: 'arshdeep@example.com',
        password: 'password123',
        status: 'active',
      },
      {
        firstName: 'Celina',
        lastName: 'Sharma',
        email: 'celina@example.com',
        password: 'password123',
        status: 'blocked',
      },
    ]);

    logger.info(`Accounts seeded: ${accounts.length}`);

    // ---- Create Orders ----
    const orders = await Order.insertMany([
      {
        accountId: accounts[0]._id,
        items: [
          {
            productId: new mongoose.Types.ObjectId(),
            productName: 'Wireless Mouse',
            price: 1200,
            quantity: 1,
          },
          {
            productId: new mongoose.Types.ObjectId(),
            productName: 'Mechanical Keyboard',
            price: 4500,
            quantity: 1,
          },
        ],
        totalAmount: 5700,
        status: 'paid',
      },
      {
        accountId: accounts[1]._id,
        items: [
          {
            productId: new mongoose.Types.ObjectId(),
            productName: 'USB-C Hub',
            price: 2200,
            quantity: 2,
          },
        ],
        totalAmount: 4400,
        status: 'shipped',
      },
      {
        accountId: accounts[0]._id,
        items: [
          {
            productId: new mongoose.Types.ObjectId(),
            productName: 'Laptop Stand',
            price: 1800,
            quantity: 1,
          },
        ],
        totalAmount: 1800,
        status: 'pending',
      },
      {
        accountId: accounts[3]._id,
        items: [
          {
            productId: new mongoose.Types.ObjectId(),
            productName: 'Noise Cancelling Headphones',
            price: 9000,
            quantity: 1,
          },
        ],
        totalAmount: 9000,
        status: 'paid',
      },
    ]);

    logger.info(`Orders seeded: ${orders.length}`);

    logger.info('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Seeding failed');
    logger.error(error);
    process.exit(1);
  }
}

seed();
