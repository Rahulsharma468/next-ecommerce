import connectDB from "@/config/mongodb";
import User from "@/models/user";
import { validateEmail } from "@/utils/validateEmail";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: any) {
  const { email, password } = await request.json();

  // Validate email format
  if (!validateEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  try {
    // Find user by email
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Login successful
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
