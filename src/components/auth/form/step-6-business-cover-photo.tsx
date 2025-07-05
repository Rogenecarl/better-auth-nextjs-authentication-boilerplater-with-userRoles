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

export function Step5BusinessCoverPhoto({ form }: Props) {
  return (
    <div className="space-y-4 animate-in fade-in-50">
      <h2 className="text-xl font-semibold">Business Cover Photo</h2>
      <p className="text-sm text-muted-foreground">
        Upload a banner image for your provider profile page. This will be the
        first thing users see.
      </p>
      <FormField
        control={form.control}
        name="bannerPhoto"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Banner Photo</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".jpg, .jpeg, .png, .webp"
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
