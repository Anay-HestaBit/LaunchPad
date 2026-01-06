import express from 'express';
import {
  createProduct,
  getProducts,
  deleteProduct,
} from '../controllers/product.controller.js';

import { validate } from '../middlewares/validate.js';
import { createProductSchema } from '../validators/product.schema.js';

const router = express.Router();

router.post('/', validate(createProductSchema), createProduct);

// untouched routes
router.get('/', getProducts);
router.delete('/:id', deleteProduct);

export default router;
