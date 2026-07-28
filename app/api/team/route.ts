import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === process.env.ADMIN_SECRET;
}

// GET /api/team — list all team members
export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const members = await prisma.teamMember.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json({ members });
}

// POST /api/team — add a new team member
export async function POST(request: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, phone, email, role, color } = await request.json();
  if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });
  const member = await prisma.teamMember.create({
    data: { name, phone: phone || null, email: email || null, role: role || "agent", color: color || "#3b82f6" },
  });
  return NextResponse.json({ member });
}

// PATCH /api/team — update a team member
export async function PATCH(request: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...data } = await request.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const member = await prisma.teamMember.update({ where: { id }, data });
  return NextResponse.json({ member });
}

// DELETE /api/team — remove a team member
export async function DELETE(request: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.teamMember.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
