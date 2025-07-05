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
import { Building2, MapPin, Phone, Mail, Building } from "lucide-react";

interface Props {
  form: UseFormReturn<ProviderRegisterData>;
}

export function Step2BusinessInfo({ form }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="flex items-center gap-2 mb-6">
        <Building className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800">Business Information</h2>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Provide details about your healthcare business for registration
      </p>

      <div className="flex flex-col lg:flex-row gap-6 mt-5">
        {/* Business Details Card */}
        <div className="flex-1">
          <div className="flex gap-3 mb-5 bg-blue-50 border border-blue-100 rounded-lg p-3">
            <Building2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800 text-sm">Business Details</h3>
              <p className="text-sm text-blue-700 mt-1">
                Provide information about your healthcare business for your profile
              </p>
            </div>
          </div>
        

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel htmlFor="businessName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    Business Name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      id="businessName"
                      type="text"
                      placeholder="Enter your business name" 
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
                  <FormLabel htmlFor="providerType" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    Business Type
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger id="providerType" className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                        <SelectValue placeholder="Select business type" />
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
                  <p className="text-xs text-gray-500">Choose the category that best describes your healthcare business</p>
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="businessEmail"
                render={({ field }) => (
                  <FormItem className="space-y-0 flex-1">
                    <FormLabel htmlFor="businessEmail" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      Business Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="businessEmail"
                        type="email"
                        placeholder="Enter business email"
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
                  <FormItem className="space-y-0 flex-1">
                    <FormLabel htmlFor="businessPhone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      Business Phone
                    </FormLabel>
                    <FormControl>
                      <Input 
                        id="businessPhone"
                        type="tel"
                        placeholder="Enter business phone" 
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
        </div>

        {/* Location Information Card */}
        <div className="flex-1">
          <div className="flex gap-3 mb-5 bg-blue-50 border border-blue-100 rounded-lg p-3">
            <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800 text-sm">Location Information</h3>
              <p className="text-sm text-blue-700 mt-1">
                Your business location will be displayed to patients searching for healthcare services
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    Business Address
                  </FormLabel>
                  <FormControl>
                    <Input 
                      id="address"
                      type="text"
                      placeholder="Enter business address" 
                      {...field} 
                      className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="space-y-0 flex-1">
                    <FormLabel htmlFor="city" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      City
                    </FormLabel>
                    <FormControl>
                      <Input 
                        id="city"
                        type="text"
                        placeholder="Enter city" 
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
                  <FormItem className="space-y-0 flex-1">
                    <FormLabel htmlFor="province" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      Province/State
                    </FormLabel>
                    <FormControl>
                      <Input 
                        id="province"
                        type="text"
                        placeholder="Enter province" 
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
              name="zipCode"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel htmlFor="zipCode" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    ZIP Code
                  </FormLabel>
                  <FormControl>
                    <Input 
                      id="zipCode"
                      type="text"
                      placeholder="Enter ZIP code" 
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
      </div>
    </div>
  );
}
