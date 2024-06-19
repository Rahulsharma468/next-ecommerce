import mongoose, { Schema } from "mongoose";

// Define the User schema
const UserSchema = new Schema(
  {
    // Common user fields
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
    // User role field
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // Additional admin fields
    adminInfo: {
      // Add any admin-specific fields here
      isAdmin: {
        type: Boolean,
        default: false,
      },
      // Example: Admin-specific permissions
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
