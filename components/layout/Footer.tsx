import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Android App Development", href: "#features" },
    { label: "iOS App Development", href: "#features" },
    { label: "Cross Platform Apps", href: "#features" },
    { label: "CRM & ERP Software", href: "#features" },
    { label: "Business Automation", href: "#features" },
  ],
  QuickLinks: [
    { label: "Features", href: "#features" },
    { label: "What We Build", href: "#" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Our Process", href: "#process" },
    { label: "Pricing & Offer", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 text-slate-400 text-sm" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Trust statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="AICLEX Technologies Logo"
                className="h-10 w-auto object-contain bg-white/95 px-2.5 py-1 rounded-xl shadow-lg"
              />
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Elevate your brand with <strong>AICLEX™ Technologies</strong> — trading name of <strong>Aiclex Solutions Pvt. Ltd.</strong> Our comprehensive brand development strategies are designed to make your business stand out.
            </p>

            {/* DPIIT Badge */}
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-1.5 text-xs text-green-400 font-semibold">
              <ShieldCheck size={16} />
              <span>DPIIT Recognized Startup (DIPP271379)</span>
            </div>

            {/* Registration Details */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-1.5 text-xs">
              <p><strong className="text-slate-200">CIN:</strong> U62099UW2026PTC254970</p>
              <p><strong className="text-slate-200">GSTIN:</strong> 09ABGCA0151N1ZL</p>
              <p><strong className="text-slate-200">Company:</strong> Aiclex Solutions Pvt. Ltd.</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-base mb-4">Contact Us</h3>
            <a
              href="https://wa.me/919871881183"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-slate-300 hover:text-green-400 transition-colors"
            >
              <MessageCircle size={16} className="text-green-400" />
              <span>WhatsApp: +91 98718 81183</span>
            </a>
            <a
              href="tel:+918449488090"
              className="flex items-center gap-2.5 text-slate-300 hover:text-blue-400 transition-colors"
            >
              <Phone size={16} className="text-blue-400" />
              <span>Call: +91 84494 88090</span>
            </a>
            <a
              href="mailto:info@aiclex.in"
              className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail size={16} className="text-slate-400" />
              <span>info@aiclex.in</span>
            </a>
            <a
              href="mailto:sales@aiclex.in"
              className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail size={16} className="text-slate-400" />
              <span>sales@aiclex.in</span>
            </a>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Our Services</h3>
            <ul className="space-y-2">
              {footerLinks.Services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Quick Links & Legal</h3>
            <ul className="space-y-2 mb-4">
              {footerLinks.QuickLinks.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 pt-2 border-t border-white/5">
              {footerLinks.Legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors text-xs text-slate-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Office Locations Grid */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Our Offices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="flex items-center gap-2 text-blue-400 font-bold mb-1">
                <MapPin size={14} />
                <span>Corporate Office (Noida)</span>
              </div>
              <p className="text-slate-300">Gaur City Mall, Greater Noida, 201318</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="flex items-center gap-2 text-blue-400 font-bold mb-1">
                <MapPin size={14} />
                <span>Registered Office</span>
              </div>
              <p className="text-slate-300">E58, Sector 3, Noida, UP – 201301</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="flex items-center gap-2 text-blue-400 font-bold mb-1">
                <MapPin size={14} />
                <span>Corporate Office (Pune)</span>
              </div>
              <p className="text-slate-300">Ground floor, Kalyani Nagar, Pune, Maharashtra 411006</p>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="border-t border-white/10 pt-6 text-center text-xs text-slate-400 leading-relaxed">
          <p>
            2025-26 © All rights reserved by <strong>Aiclex Solutions Pvt. Ltd.</strong> (Trading as <strong>AICLEX™ Technologies</strong>) &nbsp;|&nbsp; 
            <strong>CIN:</strong> U62099UW2026PTC254970 &nbsp;|&nbsp; 
            <strong>GSTIN:</strong> 09ABGCA0151N1ZL &nbsp;|&nbsp; 
            <strong>DPIIT Recognized Startup</strong> (DIPP271379)
          </p>
        </div>

      </div>
    </footer>
  );
}
