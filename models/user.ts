import mongoose, { Schema } from "mongoose";

// Define the User schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    adminInfo: {
      isAdmin: {
        type: Boolean,
        default: false,
      },
      permissions: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create the User model
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
