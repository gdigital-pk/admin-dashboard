import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models/User";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: Context) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const { fullName, role, email, password } = body as {
    fullName?: string;
    role?: string;
    email?: string;
    password?: string;
  };

  await connectToDatabase();

  const updates: Record<string, unknown> = {};
  if (fullName !== undefined) updates.fullName = String(fullName).trim();
  if (role !== undefined) updates.role = role;

  if (email !== undefined) {
    const normalized = String(email).trim().toLowerCase();
    const taken = await User.findOne({
      email: normalized,
      _id: { $ne: id },
    }).lean();
    if (taken) {
      return Response.json({ message: "Email already in use." }, { status: 409 });
    }
    updates.email = normalized;
  }

  if (password !== undefined && password !== null && String(password).length > 0) {
    const pwd = String(password);
    if (pwd.length < 6) {
      return Response.json({ message: "Password must be at least 6 characters." }, { status: 400 });
    }
    updates.password = await bcrypt.hash(pwd, 10);
  }

  const updated = await User.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true, runValidators: true },
  ).select("-password");

  if (!updated) {
    return Response.json({ message: "User not found." }, { status: 404 });
  }

  return Response.json(updated);
}

export async function DELETE(_: Request, context: Context) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  await connectToDatabase();
  const deleted = await User.findByIdAndDelete(id);

  if (!deleted) {
    return Response.json({ message: "User not found." }, { status: 404 });
  }

  return Response.json({ message: "User deleted successfully." });
}
