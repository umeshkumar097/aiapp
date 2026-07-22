import { z } from "zod";

export const LeadFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email address"),
  company: z.string().max(200).optional(),
  businessName: z.string().max(200).optional(),
  projectName: z.string().max(200).optional(),
  projectDescription: z.string().max(2000).optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  platform: z.enum(["android", "ios", "both"]),
  agreeToPrivacy: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to the Privacy Policy",
    }),
  // UTM params
  gclid: z.string().max(200).optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(200).optional(),
  utmTerm: z.string().max(200).optional(),
  utmContent: z.string().max(200).optional(),
});

export const CreateOrderSchema = z.object({
  formData: LeadFormSchema.omit({ agreeToPrivacy: true }),
});

export const VerifyPaymentSchema = z.object({
  orderId: z.string().min(1).max(200),
});

export const AdminLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type LeadFormInput = z.infer<typeof LeadFormSchema>;
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type VerifyPaymentInput = z.infer<typeof VerifyPaymentSchema>;
