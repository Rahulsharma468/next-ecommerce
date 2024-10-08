import connectDB from "@/config/mongodb";
import User from "@/models/user";
import { validateEmail } from "@/utils/validateEmail";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { username, email, password } = await request.json();

  console.log(username, email, password);

  // Validate email format
  if (!validateEmail(email)) {
    return NextResponse.json(
      { success: false, message: "Invalid email format" },
      { status: 400 }
    );
  }

  try {
    // Connect to database
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
