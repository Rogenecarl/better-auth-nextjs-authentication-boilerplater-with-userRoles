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
import { FileText } from "lucide-react";

interface Props {
  form: UseFormReturn<ProviderRegisterData>;
}

export function Step4BusinessDocuments({ form }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800">Verification Documents</h2>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Please provide your business permit and professional license numbers for verification
      </p>

      <div className="grid gap-4 mt-5">
        <FormField
          control={form.control}
          name="permitNumber"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="permitNumber" className="text-sm font-medium text-gray-700">Business Permit Number</FormLabel>
              <FormControl>
                <Input 
                  id="permitNumber"
                  type="text"
                  placeholder="e.g., 2024-12345" 
                  {...field} 
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="licenseNumber" className="text-sm font-medium text-gray-700">Professional License Number (Optional)</FormLabel>
              <FormControl>
                <Input 
                  id="licenseNumber"
                  type="text"
                  placeholder="e.g., PRC-54321" 
                  {...field} 
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="documentPhoto"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="documentPhoto" className="text-sm font-medium text-gray-700">Permit/License Document Photo</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">.jpg, .jpeg, .png, .pdf (MAX. 10MB)</p>
                    </div>
                    <Input
                      id="documentPhoto"
                      type="file"
                      accept=".jpg, .jpeg, .png, .pdf"
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
