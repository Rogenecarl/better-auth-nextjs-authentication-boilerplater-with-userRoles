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
import { User, Mail, Phone, CircleAlert } from "lucide-react";

interface Props {
  form: UseFormReturn<ProviderRegisterData>;
}

export function Step1PersonalInfo({ form }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800">
          Personal Information
        </h2>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Provide your personal details for account verification and communication
      </p>

      <div className="mt-5 bg-blue-50 border border-blue-100 rounded-lg p-4 mb-5">
        <div className="flex gap-3">
          <CircleAlert className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 text-sm">
              Contact Information
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              Your contact details will be used for account verification and
              important communications.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="firstName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                First Name
              </FormLabel>
              <FormControl>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
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
          name="lastName"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="lastName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                Last Name
              </FormLabel>
              <FormControl>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
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
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...field}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </FormControl>
              <p className="text-xs text-gray-500">
                This email will be used for login and account verification
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                Phone Number
              </FormLabel>
              <FormControl>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
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
