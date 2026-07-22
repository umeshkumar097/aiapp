import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Aiclex Solutions",
  description: "Refund Policy for Aiclex Solutions Private Limited — ₹99 Verification Fee Refund Policy.",
};

const sections = [
  {
    title: "1. ₹99 Verification Fee",
    content: [
      "The ₹99 fee charged at the time of submitting your project inquiry is a refundable verification fee.",
      "If you proceed with Aiclex Solutions for your project, this ₹99 is adjusted in your final project invoice.",
      "If you decide not to proceed for any reason — no questions asked — we will refund the complete ₹99 within 5-7 business days.",
    ],
  },
  {
    title: "2. How to Request a Refund",
    content: [
      "Email us at refund@aiclex.in with your Order ID and registered phone number.",
      "WhatsApp us at +91 99999 99999 with your payment details.",
      "Refunds are processed within 5-7 business days to your original payment method.",
    ],
  },
  {
    title: "3. Project Deposits & Payments",
    content: [
      "Project milestone payments (beyond the ₹99 verification) are governed by the project agreement signed before development begins.",
      "Completed project milestones are non-refundable as they represent delivered work.",
      "If we fail to deliver as per the project agreement, appropriate refunds will be processed.",
    ],
  },
  {
    title: "4. Contact",
    content: [
      "Email: refund@aiclex.in",
      "WhatsApp: +91 99999 99999",
      "Business hours: Mon–Sat, 10 AM – 7 PM IST",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-black text-white mb-2">Refund Policy</h1>
          <p className="text-slate-400 text-sm mb-8">Last updated: July 22, 2024</p>

          {/* Highlight box */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 mb-6">
            <p className="text-green-400 font-bold text-base mb-1">✅ 100% Refundable ₹99 Fee</p>
            <p className="text-slate-300 text-sm">
              We guarantee a full refund of the ₹99 verification fee if you decide not to proceed.
              No questions asked, no delays, no fine print.
            </p>
          </div>

          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.title} className="glass rounded-2xl border border-white/10 p-6">
                <h2 className="text-white font-bold text-base mb-3">{section.title}</h2>
                <ul className="space-y-2">
                  {section.content.map((item, i) => (
                    <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
