import mongoose from 'mongoose';

try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');
} catch(err) {
    console.error(err)
    throw new Error("Database connection failed");
}
