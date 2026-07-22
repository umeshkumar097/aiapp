import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { AdminLoginSchema } from "@/lib/validation";
import { cookies } from "next/headers";

// GET /api/leads — list all leads (admin only)
export async function GET(request: NextRequest) {
  // Check admin auth
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const where = {
    ...(search && {
      OR: [
        { fullName: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } },
        { phone: { contains: search } },
      ],
    }),
    ...(status && { paymentStatus: status }),
  };

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.lead.count({ where }),
  ]);

  // Stats
  const [paidCount, totalRevenue] = await Promise.all([
    prisma.lead.count({ where: { paymentStatus: "PAID" } }),
    prisma.lead.aggregate({
      where: { paymentStatus: "PAID" },
      _sum: { amount: true },
    }),
  ]);

  return NextResponse.json({
    leads,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    stats: {
      totalLeads: total,
      paidLeads: paidCount,
      totalRevenue: totalRevenue._sum.amount || 0,
    },
  });
}
