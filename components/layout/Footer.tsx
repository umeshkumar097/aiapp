import Link from "next/link";
import { Phone, Mail, MapPin, Building2 } from "lucide-react";

const footerLinks = {
  Properties: [
    { label: "Plots & Land", href: "#lead-form" },
    { label: "Apartments", href: "#lead-form" },
    { label: "Villas & Houses", href: "#lead-form" },
    { label: "Commercial Spaces", href: "#lead-form" },
    { label: "Pan India Projects", href: "#portfolio" },
  ],
  QuickLinks: [
    { label: "Why Siteboard", href: "#features" },
    { label: "Our Projects", href: "#portfolio" },
    { label: "How It Works", href: "#process" },
    { label: "Testimonials", href: "#testimonials" },
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
    <footer className="bg-slate-900 text-slate-400 text-sm" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <Building2 size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white font-black text-xl tracking-tight">
                  Site<span className="text-blue-400">board</span>
                </p>
                <p className="text-slate-500 text-xs">by Aiclex Technologies</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              India&apos;s smartest real estate platform — connecting families to
              RERA-approved properties with zero brokerage and 100% legal clearance.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1.5 text-xs">
              <p><strong className="text-slate-300">Company:</strong> Aiclex Technologies</p>
              <p><strong className="text-slate-300">GSTIN:</strong> 09ABGCA0151N1ZL</p>
              <p><strong className="text-slate-300">CIN:</strong> U62099UW2026PTC254970</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-base mb-4">Contact Us</h3>
            <a
              href="tel:+918449488090"
              className="flex items-center gap-2.5 text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Phone size={15} className="text-blue-400" />
              <span>+91 8449488090</span>
            </a>
            <a
              href="mailto:info@siteboard.in"
              className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors"
            >
              <Mail size={15} className="text-slate-500" />
              <span>info@siteboard.in</span>
            </a>
            <div className="flex items-start gap-2.5">
              <MapPin size={15} className="text-slate-500 mt-0.5 flex-shrink-0" />
              <span>Sector 3, Noida, Uttar Pradesh – 201301</span>
            </div>
          </div>

          {/* Properties */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Properties</h3>
            <ul className="space-y-2">
              {footerLinks.Properties.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links + Legal */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2 mb-4">
              {footerLinks.QuickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 pt-3 border-t border-white/10">
              {footerLinks.Legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors text-xs">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pan India offices */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Pan India Operations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {[
              { city: "Noida (HQ)", address: "E58, Sector 3, Noida, UP – 201301" },
              { city: "Greater Noida", address: "Gaur City, Greater Noida West, UP – 201318" },
              { city: "Pune", address: "Kalyani Nagar, Pune, Maharashtra – 411006" },
            ].map((office) => (
              <div key={office.city} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="flex items-center gap-2 text-blue-400 font-bold mb-1">
                  <MapPin size={13} />
                  <span>{office.city}</span>
                </div>
                <p className="text-slate-400">{office.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-center text-xs text-slate-500 leading-relaxed">
          <p>
            © 2025–26 All rights reserved by{" "}
            <strong className="text-slate-400">Aiclex Technologies</strong> — operating as{" "}
            <strong className="text-slate-400">Siteboard</strong>&nbsp;|&nbsp;
            RERA compliant · Zero Brokerage · Pan India
          </p>
        </div>
      </div>
    </footer>
  );
}
