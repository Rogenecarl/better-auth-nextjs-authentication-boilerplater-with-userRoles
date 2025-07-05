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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProviderType } from "@/generated/prisma";
import { Building2 } from "lucide-react";

interface Props {
  form: UseFormReturn<ProviderRegisterData>;
}

export function Step2BusinessInfo({ form }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800">Business Information</h2>
      </div>
      <p className="text-sm text-gray-500">
        Tell us about your healthcare business and its location
      </p>

      <div className="grid gap-4 mt-5">
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="businessName" className="text-sm font-medium text-gray-700">Business Name</FormLabel>
              <FormControl>
                <Input 
                  id="businessName"
                  type="text"
                  placeholder="City Health Clinic" 
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
          name="providerType"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="providerType" className="text-sm font-medium text-gray-700">Provider Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                    <SelectValue placeholder="Select a provider type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ProviderType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <FormField
          control={form.control}
          name="businessEmail"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="businessEmail" className="text-sm font-medium text-gray-700">Business Email</FormLabel>
              <FormControl>
                <Input
                  id="businessEmail"
                  type="email"
                  placeholder="contact@clinic.com"
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
          name="businessPhone"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="businessPhone" className="text-sm font-medium text-gray-700">Business Phone</FormLabel>
              <FormControl>
                <Input 
                  id="businessPhone"
                  type="tel"
                  placeholder="(123) 456-7890" 
                  {...field} 
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-4 mt-3">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="address" className="text-sm font-medium text-gray-700">Street Address</FormLabel>
              <FormControl>
                <Input 
                  id="address"
                  type="text"
                  placeholder="123 Main St, Suite 4B" 
                  {...field} 
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="city" className="text-sm font-medium text-gray-700">City</FormLabel>
              <FormControl>
                <Input 
                  id="city"
                  type="text"
                  placeholder="Metropolis" 
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
          name="province"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="province" className="text-sm font-medium text-gray-700">Province</FormLabel>
              <FormControl>
                <Input 
                  id="province"
                  type="text"
                  placeholder="Central Province" 
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
          name="zipCode"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="zipCode" className="text-sm font-medium text-gray-700">Zip Code</FormLabel>
              <FormControl>
                <Input 
                  id="zipCode"
                  type="text"
                  placeholder="12345" 
                  {...field} 
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
