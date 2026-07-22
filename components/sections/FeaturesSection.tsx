"use client";

import { motion } from "framer-motion";
import {
  Zap, Palette, Code2, Smartphone, Apple, Globe, Bell,
  Store, LayoutDashboard, Headphones, UserCheck, Clock
} from "lucide-react";

const features = [
  {
    icon: <Zap size={22} />,
    title: "Fast Delivery",
    desc: "60-day delivery commitment with dedicated project timeline.",
    color: "from-amber-500/20 to-amber-600/10",
    border: "border-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: <Palette size={22} />,
    title: "Premium UI Design",
    desc: "Apple-quality design that delights users and builds brand trust.",
    color: "from-pink-500/20 to-pink-600/10",
    border: "border-pink-500/20",
    iconColor: "text-pink-400",
  },
  {
    icon: <Code2 size={22} />,
    title: "Source Code Included",
    desc: "100% ownership — complete source code delivered to you.",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: <Smartphone size={22} />,
    title: "Android App",
    desc: "Native Android app published on Google Play Store.",
    color: "from-green-500/20 to-green-600/10",
    border: "border-green-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: <Apple size={22} />,
    title: "iOS App",
    desc: "Native iOS app published on Apple App Store.",
    color: "from-slate-400/20 to-slate-500/10",
    border: "border-slate-400/20",
    iconColor: "text-slate-300",
  },
  {
    icon: <Globe size={22} />,
    title: "API Integration",
    desc: "Payment gateways, maps, SMS, WhatsApp, and more APIs built-in.",
    color: "from-cyan-500/20 to-cyan-600/10",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: <Bell size={22} />,
    title: "Push Notifications",
    desc: "Real-time push notifications to keep users engaged.",
    color: "from-violet-500/20 to-violet-600/10",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: <Store size={22} />,
    title: "Play Store Support",
    desc: "Complete Google Play Store submission and approval support.",
    color: "from-green-500/20 to-green-600/10",
    border: "border-green-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: <Apple size={22} />,
    title: "App Store Support",
    desc: "End-to-end Apple App Store submission handled for you.",
    color: "from-blue-400/20 to-blue-500/10",
    border: "border-blue-400/20",
    iconColor: "text-blue-300",
  },
  {
    icon: <LayoutDashboard size={22} />,
    title: "Admin Dashboard",
    desc: "Powerful web-based admin panel to manage your entire app.",
    color: "from-indigo-500/20 to-indigo-600/10",
    border: "border-indigo-500/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: <Headphones size={22} />,
    title: "1 Year Support",
    desc: "Dedicated technical support for 12 months post-launch.",
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: <UserCheck size={22} />,
    title: "Project Manager",
    desc: "Dedicated PM as your single point of contact throughout.",
    color: "from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: <Clock size={22} />,
    title: "On-Time Delivery",
    desc: "We sign milestone-based delivery agreements upfront.",
    color: "from-rose-500/20 to-rose-600/10",
    border: "border-rose-500/20",
    iconColor: "text-rose-400",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-navy" aria-label="Features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Why 500+ Businesses Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Everything You Need.{" "}
            <span className="gradient-text">Nothing You Don&apos;t.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From design to deployment — we handle every aspect of your mobile app
            development so you can focus on growing your business.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
              className={`card-hover group bg-gradient-to-br ${feature.color} rounded-2xl p-5 border ${feature.border} relative overflow-hidden`}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              <h3 className="text-white font-bold text-sm mb-1.5">{feature.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <div className="inline-flex flex-col items-center gap-3">
            <p className="text-slate-400 text-sm">
              Ready to launch your app with all these features?
            </p>
            <button
              onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-gradient text-white font-bold px-8 py-4 rounded-2xl text-base shadow-lg shadow-blue-500/25"
              id="features-cta"
            >
              Get Started for ₹49,999 →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
