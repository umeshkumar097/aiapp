import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === process.env.ADMIN_SECRET;
}

// GET /api/leads — list all leads (admin only)
export async function GET(request: NextRequest) {
  if (!(await checkAuth())) {
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
        { businessName: { contains: search, mode: "insensitive" as const } },
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

  const [paidCount, totalRevenue, todayCount] = await Promise.all([
    prisma.lead.count({ where: { paymentStatus: "PAID" } }),
    prisma.lead.aggregate({
      where: { paymentStatus: "PAID" },
      _sum: { amount: true },
    }),
    prisma.lead.count({
      where: {
        createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),
  ]);

  return NextResponse.json({
    leads,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    stats: {
      totalLeads: await prisma.lead.count(),
      paidLeads: paidCount,
      totalRevenue: totalRevenue._sum.amount || 0,
      todayLeads: todayCount,
    },
  });
}

// PATCH /api/leads — update status of a single lead
export async function PATCH(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, paymentStatus } = body;

  if (!id || !paymentStatus) {
    return NextResponse.json({ error: "id and paymentStatus required" }, { status: 400 });
  }

  const updated = await prisma.lead.update({
    where: { id },
    data: { paymentStatus },
  });

  return NextResponse.json({ success: true, lead: updated });
}

// DELETE /api/leads — bulk delete leads by IDs
export async function DELETE(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { ids } = body as { ids: string[] };

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "ids array required" }, { status: 400 });
  }

  const { count } = await prisma.lead.deleteMany({
    where: { id: { in: ids } },
  });

  return NextResponse.json({ success: true, deleted: count });
}
