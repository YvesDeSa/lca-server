import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

    console.log("🔗 MongoDB connected");
  } catch (error) {
    console.error("⛓️‍💥 Error connecting to MongoDB", error);
    process.exit(1); 
  }
};

export default connectDB;
