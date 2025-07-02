import { z } from "zod";
import { ProviderType } from "@/generated/prisma";

const isServer = typeof window === "undefined";

// Modified to accept both File objects and strings (for static URLs)
const fileSchema = z
  .union([
    z.any().refine(
      (file) => (isServer ? file instanceof File : true),
      "Invalid file format."
    ),
    z.string().min(1, "File URL is required")
  ])
  .optional()
  .nullable();

const personalInfoFields = {
  email: z.string().email("Please enter a valid personal email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  validIdType: z.string().min(1, "Please select a valid ID type"),
  idImage: fileSchema.refine((file) => !!file, {
    message: "A valid ID image is required.",
  }),
};

const businessInfoFields = {
  providerType: z.nativeEnum(ProviderType, {
    errorMap: () => ({ message: "Please select a provider type" }),
  }),
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  businessPhone: z.string().min(10, "Business phone number is required"),
  businessEmail: z
    .string()
    .email("Please enter a valid business email address"),
  businessAddress: z.string().min(5, "Business address is required"),
  businessCity: z.string().min(2, "City is required"),
  businessProvince: z.string().min(2, "Province is required"),
  businessZipCode: z.string().min(4, "ZIP code is required"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
};

const serviceFields = {
  services: z
    .array(
      z.object({
        serviceName: z.string().min(2, "Service name is required"),
        description: z
          .string()
          .min(10, "Description must be at least 10 characters"),
        priceRange: z.string().optional(),
      })
    )
    .min(1, "At least one service is required"),
  operatingDays: z
    .array(z.string())
    .min(1, "Select at least one operating day"),
  openTime: z.string().min(1, "Select opening time"),
  closeTime: z.string().min(1, "Select closing time"),
};

const businessDocsFields = {
  permitNumber: z.string().min(5, "Permit number is required"),
  licenseNumber: z.string().optional(),
  permitImageUrl: fileSchema.refine((file) => !!file, {
    message: "A permit/license image is required.",
  }),
  businessImage: fileSchema, // This field is optional
};

const accountSetupBaseFields = {
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
};

export const completeRegistrationSchema = z
  .object({
    ...personalInfoFields,
    ...businessInfoFields,
    ...serviceFields,
    ...businessDocsFields,
    ...accountSetupBaseFields,
  })
  .refine((data) => data.openTime !== data.closeTime, {
    message: "Opening and closing times must differ",
    path: ["closeTime"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type CompleteRegistrationFormData = z.infer<
  typeof completeRegistrationSchema
>;
