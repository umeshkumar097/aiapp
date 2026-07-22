"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Shield, FileText, Clock, Sparkles, Flame, CheckCircle2, Rocket } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import PhoneMockup from "@/components/ui/PhoneMockup";

const trustItems = [
  { icon: <Star size={14} className="fill-amber-400 text-amber-400" />, label: "Google Rated 4.9★" },
  { icon: <Shield size={14} className="text-green-400" />, label: "500+ Projects" },
  { icon: <FileText size={14} className="text-blue-400" />, label: "GST Invoice" },
  { icon: <Clock size={14} className="text-purple-400" />, label: "1 Year Support" },
  { icon: <Shield size={14} className="text-green-400" />, label: "100% Secure" },
];

function Particle({ x, y, size, duration }: { x: string; y: string; size: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-blue-500/30 pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ y: [0, -80, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.5, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function HeroSection() {
  const particles = [
    { x: "10%", y: "20%", size: 6, duration: 4 },
    { x: "80%", y: "15%", size: 4, duration: 5 },
    { x: "60%", y: "70%", size: 8, duration: 6 },
    { x: "25%", y: "80%", size: 5, duration: 3.5 },
    { x: "90%", y: "50%", size: 7, duration: 4.5 },
    { x: "45%", y: "10%", size: 3, duration: 5.5 },
    { x: "5%", y: "60%", size: 5, duration: 4 },
  ];

  const handleCTA = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-navy pt-20"
      aria-label="Hero section"
    >
      {/* Animated grid bg */}
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="badge-glow flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
                <Flame size={15} className="text-orange-400" />
                <span className="text-green-400 font-bold text-sm tracking-wide uppercase">
                  Limited Time Offer
                </span>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6"
            >
              Build Your
              <br />
              <span className="gradient-text">Android & iOS</span>
              <br />
              Starting at
              <br />
              <span className="relative inline-flex items-center gap-2">
                <span className="gradient-text">₹49,999</span>
                <span className="text-slate-400 text-xl font-normal">+ Taxes</span>
                <Sparkles size={28} className="text-amber-400 animate-pulse inline" />
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Launch a premium mobile app for your business with beautiful UI, admin panel,
              full source code, Play Store & App Store publishing — backed by 1 year of dedicated support.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <GradientButton
                size="xl"
                onClick={handleCTA}
                className="rounded-2xl"
                id="hero-primary-cta"
                icon={<Rocket size={20} />}
              >
                Start My Project
              </GradientButton>
              <GradientButton
                variant="secondary"
                size="xl"
                onClick={handlePortfolio}
                className="rounded-2xl"
                id="hero-portfolio-cta"
              >
                View Portfolio
              </GradientButton>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {trustItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
                >
                  {item.icon}
                  <span className="text-slate-300 text-xs font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Phone mockups */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center relative h-[500px]"
            aria-hidden="true"
          >
            {/* Center phone */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <PhoneMockup
                gradient="linear-gradient(135deg, #2563EB 0%, #1e40af 100%)"
                floating={true}
                delay={0}
              />
            </div>

            {/* Left phone */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 scale-90 opacity-70">
              <PhoneMockup
                gradient="linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)"
                floating={true}
                delay={1}
              />
            </div>

            {/* Right phone */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 scale-90 opacity-70">
              <PhoneMockup
                gradient="linear-gradient(135deg, #059669 0%, #047857 100%)"
                floating={true}
                delay={2}
              />
            </div>

            {/* Floating labels */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-8 right-16 glass rounded-2xl px-4 py-2 border border-white/10"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="text-green-400" size={14} />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">App Delivered!</p>
                  <p className="text-slate-400 text-xs">Play Store Live</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-12 left-16 glass rounded-2xl px-4 py-2 border border-white/10"
            >
              <div className="flex items-center gap-2">
                <Star size={18} className="fill-amber-400 text-amber-400" />
                <div>
                  <p className="text-white text-xs font-semibold">4.9 / 5.0</p>
                  <p className="text-slate-400 text-xs">500+ Reviews</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
