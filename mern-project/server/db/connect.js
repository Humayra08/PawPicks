import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // MongoDB connection using the URI from the .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDb;
