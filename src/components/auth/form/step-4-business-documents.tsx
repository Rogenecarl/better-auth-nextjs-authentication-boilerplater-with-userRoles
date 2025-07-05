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
import { FileText, Shield, Upload } from "lucide-react";

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

      <div className="border-blue-100 rounded-lg">
        <div className="flex gap-3 mb-5 bg-blue-50 border border-blue-100 rounded-lg p-3">
          <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 text-sm">Business Verification</h3>
            <p className="text-sm text-blue-700 mt-1">
              Upload your business documents for verification and compliance
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-5">
          <FormField
            control={form.control}
            name="permitNumber"
            render={({ field }) => (
              <FormItem className="space-y-0 flex-1">
                <FormLabel htmlFor="permitNumber" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  Business Permit Number
                </FormLabel>
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
              <FormItem className="space-y-0 flex-1">
                <FormLabel htmlFor="licenseNumber" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  Professional License Number (Optional)
                </FormLabel>
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
        </div>
        
        <FormField
          control={form.control}
          name="documentPhoto"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="documentPhoto" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Upload className="w-4 h-4 text-gray-500" />
                Permit/License Document Photo
              </FormLabel>
              <FormControl>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-blue-50/30 hover:bg-blue-50/50 border-blue-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="w-12 h-12 mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                        <Upload className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="mb-2 text-sm font-medium text-blue-700">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-blue-600">.jpg, .jpeg, .png, .pdf (MAX. 10MB)</p>
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
