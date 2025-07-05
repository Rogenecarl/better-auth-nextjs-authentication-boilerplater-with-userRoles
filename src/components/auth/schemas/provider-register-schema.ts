import { z } from "zod";
import { ProviderType } from "@/generated/prisma";

// --- Helper for File Validation ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_DOC_TYPES = [...ACCEPTED_IMAGE_TYPES, "application/pdf"];

const fileSchema = (acceptedTypes: string[]) =>
  z
    .any()
    .refine((file) => file?.name, "This field is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => acceptedTypes.includes(file?.type),
      `Accepted formats: ${acceptedTypes
        .map((t) => t.split("/")[1])
        .join(", ")}.`
    );

// --- Step 1: Personal Info ---
export const step1Schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

// --- Step 2: Business Info ---
export const step2Schema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  providerType: z.nativeEnum(ProviderType, {
    required_error: "Please select a provider type",
  }),
  businessPhone: z.string().min(10, "A valid business phone is required"),
  businessEmail: z.string().email("A valid business email is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  zipCode: z.string().optional(),
});

// --- Step 3: Services & Schedule ---
const timeStringSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)");

export const step3Schema = z.object({
  services: z
    .array(
      z.object({
        name: z.string().min(2, "Service name is required"),
        description: z.string().optional(),
        priceRange: z.string().optional(),
      })
    )
    .min(1, "Please add at least one service"),
  operatingSchedule: z
    .array(
      z.object({
        dayOfWeek: z.number().min(0).max(6),
        isOpen: z.boolean().default(true),
        openTime: timeStringSchema,
        closeTime: timeStringSchema,
      })
    )
    .length(7, "Schedule must be set for all 7 days"),
});

// --- Step 4: Business Documents ---
export const step4Schema = z.object({
  permitNumber: z.string().min(1, "Permit number is required"),
  licenseNumber: z.string().optional(),
  documentPhoto: fileSchema(ACCEPTED_DOC_TYPES),
});

// --- Step 5: Business Location ---
export const step5Schema = z.object({
  latitude: z.coerce
    .number({
      required_error: "Latitude is required",
      invalid_type_error: "Latitude must be a number",
    })
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90")
    .refine((val) => !isNaN(val) && Number.isFinite(val), {
      message: "Please provide a valid latitude coordinate",
    }),
  longitude: z.coerce
    .number({
      required_error: "Longitude is required",
      invalid_type_error: "Longitude must be a number",
    })
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180")
    .refine((val) => !isNaN(val) && Number.isFinite(val), {
      message: "Please provide a valid longitude coordinate",
    }),
});

// --- Step 6: Business Cover Photo ---
export const step6Schema = z.object({
  bannerPhoto: fileSchema(ACCEPTED_IMAGE_TYPES),
});

// --- Step 7: Account Setup ---
const step7BaseSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
});

export const step7Schema = step7BaseSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// --- Final Merged Schema ---
export const providerRegisterSchema = z
  .object({
    ...step1Schema.shape,
    ...step2Schema.shape,
    ...step3Schema.shape,
    ...step4Schema.shape,
    ...step5Schema.shape,
    ...step6Schema.shape,
    ...step7BaseSchema.shape,
  });

export type ProviderRegisterData = z.infer<typeof providerRegisterSchema>;
