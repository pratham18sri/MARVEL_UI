import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    avatar: {
      type: String,
    },
    provider: {
      type: String,
      enum: ['github', 'google', 'local'],
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    plan: {
      type: String,
      enum: ['free', 'pro'],
      default: 'free',
    },
    subscriptionId: {
      type: String,
    },
    subscriptionStatus: {
      type: String,
      enum: ['active', 'expired', 'cancelled', 'none'],
      default: 'none',
    },
    subscriptionExpiry: {
      type: Date,
    },
    apiKey: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
