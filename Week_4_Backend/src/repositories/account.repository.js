import Account from '../models/Account.js';

class AccountRepository {
  create(data) {
    return Account.create(data);
  }

  findById(id) {
    return Account.findById(id);
  }

  findPaginated({ page = 1, limit = 10, status }) {
    const query = status ? { status } : {};

    return Account.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  }

  update(id, data) {
    return Account.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id) {
    return Account.findByIdAndDelete(id);
  }
}

export default new AccountRepository();
