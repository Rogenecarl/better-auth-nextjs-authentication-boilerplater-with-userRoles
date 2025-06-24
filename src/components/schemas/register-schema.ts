import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const providerRegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  licenseNumber: z.string().min(5, "License number must be at least 5 characters"),
});

export type RegisterSchemaType = z.infer<typeof userRegisterSchema>;
export type ProviderRegisterSchemaType = z.infer<typeof providerRegisterSchema>;
