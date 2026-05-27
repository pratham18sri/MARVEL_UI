import mongoose from 'mongoose';

const propDocSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  default: { type: String, default: '' },
  description: { type: String, default: '' },
  required: { type: Boolean, default: false }
}, { _id: false });

const componentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    tags: [String],
    tier: {
      type: String,
      enum: ['free', 'pro'],
      default: 'free',
    },
    previewCode: {
      type: String,
      required: true,
    },
    componentCode: {
      type: String,
      required: true,
    },
    installCode: {
      type: String,
      default: '',
    },
    usageCode: {
      type: String,
      default: '',
    },
    dependencies: [String],
    props: [propDocSchema],
    thumbnailUrl: {
      type: String,
      default: '',
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    copyCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Component = mongoose.model('Component', componentSchema);
export default Component;
