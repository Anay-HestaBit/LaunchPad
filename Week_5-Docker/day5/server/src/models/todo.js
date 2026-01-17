const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please provide task text'],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', TodoSchema);
