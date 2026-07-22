"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FileText, Lock, PhoneCall, Target, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Fill Requirements Form",
    desc: "Share your business idea, target audience, and app requirements through our detailed project form. Takes less than 3 minutes.",
    icon: <FileText size={24} className="text-blue-400" />,
    highlight: false,
  },
  {
    number: "02",
    title: "Pay ₹99 Verification Fee",
    desc: "A refundable ₹99 fee reserves your slot with our senior technical experts and eliminates fake enquiries. 100% adjusted in final invoice.",
    icon: <Lock size={24} className="text-green-400" />,
    highlight: true,
  },
  {
    number: "03",
    title: "Expert Calls You",
    desc: "Our senior developer or project manager calls you within 24 business hours to clarify requirements and answer all your questions.",
    icon: <PhoneCall size={24} className="text-purple-400" />,
    highlight: false,
  },
  {
    number: "04",
    title: "Project Discussion & Proposal",
    desc: "We design the perfect app architecture for your business and share a detailed project proposal with timelines and milestones.",
    icon: <Target size={24} className="text-amber-400" />,
    highlight: false,
  },
  {
    number: "05",
    title: "Development Starts",
    desc: "Your dedicated team starts building. You get weekly updates, a staging app to review, and your PM is always reachable.",
    icon: <Rocket size={24} className="text-rose-400" />,
    highlight: false,
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="section-padding bg-navy-light" aria-label="Our process">
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
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            From Idea to <span className="gradient-text">Live App</span> in 5 Steps
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Our proven process takes your business idea from concept to a
            live, published mobile app — stress-free and on time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/40 to-blue-500/0 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 ${
                  i % 2 === 1 ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Card */}
                <div className={`flex-1 ${i % 2 === 1 ? "sm:text-right" : ""}`}>
                  <div
                    className={`relative rounded-2xl p-6 border transition-all ${
                      step.highlight
                        ? "bg-gradient-to-br from-blue-600/20 to-blue-500/10 border-blue-500/40 shadow-lg shadow-blue-500/10"
                        : "glass border-white/5 hover:border-white/15"
                    }`}
                  >
                    {step.highlight && (
                      <div className="absolute -top-3 left-6 sm:left-auto sm:right-6 flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        <Lock size={12} /> Quick & Secure
                      </div>
                    )}
                    <div className={`flex items-start gap-4 ${i % 2 === 1 ? "sm:flex-row-reverse" : ""}`}>
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center node */}
                <div className="hidden sm:flex w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 items-center justify-center flex-shrink-0 z-10 shadow-lg shadow-blue-500/30 border-4 border-navy">
                  <span className="text-white font-black text-sm">{step.number}</span>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden sm:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* What's included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 glass rounded-3xl border border-white/10 p-8"
        >
          <h3 className="text-white font-bold text-xl text-center mb-6">
            What&apos;s Included in ₹49,999
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              "Android App", "iOS App", "Admin Panel", "Source Code",
              "Play Store Upload", "App Store Upload", "Push Notifications", "API Integration",
              "UI/UX Design", "1 Year Support", "GST Invoice", "Project Manager",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-green-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
