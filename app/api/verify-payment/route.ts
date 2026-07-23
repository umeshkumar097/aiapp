import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyCashfreePayment } from "@/lib/cashfree";
import { sendAdminNotification, sendCustomerConfirmation } from "@/lib/mailer";
import { VerifyPaymentSchema } from "@/lib/validation";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import type { LeadFormInput } from "@/lib/validation";

export async function GET(request: NextRequest) {
  // Handle Cashfree redirect (GET with redirect=true)
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");
  const redirect = searchParams.get("redirect");

  if (!orderId || redirect !== "true") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const rawUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aiclex.in";
  const appUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

  try {
    const result = await processPaymentVerification(orderId);

    if (result.success && result.leadId) {
      const lead = await prisma.lead.findUnique({ where: { id: result.leadId } });
      return NextResponse.redirect(
        `${appUrl}/thank-you?orderId=${orderId}&paymentId=${result.paymentId}&name=${encodeURIComponent(lead?.fullName || "")}`
      );
    } else {
      return NextResponse.redirect(
        `${appUrl}/?payment_failed=true&orderId=${orderId}`
      );
    }
  } catch (error) {
    console.error("[verify-payment GET] Error:", error);
    return NextResponse.redirect(`${appUrl}/?payment_error=true`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const { success } = rateLimit(`verify-payment:${ip}`, {
      maxRequests: 10,
      windowMs: 60 * 1000,
    });

    if (!success) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const body = await request.json();
    const parseResult = VerifyPaymentSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }

    const { orderId } = parseResult.data;
    const result = await processPaymentVerification(orderId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("[verify-payment POST] Error:", error);
    return NextResponse.json(
      { error: "Payment verification failed." },
      { status: 500 }
    );
  }
}

async function processPaymentVerification(orderId: string) {
  // Check if already processed (idempotent)
  const existingLead = await prisma.lead.findFirst({
    where: { orderId, paymentStatus: "PAID" },
  });

  if (existingLead) {
    return {
      success: true,
      orderId,
      paymentId: existingLead.paymentId || "",
      leadId: existingLead.id,
      alreadyProcessed: true,
    };
  }

  // Get pending order
  const pendingOrder = await prisma.pendingOrder.findUnique({
    where: { orderId },
  });

  if (!pendingOrder) {
    throw new Error(`Pending order not found: ${orderId}`);
  }

  // Verify with Cashfree API (server-side — never trust frontend)
  const { success: paymentSuccess, payment } =
    await verifyCashfreePayment(orderId);

  if (!paymentSuccess || !payment) {
    // Update pending order status
    await prisma.pendingOrder.update({
      where: { orderId },
      data: { status: "FAILED" },
    });

    return { success: false, orderId, paymentId: "", error: "Payment not successful" };
  }

  const formData = pendingOrder.formData as LeadFormInput;

  // Upsert lead in database (since it was already created as PENDING in create-order)
  const lead = await prisma.lead.upsert({
    where: { orderId },
    create: {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      company: formData.company || null,
      businessName: formData.businessName || null,
      projectName: formData.projectName || null,
      projectDescription: formData.projectDescription || null,
      budget: formData.budget || null,
      timeline: formData.timeline || null,
      platform: formData.platform,
      paymentStatus: "PAID",
      orderId,
      paymentId: payment.cf_payment_id?.toString() || orderId,
      cfPaymentId: payment.cf_payment_id?.toString() || null,
      amount: 99,
      currency: "INR",
      gclid: formData.gclid || null,
      utmSource: formData.utmSource || null,
      utmMedium: formData.utmMedium || null,
      utmCampaign: formData.utmCampaign || null,
      utmTerm: formData.utmTerm || null,
      utmContent: formData.utmContent || null,
      isVerified: true,
    },
    update: {
      paymentStatus: "PAID",
      paymentId: payment.cf_payment_id?.toString() || orderId,
      cfPaymentId: payment.cf_payment_id?.toString() || null,
      isVerified: true,
    },
  });

  // Update pending order status
  await prisma.pendingOrder.update({
    where: { orderId },
    data: { status: "PAID" },
  });

  // Send emails (non-blocking)
  const leadWithOrder = { ...lead, orderId, paymentId: payment.cf_payment_id?.toString() || orderId };
  
  Promise.all([
    sendAdminNotification(leadWithOrder),
    sendCustomerConfirmation(leadWithOrder),
  ]).catch((e) => console.error("Email send error:", e));

  return {
    success: true,
    orderId,
    paymentId: payment.cf_payment_id?.toString() || orderId,
    leadId: lead.id,
  };
}
