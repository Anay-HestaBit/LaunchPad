import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
      index: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();

  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

const User = mongoose.model('User', userSchema);
export default User;
