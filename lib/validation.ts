import { z } from "zod";

export const LeadFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email address"),
  companyName: z.string().min(2, "Please enter your company name").max(200),
  propertyType: z.enum(["plots", "apartments", "houses", "commercial", "mixed"]),
  unitCount: z.string().optional(),
  city: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
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

export const SubmitLeadSchema = z.object({
  formData: LeadFormSchema.omit({ agreeToPrivacy: true }),
});

export const AdminLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type LeadFormInput = z.infer<typeof LeadFormSchema>;
export type SubmitLeadInput = z.infer<typeof SubmitLeadSchema>;
