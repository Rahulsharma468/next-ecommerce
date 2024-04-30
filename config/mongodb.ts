import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const URI: any = process.env.NEXT_PUBLIC_MONGODB_URI;
    console.log(URI);
    await mongoose.connect(URI);
    console.log("Connected TO DB");
  } catch (err) {
    console.log("Not Connected TO DB");
    console.log(err);
  }
};

export default connectDB;
