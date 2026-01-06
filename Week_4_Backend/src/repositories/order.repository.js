import Order from '../models/Order.js';

class OrderRepository {
  // CREATE
  create(data) {
    return Order.create(data);
  }

  findById(id) {
    return Order.findById(id).populate('accountId');
  }

  // SKIP / LIMIT PAGINATION (basic)
  findPaginated({ page = 1, limit = 10, status }) {
    const query = status ? { status } : {};

    return Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  }

  // CURSOR-BASED PAGINATION
  findByCursor({ limit = 10, status, cursor }) {
    const query = {};

    if (status) {
      query.status = status;
    }

    if (cursor) {
      query.createdAt = { $lt: cursor };
    }

    return Order.find(query).sort({ createdAt: -1 }).limit(limit);
  }

  update(id, data) {
    return Order.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id) {
    return Order.findByIdAndDelete(id);
  }
}

export default new OrderRepository();
