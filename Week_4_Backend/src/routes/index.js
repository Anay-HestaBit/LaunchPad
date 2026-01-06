import productRoutes from './product.routes.js';
import userRoutes from '../routes/user.routes.js';
export default function mountRoutes(app) {
  app.use('/users', userRoutes);
  app.use('/products', productRoutes);

  return 2;
}
