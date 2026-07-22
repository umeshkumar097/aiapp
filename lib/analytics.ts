"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function fireGA4PurchaseEvent(params: {
  transactionId: string;
  value: number;
  currency: string;
  orderId: string;
}) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "purchase", {
    transaction_id: params.transactionId,
    value: params.value,
    currency: params.currency,
    items: [
      {
        item_id: "AICLEX_APP_VERIFICATION",
        item_name: "App Development Project Verification",
        price: params.value,
        quantity: 1,
      },
    ],
  });
}

export function fireGoogleAdsConversion(params: {
  transactionId: string;
  value: number;
  currency: string;
}) {
  if (typeof window === "undefined" || !window.gtag) return;

  const conversionId = process.env.NEXT_PUBLIC_GADS_ID;
  const conversionLabel = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;

  if (!conversionId || !conversionLabel) return;

  window.gtag("event", "conversion", {
    send_to: `${conversionId}/${conversionLabel}`,
    value: params.value,
    currency: params.currency,
    transaction_id: params.transactionId,
  });
}

export function fireMetaPixelPurchase(params: {
  value: number;
  currency: string;
  orderId: string;
}) {
  if (typeof window === "undefined" || !window.fbq) return;

  window.fbq("track", "Purchase", {
    value: params.value,
    currency: params.currency,
    content_ids: [params.orderId],
    content_type: "product",
  });
}

export function trackFormStart() {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "form_start", { event_category: "lead_form" });
}

export function trackCTAClick(ctaName: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "cta_click", { cta_name: ctaName });
}

export function fireAllTrackingEvents(params: {
  transactionId: string;
  orderId: string;
  value: number;
  currency: string;
}) {
  fireGA4PurchaseEvent(params);
  fireGoogleAdsConversion(params);
  fireMetaPixelPurchase({ ...params });
}
