"use client";

import { useState, useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { CompleteRegistrationFormData } from "@/components/auth/schemas/registration-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  Check, 
  BadgeCheck, 
  FileImage, 

  ShieldCheck
} from "lucide-react";

interface PersonalInfoStepProps {
  form: UseFormReturn<CompleteRegistrationFormData>;
  showValidationErrors?: boolean;
}

const validIdTypes = [
  "Driver's License",
  "Passport",
  "National ID",
  "Social Security ID",
  "Voter's ID",
  "Professional License",
];

export function PersonalInfoStep({ form, showValidationErrors = false }: PersonalInfoStepProps) {
  const [fileSelected, setFileSelected] = useState(false);
  
  // Check if a file is already selected when component mounts or when navigating back
  useEffect(() => {
    const idImage = form.getValues("idImage");
    setFileSelected(!!idImage);
  }, [form]);
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <User className="h-5 w-5 text-blue-500" />
          <span>Personal Information</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Provide your personal details for account verification and communication
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              <span>Contact Information</span>
            </h3>
            <p className="text-sm text-blue-700 mb-2">
              Your contact details will be used for account verification and important communications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>First Name</span>
                  </FormLabel>
                <FormControl>
                    <Input 
                      placeholder="Enter your first name" 
                      {...field} 
                      className="h-11 rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </FormControl>
                  {showValidationErrors && <FormMessage className="text-red-500" />}
              </FormItem>
            )}
          />
            
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>Last Name</span>
                  </FormLabel>
                <FormControl>
                    <Input 
                      placeholder="Enter your last name" 
                      {...field} 
                      className="h-11 rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </FormControl>
                  {showValidationErrors && <FormMessage className="text-red-500" />}
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
            name="email"
          render={({ field }) => (
            <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>Email Address</span>
                </FormLabel>
              <FormControl>
                  <Input 
                    placeholder="Enter your email address" 
                    {...field}
                    type="email"
                    className="h-11 rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
              </FormControl>
                <FormDescription className="text-xs text-gray-500 mt-1">
                  This email will be used for login and account verification
                </FormDescription>
                {showValidationErrors && <FormMessage className="text-red-500" />}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
            name="phone"
          render={({ field }) => (
            <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>Phone Number</span>
                </FormLabel>
              <FormControl>
                  <Input 
                    placeholder="Enter your phone number" 
                    {...field} 
                    type="tel"
                    className="h-11 rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
              </FormControl>
                {showValidationErrors && <FormMessage className="text-red-500" />}
            </FormItem>
          )}
        />
        </div>
        
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Identity Verification</span>
            </h3>
            <p className="text-sm text-blue-700 mb-2">
              We require ID verification to ensure the security of our healthcare platform.
            </p>
          </div>
          
          <div className="space-y-6">
          <FormField
            control={form.control}
            name="validIdType"
            render={({ field }) => (
              <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span>Valid ID Type</span>
                  </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                      <SelectTrigger className="h-11 rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all">
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                  </FormControl>
                    <SelectContent className="rounded-md shadow-md">
                    {validIdTypes.map((idType) => (
                      <SelectItem key={idType} value={idType}>
                        {idType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                  <FormDescription className="text-xs text-gray-500 mt-1">
                    Choose the type of government ID you will provide
                  </FormDescription>
                  {showValidationErrors && <FormMessage className="text-red-500" />}
              </FormItem>
            )}
          />
            
          <FormField
            control={form.control}
            name="idImage"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileImage className="h-4 w-4 text-gray-500" />
                    <span>Upload ID Image</span>
                  </FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      accept="image/jpeg, image/png, image/jpg, image/webp"
                      name={name}
                      ref={ref}
                      onBlur={onBlur}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        onChange(file);
                        setFileSelected(!!file);
                      }}
                      
                        className="h-11 rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {fileSelected && (
                        <div className="flex items-center text-xs text-green-600 font-medium mt-1">
                          <Check className="h-4 w-4 mr-1" />
                          <span>File selected{form.getValues("idImage") instanceof File ? `: ${(form.getValues("idImage") as File).name}` : ''}</span>
                        </div>
                    )}
                  </div>
                </FormControl>
                  <FormDescription className="text-xs text-gray-500 mt-1">
                    Upload a clear image of your government-issued ID
                </FormDescription>
                  {showValidationErrors && <FormMessage className="text-red-500" />}
              </FormItem>
            )}
          />
            
            <div className="pt-4">
              <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 space-y-2 shadow-sm">
                <p className="font-medium text-gray-700 mb-1">ID Image Requirements:</p>
                <p>• Must be a valid government-issued ID</p>
                <p>• All information should be clearly visible</p>
                <p>• Acceptable formats: JPG, PNG (max 5MB)</p>
                <p>• Your ID will be securely stored and verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
