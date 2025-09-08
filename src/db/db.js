import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connection successful.");
  } catch (e) {
    console.log("Error connecting to db.");
  }
};

export default connectToDB;
