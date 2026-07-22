"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, MessageCircle, Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { fireAllTrackingEvents } from "@/lib/analytics";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const paymentId = searchParams.get("paymentId") || "";
  const name = searchParams.get("name") || "";
  const [hasFired, setHasFired] = useState(false);

  // Fire conversion events once
  useEffect(() => {
    if (hasFired || !orderId) return;
    setHasFired(true);

    fireAllTrackingEvents({
      transactionId: paymentId || orderId,
      orderId,
      value: 99,
      currency: "INR",
    });
  }, [hasFired, orderId, paymentId]);

  const callbackTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-2xl w-full">
      {/* Success animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        className="text-center mb-8"
      >
        {/* Animated checkmark */}
        <div className="relative inline-block mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30"
          >
            <CheckCircle2 size={48} className="text-white" strokeWidth={2.5} />
          </motion.div>
          {/* Rings */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.8, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-green-500"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Thank You{name ? `, ${name.split(" ")[0]}` : ""}!
          </h1>
          <p className="text-xl text-slate-300">
            Your Project Request Has Been Verified Successfully.
          </p>
        </motion.div>
      </motion.div>

      {/* Details card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="glass rounded-3xl border border-white/10 p-6 md:p-8 mb-6"
      >
        {/* Payment confirmation */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 mb-6 text-center">
          <p className="text-green-400 font-bold text-lg mb-3">₹99 Payment Successful</p>
          <div className="grid grid-cols-2 gap-3 text-left">
            <div>
              <p className="text-slate-500 text-xs">Order ID</p>
              <p className="text-white text-sm font-mono font-semibold break-all">{orderId || "N/A"}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Payment ID</p>
              <p className="text-white text-sm font-mono font-semibold break-all">{paymentId || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <h2 className="text-white font-bold text-lg mb-4">What happens next?</h2>
        <div className="space-y-4">
          {[
            {
              step: "1",
              title: "Expert Call",
              desc: `Our senior developer will call you by ${callbackTime}`,
              color: "bg-blue-600",
            },
            {
              step: "2",
              title: "Free Consultation",
              desc: "30-minute call to understand your requirements in detail",
              color: "bg-purple-600",
            },
            {
              step: "3",
              title: "Project Proposal",
              desc: "Custom proposal with timeline, milestones, and breakdown",
              color: "bg-indigo-600",
            },
            {
              step: "4",
              title: "Development Starts",
              desc: "Your app development begins with a dedicated project manager",
              color: "bg-green-600",
            },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div
                className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5`}
              >
                {item.step}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{item.title}</p>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6"
      >
        <a
          href={`https://wa.me/919871881183?text=Hi%20Aiclex%20Team!%20I%20just%20submitted%20my%20project%20request.%20Order%20ID%3A%20${orderId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-2xl transition-all hover:-translate-y-1"
          id="thankyou-whatsapp"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
        <a
          href="tel:+918449488090"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition-all hover:-translate-y-1"
          id="thankyou-call"
        >
          <Phone size={18} />
          Call Now
        </a>
        <a
          href="#"
          className="flex items-center justify-center gap-2 glass border border-white/10 hover:border-white/20 text-white font-semibold py-4 rounded-2xl transition-all hover:-translate-y-1"
          id="thankyou-brochure"
        >
          <Download size={18} />
          Brochure
        </a>
      </motion.div>

      {/* Share */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <p className="text-slate-500 text-sm mb-3">
          Check your email for confirmation. Add our number to save it.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
        >
          <ExternalLink size={14} />
          Back to Homepage
        </Link>
      </motion.div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy flex items-center justify-center py-24 px-4">
        <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
          <ThankYouContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
