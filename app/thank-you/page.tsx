"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Phone,
  MessageCircle,
  ExternalLink,
  Building2,
  Users,
  LayoutDashboard,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { fireAllTrackingEvents } from "@/lib/analytics";

function ThankYouContent() {
  const searchParams = useSearchParams();
  // leadId is passed after successful form submission
  const leadId = searchParams.get("leadId") || searchParams.get("orderId") || "";
  const name = searchParams.get("name") || "";
  const [hasFired, setHasFired] = useState(false);

  // ─── Fire all conversion tracking events ONCE on page load ───
  useEffect(() => {
    if (hasFired) return;
    setHasFired(true);

    const txId = leadId || `lead_${Date.now()}`;

    // Master fire — GA4 + Google Ads + Meta Pixel
    fireAllTrackingEvents({
      transactionId: txId,
      orderId: txId,
      value: 0,
      currency: "INR",
    });

    // Meta Pixel — direct safety call (in case fbq loaded late)
    const firePixel = () => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Siteboard Demo Request",
          content_ids: [txId],
          currency: "INR",
          value: 0,
        });
      }
    };
    // Try immediately, then retry after 1s if fbq not yet loaded
    firePixel();
    const t = setTimeout(firePixel, 1000);
    return () => clearTimeout(t);
  }, [hasFired, leadId]);

  const callbackTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(
    "en-IN",
    { weekday: "long", day: "numeric", month: "long" }
  );

  const firstName = name ? name.split(" ")[0] : "";

  return (
    <div className="max-w-2xl w-full">

      {/* ── Success animation ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        className="text-center mb-8"
      >
        {/* Animated check */}
        <div className="relative inline-block mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30"
          >
            <CheckCircle2 size={48} className="text-white" strokeWidth={2.5} />
          </motion.div>
          {/* Pulse ring */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.9, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-green-400"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-3">
            {firstName ? `Thank You, ${firstName}!` : "Demo Requested!"}
          </h1>
          <p className="text-slate-500 text-lg">
            Your demo request has been received successfully.
          </p>
        </motion.div>
      </motion.div>

      {/* ── Main card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 md:p-8 mb-6"
      >
        {/* Confirmation badge */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Building2 size={20} className="text-green-600" />
            <p className="text-green-700 font-bold text-base">
              Siteboard Demo Request Confirmed
            </p>
          </div>
          <p className="text-slate-500 text-sm">
            Our product expert will reach you by{" "}
            <strong className="text-slate-700">{callbackTime}</strong>
          </p>
          {leadId && (
            <p className="text-slate-400 text-xs mt-2 font-mono">
              Reference ID: {leadId}
            </p>
          )}
        </div>

        {/* What happens next */}
        <h2 className="text-slate-900 font-bold text-base mb-4">
          What happens next?
        </h2>
        <div className="space-y-4">
          {[
            {
              step: "1",
              icon: <Phone size={16} className="text-white" />,
              title: "Expert Calls You",
              desc: `Our product specialist will call you by ${callbackTime} to understand your requirements.`,
              color: "bg-blue-600",
            },
            {
              step: "2",
              icon: <LayoutDashboard size={16} className="text-white" />,
              title: "Live Demo on Your Data",
              desc: "We walk you through Siteboard using your actual project structure — plots, apartments, or houses.",
              color: "bg-purple-600",
            },
            {
              step: "3",
              icon: <Users size={16} className="text-white" />,
              title: "Onboard Your Team",
              desc: "Add your staff and agents with role-based access. Go live on the same day.",
              color: "bg-green-600",
            },
            {
              step: "4",
              icon: <Calendar size={16} className="text-white" />,
              title: "Start Managing Inventory",
              desc: "Your entire plot/apartment/house inventory is now real-time — zero double bookings, ever.",
              color: "bg-amber-500",
            },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div
                className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center flex-shrink-0 mt-0.5`}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-slate-900 font-semibold text-sm">{item.title}</p>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Action buttons ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6"
      >
        <a
          href={`https://wa.me/918449488090?text=Hi%20Siteboard%20Team!%20I%20just%20submitted%20a%20demo%20request.%20Reference%3A%20${leadId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-sm"
          id="thankyou-whatsapp"
        >
          <MessageCircle size={18} />
          WhatsApp Us
        </a>
        <a
          href="tel:+918449488090"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-sm"
          id="thankyou-call"
        >
          <Phone size={18} />
          Call: +91 8449488090
        </a>
      </motion.div>

      {/* ── Footer note ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center space-y-3"
      >
        <p className="text-slate-400 text-sm">
          Check your email for confirmation · info@siteboard.in
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
        >
          <ExternalLink size={14} />
          Back to Siteboard Homepage
        </Link>
      </motion.div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <>
      {/* Meta Pixel — Lead event noscript fallback (no-JS users) */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=4485040718490356&ev=Lead&noscript=1"
          alt=""
        />
      </noscript>

      <Navbar />
      <main className="min-h-screen bg-slate-50 flex items-center justify-center py-24 px-4">
        <Suspense
          fallback={
            <div className="text-slate-500 text-center font-medium">
              Loading...
            </div>
          }
        >
          <ThankYouContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
