import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB is connected ", conn.connection.host);
  } catch (error) {
    console.log("MongoDB is not connected", error.message);
    process.exit(1);
  }
}