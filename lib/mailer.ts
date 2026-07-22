import nodemailer from "nodemailer";
import type { Lead } from "@/types";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function sendAdminNotification(lead: Lead & { orderId?: string | null; paymentId?: string | null }) {
  const transporter = createTransporter();

  const platformLabels: Record<string, string> = {
    android: "Android App",
    ios: "iOS App",
    both: "Android + iOS App",
  };

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background: #f8fafc; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0F172A 0%, #1e3a8a 100%); padding: 32px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 24px; }
    .badge { display: inline-block; background: #22C55E; color: #fff; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; margin-top: 8px; }
    .body { padding: 32px; }
    .section { margin-bottom: 24px; }
    .section h2 { color: #0F172A; font-size: 16px; margin: 0 0 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
    .label { color: #64748b; font-size: 14px; }
    .value { color: #0F172A; font-size: 14px; font-weight: 600; }
    .highlight { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; text-align: center; }
    .highlight .amount { font-size: 32px; font-weight: 700; color: #22C55E; }
    .footer { background: #f8fafc; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px; }
    .cta { display: block; background: #2563EB; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; text-align: center; font-weight: 600; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 New Verified Lead!</h1>
      <span class="badge">₹99 Payment Confirmed</span>
    </div>
    <div class="body">
      <div class="highlight">
        <div class="amount">${formatCurrency(lead.amount)} Received</div>
        <p style="color:#166534;margin:4px 0;">Payment ID: ${lead.paymentId || "—"}</p>
        <p style="color:#166534;margin:4px 0;">Order ID: ${lead.orderId || "—"}</p>
      </div>

      <div class="section" style="margin-top:24px;">
        <h2>📋 Contact Details</h2>
        <div class="row"><span class="label">Name</span><span class="value">${lead.fullName}</span></div>
        <div class="row"><span class="label">Phone</span><span class="value">+91 ${lead.phone}</span></div>
        <div class="row"><span class="label">Email</span><span class="value">${lead.email}</span></div>
        <div class="row"><span class="label">Company</span><span class="value">${lead.company || "—"}</span></div>
        <div class="row"><span class="label">Business Name</span><span class="value">${lead.businessName || "—"}</span></div>
      </div>

      <div class="section">
        <h2>📱 Project Details</h2>
        <div class="row"><span class="label">Platform</span><span class="value">${platformLabels[lead.platform] || lead.platform}</span></div>
        <div class="row"><span class="label">Project</span><span class="value">${lead.projectName || "—"}</span></div>
        <div class="row"><span class="label">Budget</span><span class="value">${lead.budget || "—"}</span></div>
        <div class="row"><span class="label">Timeline</span><span class="value">${lead.timeline || "—"}</span></div>
        ${lead.projectDescription ? `<div style="padding:12px;background:#f8fafc;border-radius:8px;margin-top:8px;"><p style="margin:0;color:#475569;font-size:14px;">${lead.projectDescription}</p></div>` : ""}
      </div>

      ${lead.utmSource ? `
      <div class="section">
        <h2>📊 Traffic Source</h2>
        <div class="row"><span class="label">Source</span><span class="value">${lead.utmSource || "—"}</span></div>
        <div class="row"><span class="label">Medium</span><span class="value">${lead.utmMedium || "—"}</span></div>
        <div class="row"><span class="label">Campaign</span><span class="value">${lead.utmCampaign || "—"}</span></div>
      </div>
      ` : ""}

      <a href="https://aiclex.in/admin" class="cta">View in Admin Dashboard →</a>
    </div>
    <div class="footer">
      Aiclex Solutions Private Limited · admin@aiclex.in<br>
      This is an automated notification.
    </div>
  </div>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Aiclex Solutions" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🎉 New Verified Lead: ${lead.fullName} | ${formatCurrency(lead.amount)} Paid`,
      html,
    });
  } catch (error) {
    console.error("Admin email error:", error);
  }
}

export async function sendCustomerConfirmation(lead: Lead & { orderId?: string | null; paymentId?: string | null }) {
  const transporter = createTransporter();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background: #f8fafc; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0F172A 0%, #1e3a8a 100%); padding: 40px 32px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 28px; }
    .header p { color: #94a3b8; margin: 8px 0 0; }
    .body { padding: 32px; }
    .success-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px; }
    .checkmark { font-size: 48px; }
    .success-box h2 { color: #166534; margin: 8px 0 4px; font-size: 20px; }
    .success-box p { color: #15803d; margin: 0; font-size: 14px; }
    .refund-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .refund-box h3 { color: #1e40af; margin: 0 0 8px; font-size: 16px; }
    .refund-box p { color: #1d4ed8; margin: 0; font-size: 14px; line-height: 1.6; }
    .steps { margin-bottom: 24px; }
    .step { display: flex; gap: 16px; padding: 12px 0; border-bottom: 1px solid #f1f5f9; align-items: flex-start; }
    .step-num { background: #2563EB; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; }
    .step-text strong { color: #0F172A; font-size: 14px; display: block; }
    .step-text span { color: #64748b; font-size: 13px; }
    .cta-group { display: flex; gap: 12px; margin-top: 24px; }
    .cta-primary { flex: 1; background: #25D366; color: #fff; text-decoration: none; padding: 14px; border-radius: 8px; text-align: center; font-weight: 600; font-size: 15px; }
    .cta-secondary { flex: 1; background: #2563EB; color: #fff; text-decoration: none; padding: 14px; border-radius: 8px; text-align: center; font-weight: 600; font-size: 15px; }
    .footer { background: #f8fafc; padding: 20px 32px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Aiclex Solutions</h1>
      <p>Your Trusted Mobile App Development Partner</p>
    </div>
    <div class="body">
      <div class="success-box">
        <div class="checkmark">✅</div>
        <h2>Payment Verified Successfully!</h2>
        <p>Order ID: ${lead.orderId} · Payment ID: ${lead.paymentId}</p>
      </div>

      <p style="color:#0F172A;font-size:16px;">Hi <strong>${lead.fullName}</strong>,</p>
      <p style="color:#475569;font-size:14px;line-height:1.7;">
        Thank you for verifying your project request with Aiclex Solutions. Our technical expert will call you 
        within 24 business hours to understand your requirements and guide you through the next steps.
      </p>

      <div class="refund-box">
        <h3>💡 About Your ₹99 Verification Fee</h3>
        <p>
          This ₹99 is <strong>100% refundable</strong>. If you proceed with development, it will be 
          adjusted in your final invoice. If you decide not to proceed, simply request a refund and 
          we'll return the full amount — no questions asked.
        </p>
      </div>

      <div class="steps">
        <h3 style="color:#0F172A;font-size:16px;margin:0 0 12px;">What happens next?</h3>
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-text">
            <strong>Expert Call (Within 24 hrs)</strong>
            <span>Our senior developer will call you to understand your project</span>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-text">
            <strong>Free Project Consultation</strong>
            <span>We'll design the best solution for your business needs</span>
          </div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-text">
            <strong>Development Begins</strong>
            <span>Your app development starts with a dedicated project manager</span>
          </div>
        </div>
        <div class="step">
          <div class="step-num">4</div>
          <div class="step-text">
            <strong>Launch on Play Store & App Store</strong>
            <span>We handle publishing and 1 year of post-launch support</span>
          </div>
        </div>
      </div>

      <div class="cta-group">
        <a href="https://wa.me/919999999999?text=Hi,%20I%20just%20submitted%20my%20project%20request%20(Order:%20${lead.orderId})" class="cta-primary">
          💬 WhatsApp Us
        </a>
        <a href="tel:+919999999999" class="cta-secondary">
          📞 Call Now
        </a>
      </div>
    </div>
    <div class="footer">
      <strong>Aiclex Solutions Private Limited</strong><br>
      GST Registered · Secure Payments · 1 Year Support<br>
      📧 hello@aiclex.in · 📞 +91 99999 99999<br>
      <a href="https://aiclex.in/refund-policy" style="color:#2563EB;">Refund Policy</a> · 
      <a href="https://aiclex.in/privacy-policy" style="color:#2563EB;">Privacy Policy</a>
    </div>
  </div>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Aiclex Solutions" <${process.env.SMTP_USER}>`,
      to: lead.email,
      subject: `✅ Your App Project is Verified! — Aiclex Solutions`,
      html,
    });
  } catch (error) {
    console.error("Customer email error:", error);
  }
}
