import mongoose, { ConnectOptions } from "mongoose";

const connectDb = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Mongo connect success");
  } catch (e) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connectDb;
