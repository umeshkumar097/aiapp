import { NextRequest, NextResponse } from "next/server";
import { AdminLoginSchema } from "@/lib/validation";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parse = AdminLoginSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const { username, password } = parse.data;

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      // Small delay to prevent brute force
      await new Promise((r) => setTimeout(r, 500));
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Set httpOnly session cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", process.env.ADMIN_SECRET!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin-login] Error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true });
}
