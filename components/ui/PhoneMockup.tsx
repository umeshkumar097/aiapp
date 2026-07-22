"use client";

import { motion } from "framer-motion";

interface PhoneMockupProps {
  screenContent?: React.ReactNode;
  gradient?: string;
  className?: string;
  label?: string;
  delay?: number;
  floating?: boolean;
}

function DefaultScreen({ gradient }: { gradient: string }) {
  return (
    <div
      className="w-full h-full rounded-2xl overflow-hidden relative flex flex-col"
      style={{ background: gradient }}
    >
      {/* Status bar */}
      <div className="flex justify-between items-center px-4 pt-3 pb-1">
        <span className="text-white text-xs font-semibold">9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-3 rounded-sm bg-white/60" />
          <div className="w-1 h-3 bg-white/60 rounded-sm" />
          <div className="w-4 h-2 border border-white/60 rounded-sm">
            <div className="w-3/4 h-full bg-white/60 rounded-sm" />
          </div>
        </div>
      </div>

      {/* App header */}
      <div className="px-4 py-2 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <div className="w-4 h-4 rounded-sm bg-white/80" />
        </div>
        <div>
          <div className="h-2 w-16 bg-white/80 rounded mb-1" />
          <div className="h-1.5 w-10 bg-white/40 rounded" />
        </div>
      </div>

      {/* Main content blocks */}
      <div className="px-4 flex-1 space-y-2">
        <div className="h-20 rounded-xl bg-white/10 border border-white/20 p-3">
          <div className="h-2 w-20 bg-white/60 rounded mb-2" />
          <div className="h-8 w-24 bg-white/80 rounded-lg font-bold flex items-center justify-center">
            <div className="h-3 w-16 bg-white/90 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-white/10 border border-white/20 p-2">
              <div className="h-2 w-10 bg-white/50 rounded mb-1" />
              <div className="h-2 w-8 bg-white/70 rounded" />
            </div>
          ))}
        </div>
        <div className="h-16 rounded-xl bg-white/10 border border-white/20 p-3 space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex justify-between">
              <div className="h-1.5 w-20 bg-white/40 rounded" />
              <div className="h-1.5 w-10 bg-white/60 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex justify-around py-3 px-4 border-t border-white/10">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`w-5 h-5 rounded-full ${i === 0 ? "bg-white" : "bg-white/30"}`} />
            <div className={`h-1 w-6 rounded ${i === 0 ? "bg-white/80" : "bg-white/20"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

const gradients = [
  "linear-gradient(135deg, #2563EB 0%, #1e40af 100%)",
  "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
  "linear-gradient(135deg, #059669 0%, #047857 100%)",
  "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
];

export default function PhoneMockup({
  screenContent,
  gradient,
  className = "",
  label,
  delay = 0,
  floating = true,
}: PhoneMockupProps) {
  const randomGradient = gradient || gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={`relative ${className}`}
    >
      {floating && (
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <PhoneFrame gradient={randomGradient} screenContent={screenContent} />
        </motion.div>
      )}
      {!floating && <PhoneFrame gradient={randomGradient} screenContent={screenContent} />}

      {label && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs font-medium text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
            {label}
          </span>
        </div>
      )}
    </motion.div>
  );
}

function PhoneFrame({
  gradient,
  screenContent,
}: {
  gradient: string;
  screenContent?: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Outer frame */}
      <div
        className="w-[200px] h-[400px] rounded-[36px] p-[2px] shadow-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%)",
        }}
      >
        {/* Inner frame */}
        <div className="w-full h-full bg-slate-900 rounded-[34px] p-[8px] relative overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-b-2xl z-10" />

          {/* Screen */}
          <div className="w-full h-full rounded-[28px] overflow-hidden relative">
            {screenContent || <DefaultScreen gradient={gradient} />}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full" />
        </div>
      </div>

      {/* Glow */}
      <div
        className="absolute inset-0 rounded-[36px] blur-2xl opacity-20 -z-10"
        style={{ background: gradient }}
      />
    </div>
  );
}
