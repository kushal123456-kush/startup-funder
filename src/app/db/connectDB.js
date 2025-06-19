
import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection; // ✅ Avoid reconnecting if already connected
  }

  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // ✅ Prevents long buffering issues
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDb;
