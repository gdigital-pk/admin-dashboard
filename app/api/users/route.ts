import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models/User";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const users = await User.find().select("-password").sort({ createdAt: -1 });

  return Response.json(users);
}
