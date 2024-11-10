import connectMongoDB from "utils/mongodb";
import User from "models/User";
import bcrypt from "bcryptjs";

export default async function handler(req: any, res: any) {
  await connectMongoDB();

  if (req.method === "POST") {

    console.log(req.body);

    const { email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || "user", // default role as 'user'
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
