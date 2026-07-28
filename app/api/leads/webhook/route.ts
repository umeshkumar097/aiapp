import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * POST /api/leads/webhook
 * ─────────────────────────────────────────────────────────────────
 * Pabbly Connect webhook — receives Facebook Instant Form leads
 * and saves them directly to CRM database.
 *
 * Security: ?secret=WEBHOOK_SECRET query param
 *
 * Pabbly mein URL set karo:
 *   https://app.aiclex.in/api/leads/webhook?secret=YOUR_WEBHOOK_SECRET
 *
 * JSON Body (Pabbly mapping):
 * {
 *   "fullName":     "{{full_name}}",
 *   "phone":        "{{phone_number}}",
 *   "email":        "{{email}}",
 *   "businessName": "{{company_name}}",      // optional
 *   "city":         "{{city}}",              // optional
 *   "platform":     "{{property_type}}",     // optional
 *   "budget":       "{{unit_count}}",        // optional
 *   "campaign":     "{{campaign_name}}",     // optional - Facebook campaign name
 *   "adName":       "{{ad_name}}"            // optional - Facebook ad name
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // ── Auth: verify webhook secret ──
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const expectedSecret = process.env.WEBHOOK_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // ── Extract fields — handle Facebook naming variations ──
    const fullName =
      body.fullName ||
      body.full_name ||
      `${body.first_name || ""} ${body.last_name || ""}`.trim() ||
      body.name ||
      "Unknown";

    const phone =
      body.phone ||
      body.phone_number ||
      body.mobile ||
      body.phoneNumber ||
      "";

    const email =
      body.email ||
      body.email_address ||
      body.emailAddress ||
      "";

    if (!phone && !email) {
      return NextResponse.json(
        { error: "phone or email required" },
        { status: 400 }
      );
    }

    // ── Campaign tracking ──
    const campaignName = body.campaign || body.campaign_name || body.campaignName || "";
    const adName       = body.adName || body.ad_name || "";
    const adsetName    = body.adsetName || body.adset_name || "";

    // Build admin note with Facebook context
    const facebookNote = [
      campaignName && `📣 Campaign: ${campaignName}`,
      adsetName    && `📦 Ad Set: ${adsetName}`,
      adName       && `🖼 Ad: ${adName}`,
    ].filter(Boolean).join("\n");

    const initialLog = facebookNote
      ? JSON.stringify([{
          text: facebookNote,
          ts: new Date().toISOString(),
          by: "Facebook Instant Form",
          byColor: "#1877F2",
        }])
      : null;

    // ── Save to DB ──
    const lead = await prisma.lead.create({
      data: {
        fullName,
        phone:        phone.replace(/\D/g, "").replace(/^91/, "").slice(-10), // strip +91
        email:        email || `noemail_${Date.now()}@facebook.lead`,
        businessName: body.businessName || body.company_name || body.companyName || null,
        platform:     body.platform || body.property_type || "Both",
        budget:       body.budget || body.unit_count || null,
        timeline:     body.city || body.location || null,
        paymentStatus: "PENDING",
        isVerified:    false,
        // UTM — mark clearly as Facebook Instant Form
        utmSource:   "facebook_instant_form",
        utmMedium:   "lead_ads",
        utmCampaign: campaignName || body.utmCampaign || null,
        utmContent:  adName || body.utmContent || null,
        utmTerm:     adsetName || null,
        adminNotes:  initialLog,
      },
    });

    console.log(`[webhook] Facebook lead saved: ${lead.id} — ${fullName}`);

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: `Lead saved: ${fullName}`,
    });

  } catch (error) {
    console.error("[webhook] Error:", error);
    return NextResponse.json(
      { error: "Failed to save lead", details: String(error) },
      { status: 500 }
    );
  }
}

// Allow Pabbly to test the endpoint
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const expectedSecret = process.env.WEBHOOK_SECRET;

  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    status: "ok",
    message: "Siteboard Facebook Lead Webhook is active",
    timestamp: new Date().toISOString(),
  });
}
