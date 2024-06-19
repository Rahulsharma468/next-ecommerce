import connectDB from "@/config/mongodb";
import User from "@/models/user";
import { validateEmail } from "@/utils/validateEmail";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: any) {
  const { username, email, password } = await request.json();

  // Validate input fields
  if (!username || !email || !password) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  // Validate email format
  if (!validateEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  try {
    // Check if the user already exists
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 400 }
      );
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    await User.create({ username, email, password: hashedPassword });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
