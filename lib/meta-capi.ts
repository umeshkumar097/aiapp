import crypto from "crypto";

/**
 * Meta Conversions API (CAPI) — Server-side event sender
 *
 * Jab CRM mein lead ka status change ho, Meta ko signal bhejta hai
 * taaki Facebook algorithm better optimize kar sake.
 *
 * Status → Meta Event mapping:
 *   INTERESTED    → Lead
 *   QUALIFIED     → Schedule
 *   PAID          → Purchase
 */

const PIXEL_ID = process.env.META_PIXEL_ID_SERVER || "4485040718490356";
const CAPI_TOKEN = process.env.META_CAPI_TOKEN;
const CAPI_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

// SHA-256 hash (Meta requires hashed PII)
function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

// Normalize Indian phone → +91XXXXXXXXXX
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) return `+${digits}`;
  if (digits.length === 10) return `+91${digits}`;
  return `+91${digits}`;
}

// Map CRM status → Meta event name
export function statusToMetaEvent(status: string): string | null {
  const map: Record<string, string> = {
    INTERESTED: "Lead",
    QUALIFIED:  "Schedule",
    PAID:       "Purchase",
  };
  return map[status] ?? null;
}

interface CAPIPayload {
  leadId:    string;
  phone?:    string | null;
  email?:    string | null;
  status:    string;
  value?:    number;
  currency?: string;
}

export async function sendMetaCAPIEvent(payload: CAPIPayload): Promise<void> {
  if (!CAPI_TOKEN) {
    console.warn("[CAPI] META_CAPI_TOKEN not set — skipping");
    return;
  }

  const eventName = statusToMetaEvent(payload.status);
  if (!eventName) return; // Not a trackable status

  // Build user_data with hashed PII
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user_data: Record<string, any> = {};
  if (payload.phone) {
    user_data.ph = sha256(normalizePhone(payload.phone));
  }
  if (payload.email) {
    user_data.em = sha256(payload.email);
  }

  const event = {
    event_name:      eventName,
    event_time:      Math.floor(Date.now() / 1000),
    action_source:   "system_generated", // CRM-triggered, not browser
    event_id:        `${payload.leadId}_${payload.status}_${Date.now()}`,
    user_data,
    custom_data: {
      content_name:     "Siteboard Demo Request",
      content_category: "Real Estate SaaS",
      currency:         payload.currency ?? "INR",
      value:            payload.value ?? 0,
      lead_id:          payload.leadId,
      crm_status:       payload.status,
    },
  };

  try {
    const res = await fetch(CAPI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data:          [event],
        access_token:  CAPI_TOKEN,
        test_event_code: process.env.META_CAPI_TEST_CODE ?? undefined,
      }),
    });

    const result = await res.json();
    if (!res.ok) {
      console.error("[CAPI] Error:", result);
    } else {
      console.log(`[CAPI] ✅ ${eventName} sent for lead ${payload.leadId} — events_received: ${result.events_received}`);
    }
  } catch (err) {
    console.error("[CAPI] Network error:", err);
  }
}
