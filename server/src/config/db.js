import mongoose from 'mongoose';

// Disable buffering so mongoose operations fail immediately if not connected,
// allowing our runWithMockFallback helper to intercept and use the mock database.
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000, // Timeout after 3s instead of 30s
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Server is running in offline warning mode. Please whitelist the container IP in Atlas.');
  }
};

export const runWithMockFallback = async (dbOperation, mockFallback) => {
  if (mongoose.connection.readyState !== 1) {
    return await mockFallback();
  }
  try {
    return await dbOperation();
  } catch (err) {
    console.error('Database operation failed, falling back to mock:', err.message);
    return await mockFallback();
  }
};

export default connectDB;
