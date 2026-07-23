import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  createCashfreeOrder,
  generateOrderId,
  generateCustomerId,
} from "@/lib/cashfree";
import { CreateOrderSchema } from "@/lib/validation";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 requests per IP per minute
    const ip = getClientIp(request);
    const { success } = rateLimit(`create-order:${ip}`, {
      maxRequests: 5,
      windowMs: 60 * 1000,
    });

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const parseResult = CreateOrderSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid form data.", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { formData } = parseResult.data;

    // Check for duplicate pending order (same phone in last 10 minutes)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const existingOrder = await prisma.pendingOrder.findFirst({
      where: {
        formData: {
          path: ["phone"],
          equals: formData.phone,
        },
        createdAt: { gte: tenMinutesAgo },
        status: "CREATED",
      },
    });

    if (existingOrder) {
      // Return existing session if still valid
      return NextResponse.json({
        orderId: existingOrder.orderId,
        paymentSessionId: existingOrder.sessionId,
        amount: 99,
        currency: "INR",
      });
    }

    // Generate IDs
    const orderId = generateOrderId();
    const customerId = generateCustomerId(formData.email);
    // Cashfree Production mode strictly requires HTTPS return_url
    const rawAppUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aiclex.in";
    const appUrl = rawAppUrl.startsWith("http") ? rawAppUrl.replace(/^http:\/\//i, "https://") : `https://${rawAppUrl}`;

    // Create Cashfree order
    const cashfreeOrder = await createCashfreeOrder({
      orderId,
      amount: 99,
      currency: "INR",
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerId,
      returnUrl: `${appUrl}/api/verify-payment?orderId=${orderId}&redirect=true`,
      notifyUrl: `${appUrl}/api/cashfree-webhook`,
    });

    if (!cashfreeOrder?.payment_session_id) {
      throw new Error("Failed to get payment session from Cashfree");
    }

    // Store pending order in DB
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.pendingOrder.create({
      data: {
        orderId,
        sessionId: cashfreeOrder.payment_session_id,
        formData: formData as object,
        status: "CREATED",
        expiresAt,
      },
    });

    // Also immediately create a PENDING Lead so it shows up in the admin dashboard
    await prisma.lead.create({
      data: {
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
        paymentStatus: "PENDING",
        orderId,
        isVerified: false,
        gclid: formData.gclid || null,
        utmSource: formData.utmSource || null,
        utmMedium: formData.utmMedium || null,
        utmCampaign: formData.utmCampaign || null,
        utmTerm: formData.utmTerm || null,
        utmContent: formData.utmContent || null,
      },
    });

    return NextResponse.json({
      orderId,
      paymentSessionId: cashfreeOrder.payment_session_id,
      amount: 99,
      currency: "INR",
    });
  } catch (error) {
    console.error("[create-order] Error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order. Please try again." },
      { status: 500 }
    );
  }
}
