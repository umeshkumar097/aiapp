// Shared types for the application

export interface Lead {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  fullName: string;
  phone: string;
  email: string;
  company: string | null;
  businessName: string | null;
  projectName: string | null;
  projectDescription: string | null;
  budget: string | null;
  timeline: string | null;
  platform: string;
  paymentStatus: string;
  orderId: string | null;
  paymentId: string | null;
  cfPaymentId: string | null;
  amount: number;
  currency: string;
  gclid: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  adminNotes: string | null;
  callbackTime: Date | string | null;
  isVerified: boolean;
}

export interface PendingOrder {
  id: string;
  createdAt: Date | string;
  orderId: string;
  sessionId: string;
  formData: Record<string, unknown>;
  status: string;
  expiresAt: Date | string;
}
