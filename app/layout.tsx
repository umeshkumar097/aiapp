import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const rawUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aiclex.in";
const APP_URL = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID || "AW-18336858770";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "902291945914083";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Android & iOS App Development — Only ₹49,999 | Aiclex Solutions",
    template: "%s | Aiclex Solutions",
  },
  description:
    "Build your Android + iOS mobile app for only ₹49,999. Includes source code, admin panel, Play Store & App Store publishing, and 1 year support. 500+ projects delivered. GST invoice provided.",
  keywords: [
    "mobile app development India",
    "Android app development",
    "iOS app development",
    "app development ₹49999",
    "mobile app developer Mumbai",
    "cheap app development India",
    "custom mobile app development",
    "restaurant app development",
    "ecommerce app development India",
  ],
  authors: [{ name: "Aiclex Solutions Private Limited" }],
  creator: "Aiclex Solutions",
  publisher: "Aiclex Solutions Private Limited",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: APP_URL,
    siteName: "Aiclex Solutions",
    title: "Android & iOS App Development — Only ₹49,999 | Aiclex Solutions",
    description:
      "Build a premium Android + iOS app for ₹49,999. Source code included. Play Store & App Store support. 1 year support. 500+ projects. GST invoice.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aiclex Solutions — Mobile App Development at ₹49,999",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Android & iOS App Development — Only ₹49,999",
    description: "Premium mobile app development for Indian businesses. Source code included.",
    images: ["/og-image.png"],
    creator: "@aiclexsolutions",
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
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${APP_URL}/#organization`,
      name: "Aiclex Solutions Private Limited",
      url: APP_URL,
      logo: `${APP_URL}/logo.png`,
      description: "Mobile app development company in India offering Android, iOS, and cross-platform apps.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-99999-99999",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
      },
      sameAs: [
        "https://g.page/aiclex-solutions",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${APP_URL}/#website`,
      url: APP_URL,
      name: "Aiclex Solutions",
      publisher: { "@id": `${APP_URL}/#organization` },
    },
    {
      "@type": "Service",
      name: "Mobile App Development",
      provider: { "@id": `${APP_URL}/#organization` },
      description: "Android and iOS mobile app development for Indian businesses at ₹49,999.",
      areaServed: "IN",
      offers: {
        "@type": "Offer",
        price: "49999",
        priceCurrency: "INR",
        description: "Android + iOS App with source code, admin panel, and 1 year support",
      },
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
              background: "#1e293b",
              color: "#f1f5f9",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#22C55E", secondary: "#fff" },
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
