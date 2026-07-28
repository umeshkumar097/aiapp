"use client";

/**
 * Analytics helpers for Siteboard lead-gen tracking.
 * 
 * GA4:         fires "generate_lead" event on form submit (Thank You page)
 * Google Ads:  fires conversion event via NEXT_PUBLIC_GADS_ID / NEXT_PUBLIC_GADS_CONVERSION_LABEL
 * Meta Pixel:  fires "Lead" event on form submit
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** GA4 — lead conversion event */
export function fireGA4LeadEvent(params: {
  transactionId: string;
  orderId: string;
}) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "generate_lead", {
    transaction_id: params.transactionId,
    currency: "INR",
    value: 0,
    items: [
      {
        item_id: "SITEBOARD_DEMO_REQUEST",
        item_name: "Siteboard Free Demo Request",
        quantity: 1,
      },
    ],
  });
}

/** Google Ads — fires the conversion action configured in GADS env vars */
export function fireGoogleAdsConversion(params: {
  transactionId: string;
  value?: number;
  currency?: string;
}) {
  if (typeof window === "undefined" || !window.gtag) return;

  const conversionId = process.env.NEXT_PUBLIC_GADS_ID;
  const conversionLabel = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;

  if (!conversionId || !conversionLabel) return;

  window.gtag("event", "conversion", {
    send_to: `${conversionId}/${conversionLabel}`,
    value: params.value ?? 0,
    currency: params.currency ?? "INR",
    transaction_id: params.transactionId,
  });
}

/** Meta Pixel — Lead event */
export function fireMetaPixelLead(params: { orderId: string }) {
  if (typeof window === "undefined" || !window.fbq) return;

  window.fbq("track", "Lead", {
    content_name: "Siteboard Demo Request",
    content_ids: [params.orderId],
    content_type: "product",
    currency: "INR",
    value: 0,
  });
}

/** Generic helpers */
export function trackFormStart() {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "form_start", { event_category: "demo_request" });
}

export function trackCTAClick(ctaName: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "cta_click", { cta_name: ctaName });
}

/** 
 * Master fire — call this once from /thank-you page.
 * Fires GA4 + Google Ads conversion + Meta Pixel simultaneously.
 */
export function fireAllTrackingEvents(params: {
  transactionId: string;
  orderId: string;
  value: number;
  currency: string;
}) {
  fireGA4LeadEvent(params);
  fireGoogleAdsConversion(params);
  fireMetaPixelLead({ orderId: params.orderId });
}
