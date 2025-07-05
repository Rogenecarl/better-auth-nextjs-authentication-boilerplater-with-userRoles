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
import { Image } from "lucide-react";

interface Props {
  form: UseFormReturn<ProviderRegisterData>;
}

export function Step5BusinessCoverPhoto({ form }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="flex items-center gap-2 mb-6">
        <Image className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800">
          Business Cover Photo
        </h2>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Upload a banner image for your provider profile page. This will be the
        first thing users see.
      </p>

      <div className="grid gap-4 mt-6">
        <FormField
          control={form.control}
          name="bannerPhoto"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel
                htmlFor="bannerPhoto"
                className="text-sm font-medium text-gray-700"
              >
                Banner Photo
              </FormLabel>
              <FormControl>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-10 h-10 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        .jpg, .jpeg, .png, .webp (MAX. 10MB)
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Recommended size: 1920x480 pixels
                      </p>
                    </div>
                    <Input
                      id="bannerPhoto"
                      type="file"
                      accept=".jpg, .jpeg, .png, .webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                    />
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
