import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * POST /api/leads/remark
 * ─────────────────────────────────────────────────────────────
 * Pabbly Connect → Google Sheets trigger
 *
 * Jab team Google Sheet mein response likhti hai,
 * Pabbly yeh endpoint call karta hai.
 * Lead phone se dhundha jaata hai aur remark activity log mein
 * team member ke naam ke saath append ho jaata hai.
 *
 * Body:
 * {
 *   "phone":   "9109838585681",   ← lead ka phone (match ke liye)
 *   "remark":  "call back kiya, interested hai demo mein",
 *   "by":      "Rahul",           ← team member ka naam
 *   "byColor": "#3b82f6",         ← optional (default blue)
 *   "status":  "INTERESTED"       ← optional: CRM status bhi update karo
 * }
 *
 * URL: https://app.aiclex.in/api/leads/remark?secret=siteboard_fb_webhook_2024
 */
export async function POST(request: NextRequest) {
  try {
    // ── Auth ──
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    if (process.env.WEBHOOK_SECRET && secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const {
      phone,
      remark,
      by,
      byColor = "#3b82f6",
      status,
    } = body as {
      phone:    string;
      remark:   string;
      by?:      string;
      byColor?: string;
      status?:  string;
    };

    if (!phone || !remark) {
      return NextResponse.json(
        { error: "phone and remark are required" },
        { status: 400 }
      );
    }

    // ── Normalize phone — strip country code, keep last 10 digits ──
    const normalizedPhone = phone.replace(/\D/g, "").slice(-10);

    // ── Find lead by phone ──
    const lead = await prisma.lead.findFirst({
      where: {
        phone: { endsWith: normalizedPhone },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!lead) {
      return NextResponse.json(
        { error: `Lead not found for phone: ${phone}` },
        { status: 404 }
      );
    }

    // ── Parse existing activity log ──
    interface LogEntry { text: string; ts: string; by?: string; byColor?: string; }

    let entries: LogEntry[] = [];
    if (lead.adminNotes) {
      try {
        const parsed = JSON.parse(lead.adminNotes);
        entries = Array.isArray(parsed) ? parsed : [{ text: lead.adminNotes, ts: new Date(0).toISOString() }];
      } catch {
        entries = [{ text: lead.adminNotes, ts: new Date(0).toISOString() }];
      }
    }

    // ── Append new remark ──
    const newEntry: LogEntry = {
      text:    remark.trim(),
      ts:      new Date().toISOString(),
      by:      by || "Team",
      byColor: byColor,
    };
    entries.push(newEntry);

    // ── Build update data ──
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = { adminNotes: JSON.stringify(entries) };

    // Optional: status bhi update karo agar bheja ho
    const validStatuses = ["PENDING","CONTACTED","NOT_CONNECTED","FOLLOW_UP","INTERESTED","QUALIFIED","PAID","REFUNDED"];
    if (status && validStatuses.includes(status)) {
      updateData.paymentStatus = status;
    }

    const updated = await prisma.lead.update({
      where: { id: lead.id },
      data:  updateData,
    });

    console.log(`[remark] ✅ ${lead.fullName} (${normalizedPhone}) — remark by ${by || "Team"}`);

    return NextResponse.json({
      success:  true,
      leadId:   updated.id,
      leadName: updated.fullName,
      message:  `Remark added to ${updated.fullName}`,
    });

  } catch (error) {
    console.error("[remark] Error:", error);
    return NextResponse.json(
      { error: "Failed to add remark", details: String(error) },
      { status: 500 }
    );
  }
}
