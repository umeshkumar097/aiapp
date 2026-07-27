import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { SubmitLeadSchema } from "@/lib/validation";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { sendAdminNotification } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const { success } = rateLimit(`submit-lead:${ip}`, {
      maxRequests: 5,
      windowMs: 60 * 1000,
    });

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parseResult = SubmitLeadSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid form data.", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { formData } = parseResult.data;

    // Save lead directly — no payment needed
    const lead = await prisma.lead.create({
      data: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        businessName: formData.city,           // reuse businessName for city
        platform: formData.propertyType,       // reuse platform for property type
        budget: formData.budget || null,
        timeline: formData.timeline || null,
        projectDescription: formData.message || null,
        paymentStatus: "PENDING",
        isVerified: false,
        gclid: formData.gclid || null,
        utmSource: formData.utmSource || null,
        utmMedium: formData.utmMedium || null,
        utmCampaign: formData.utmCampaign || null,
        utmTerm: formData.utmTerm || null,
        utmContent: formData.utmContent || null,
      },
    });

    // Send admin notification email (non-blocking)
    sendAdminNotification({ ...lead, orderId: lead.id, paymentId: "" })
      .catch((e) => console.error("Email error:", e));

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("[submit-lead] Error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry. Please try again." },
      { status: 500 }
    );
  }
}
