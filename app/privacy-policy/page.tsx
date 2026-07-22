import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Aiclex Solutions",
  description: "Privacy Policy for Aiclex Solutions Private Limited — Mobile App Development.",
};

const content = `
**Effective Date:** July 22, 2024  
**Company:** Aiclex Solutions Private Limited  
**Website:** https://aiclex.in

## 1. Information We Collect

When you submit a project inquiry, we collect:
- Name, email address, and phone number
- Business name and project description
- Payment information (processed securely via Cashfree — we do not store card details)
- Browser/device metadata and IP address

## 2. How We Use Your Information

We use the information to:
- Contact you about your project inquiry
- Process the ₹99 refundable verification payment
- Send project proposals and updates
- Improve our services

## 3. Payment Security

Payments are processed by Cashfree Payments, a PCI DSS Level 1 certified payment gateway. We do not store your card details on our servers.

## 4. Data Sharing

We do not sell, rent, or share your personal information with third parties, except:
- Payment processors (Cashfree) to process transactions
- Email service providers to send you confirmations
- As required by law

## 5. Data Retention

We retain your inquiry data for 2 years or until you request deletion.

## 6. Your Rights

You have the right to:
- Access, correct, or delete your personal data
- Opt-out of marketing communications
- Request data portability

Contact us at privacy@aiclex.in to exercise these rights.

## 7. Cookies

Our website uses essential cookies for session management and analytics cookies (Google Analytics) to understand how visitors use our site.

## 8. Contact

**Aiclex Solutions Private Limited**  
Email: privacy@aiclex.in  
Phone: +91 99999 99999  
Address: Mumbai, Maharashtra, India
`;

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
          <p className="text-slate-400 text-sm mb-8">Last updated: July 22, 2024</p>
          <div className="glass rounded-3xl border border-white/10 p-8 prose prose-invert prose-sm max-w-none">
            {content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return <h2 key={i} className="text-white font-bold text-lg mt-6 mb-2">{line.replace('## ', '')}</h2>;
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="text-white font-semibold">{line.replace(/\*\*/g, '')}</p>;
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="text-slate-300 text-sm ml-4">{line.replace('- ', '')}</li>;
              }
              if (line.trim() === '') return <div key={i} className="h-2" />;
              return <p key={i} className="text-slate-300 text-sm leading-relaxed">{line}</p>;
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
