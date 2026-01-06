import express from 'express';
import { createUser } from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.js';
import { createUserSchema } from '../validators/user.schema.js';

const router = express.Router();

router.post('/', validate(createUserSchema), createUser);

export default router;
