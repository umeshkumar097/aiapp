import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const rawUrl = process.env.NEXT_PUBLIC_APP_URL || "https://siteboard.in";
const APP_URL = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID || "AW-18336858770";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "902291945914083";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Siteboard — India's Smartest Real Estate CRM | Pan India Properties",
    template: "%s | Siteboard",
  },
  description:
    "Siteboard by Aiclex Technologies — Find RERA-approved plots, apartments & villas across India. Get expert guidance, zero brokerage, and 100% legal clearance. Enquire now.",
  keywords: [
    "real estate India",
    "plots for sale Noida",
    "buy apartment India",
    "RERA approved property",
    "real estate CRM India",
    "affordable housing India",
    "villa for sale India",
    "property investment India",
    "Siteboard real estate",
  ],
  authors: [{ name: "Aiclex Technologies" }],
  creator: "Siteboard by Aiclex Technologies",
  publisher: "Aiclex Technologies",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: APP_URL,
    siteName: "Siteboard",
    title: "Siteboard — India's Smartest Real Estate CRM",
    description:
      "Find RERA-approved plots, apartments & villas across India. Expert guidance, zero brokerage, 100% legal clearance.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Siteboard — India's Smartest Real Estate Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siteboard — India's Smartest Real Estate CRM",
    description: "Find RERA-approved properties across India. Expert guidance, zero brokerage.",
    images: ["/og-image.png"],
    creator: "@siteboard_in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: APP_URL,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": `${APP_URL}/#organization`,
      name: "Siteboard by Aiclex Technologies",
      url: APP_URL,
      description: "India's smartest real estate platform — RERA-approved plots, apartments & villas Pan India.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sector 3",
        addressLocality: "Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201301",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-8449488090",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${APP_URL}/#website`,
      url: APP_URL,
      name: "Siteboard",
      publisher: { "@id": `${APP_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Ads Tag */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GADS_ID}');
              ${GA4_ID ? `gtag('config', '${GA4_ID}');` : ""}
            `,
          }}
        />

        {/* Meta Pixel */}
        {META_PIXEL_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                  document,'script','https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${META_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        {/* Inter Google Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#ffffff",
              color: "#1e293b",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              fontSize: "14px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            },
            success: {
              iconTheme: { primary: "#16a34a", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
