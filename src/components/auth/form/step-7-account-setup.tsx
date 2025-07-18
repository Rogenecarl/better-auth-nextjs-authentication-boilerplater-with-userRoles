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
import { KeyRound, Lock, Shield } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
  form: UseFormReturn<ProviderRegisterData>;
  onSubmit: () => void;
}

export function Step6AccountSetup({ form, onSubmit }: Props) {

  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    const subscription = form.watch(() => {
      const currentErrors = form.formState.errors;
      const hasErrors = Object.keys(currentErrors).length > 0;
      setShowValidation(hasErrors && form.formState.isDirty);
    });
    return () => subscription.unsubscribe();
  }, [form]);
  // Watch password field to validate confirm password in real-time
  const password = form.watch("password");
  
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="flex items-center gap-2 mb-6">
        <KeyRound className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800">
          Set Your Password
        </h2>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Create a secure password for your account. You'll use this to log in
        with the email you provided in Step 1.
      </p>

      <div className="border-blue-100 rounded-lg">
        <div className="flex gap-3 mb-5 bg-blue-50 border border-blue-100 rounded-lg p-3">
          <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 text-sm">
              Account Security
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              Create a strong password to protect your account
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-gray-500" />
                  Password
                </FormLabel>
                <FormControl>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    {...field} 
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  
                </FormControl>
                {showValidation && <FormMessage />}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-gray-500" />
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input 
                    id="confirmPassword"
                    type="password" 
                    placeholder="••••••••" 
                    {...field}
                    onBlur={() => {
                      if (field.value && field.value !== password) {
                        form.setError("confirmPassword", {
                          type: "manual",
                          message: "Passwords do not match"
                        });
                      }
                    }}
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </FormControl>
                {showValidation && <FormMessage />}
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border border-blue-100 rounded-lg p-3 mt-5">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-800 text-sm">
                Password Requirements
              </h3>
              <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
                <li>At least 8 characters long</li>
                <li>Include at least one uppercase letter</li>
                <li>Include at least one number</li>
                <li>Include at least one special character</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
