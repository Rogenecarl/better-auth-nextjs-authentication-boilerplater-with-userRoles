"use client";
import { UseFormReturn } from "react-hook-form";
import { ProviderRegisterData } from "@/components/auth/schemas/provider-register-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
  form: UseFormReturn<ProviderRegisterData>;
}

export function Step4BusinessDocuments({ form }: Props) {
  return (
    <div className="space-y-4 animate-in fade-in-50">
      <h2 className="text-xl font-semibold">Verification Documents</h2>
      <p className="text-sm text-muted-foreground">
        Please provide your business permit and professional license numbers for
        verification.
      </p>
      <FormField
        control={form.control}
        name="permitNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Permit Number</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 2024-12345" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="licenseNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Professional License Number (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="e.g., PRC-54321" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="documentPhoto"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Permit/License Document Photo</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".jpg, .jpeg, .png, .pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
