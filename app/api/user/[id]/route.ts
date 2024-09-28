import connectDB from "@/config/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(request: any, { params }: any) {
  const { id } = params;

  try {
    // Connect to the database
    await connectDB();

    // Find the user by userId
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return the userDetails
    return NextResponse.json(
      { message: "User details fetched", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: any, { params }: any) {
  const { userId } = params;
  const { username, email, password } = req.body;

  try {
    // Connect to the database
    await connectDB();

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update user details
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      // Encrypt the new password
      user.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user
    await user.save();

    return NextResponse.json(
      { message: "User details updated successfully", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user details:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
