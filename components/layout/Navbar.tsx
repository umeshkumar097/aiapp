"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Building2 } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Properties", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Reading progress bar */}
      <div className="progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo — text only */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
              <Building2 size={18} className="text-white" />
            </div>
            <span className="text-slate-900 font-black text-lg tracking-tight">
              Site<span className="text-blue-600">board</span>
            </span>
            <span className="hidden sm:block text-slate-400 text-xs font-medium border-l border-slate-200 pl-2 ml-1">
              by Aiclex Technologies
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+918449488090"
              className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 text-sm transition-colors"
            >
              <Phone size={14} />
              <span>+91 8449488090</span>
            </a>
            <button
              onClick={() => handleNavClick("#lead-form")}
              className="btn-gradient text-white text-sm font-bold px-5 py-2.5 rounded-xl"
              id="nav-cta"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-600 hover:text-blue-600 transition-colors p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden shadow-lg"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl text-sm font-medium transition-all"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-3 space-y-2">
                  <a
                    href="tel:+918449488090"
                    className="flex items-center gap-2 px-4 py-3 text-slate-600 text-sm"
                  >
                    <Phone size={14} className="text-blue-600" />
                    +91 8449488090
                  </a>
                  <button
                    onClick={() => handleNavClick("#lead-form")}
                    className="w-full btn-gradient text-white font-bold py-3 rounded-xl text-sm"
                    id="mobile-nav-cta"
                  >
                    Enquire Now — Free Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
