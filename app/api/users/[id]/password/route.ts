import { User } from "@/lib/models/User";

export async function PATCH(req: Request, { params }: any) {
  try {
    const { password } = await req.json();

    if (!password || password.length < 6) {
      return Response.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    await User.findByIdAndUpdate(params.id, {
      password,
    });

    return Response.json({ message: "Password updated" });
  } catch (err) {
    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}