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
import { Image, Upload } from "lucide-react";

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
        Upload a banner image for your provider profile page
      </p>

      <div className="border-blue-100 rounded-lg">
        <div className="flex gap-3 mb-5 bg-blue-50 border border-blue-100 rounded-lg p-3">
          <Image className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 text-sm">Profile Banner</h3>
            <p className="text-sm text-blue-700 mt-1">
              This will be the first thing users see when they visit your profile
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="bannerPhoto"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel
                  htmlFor="bannerPhoto"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Upload className="w-4 h-4 text-gray-500" />
                  Banner Photo
                </FormLabel>
                <FormControl>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-blue-50/30 hover:bg-blue-50/50 border-blue-200">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="w-12 h-12 mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                          <Upload className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="mb-2 text-sm font-medium text-blue-700">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-blue-600">
                          .jpg, .jpeg, .png, .webp (MAX. 10MB)
                        </p>
                        <p className="text-xs text-blue-600 mt-2">
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
    </div>
  );
}
