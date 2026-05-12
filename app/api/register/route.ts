import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, password, role } = body;
    console.log("line 9", body)
    if (!fullName || !email || !password) {
      return Response.json({ message: "Required fields are missing." }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json({ message: "Password must be at least 6 characters." }, { status: 400 });
    }

    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ message: "Email already registered." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: role || "viewer",
    });

    return Response.json({ message: "User registered successfully." }, { status: 201 });
  } catch {
    return Response.json({ message: "Failed to register user." }, { status: 500 });
  }
}
