"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { CompleteRegistrationFormData } from "@/components/auth/schemas/registration-schema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { FileCheck, FileImage, FileText, Info, BadgeCheck, Shield, Building, Image } from "lucide-react"

interface BusinessDocumentsStepProps {
  form: UseFormReturn<CompleteRegistrationFormData>
}

export function BusinessDocumentsStep({ form }: BusinessDocumentsStepProps) {
  const [businessImageSelected, setBusinessImageSelected] = useState(false)
  const [permitImageSelected, setPermitImageSelected] = useState(false)
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          <span>Business Documents</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Upload required business documents and permits for verification
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Verification Documents</span>
            </h3>
            <p className="text-sm text-blue-700 mb-2">
              These documents are required to verify your business is legitimate and legally authorized
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="permitNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span>Permit Number</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter permit number" 
                        {...field} 
                        className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span>License Number</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter license number" 
                        {...field} 
                        className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500">Optional if not applicable</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="permitImageUrl"
              render={({ field: { onChange, onBlur, name, ref } }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-gray-500" />
                    <span>Permit/License Document</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Input 
                        type="file" 
                        accept="image/*,application/pdf" 
                        name={name}
                        ref={ref}
                        onBlur={onBlur}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          onChange(file);
                          setPermitImageSelected(!!file);
                        }}
                        className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {permitImageSelected && (
                        <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          File selected successfully
                        </p>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">Upload a scan of your business permit or license</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-4">
              <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 space-y-2 shadow-sm">
                <p className="font-medium text-gray-700 mb-1">Document Requirements:</p>
                <p>• Business permit must be valid and current</p>
                <p>• All document information must be clearly visible</p>
                <p>• Acceptable formats: JPG, PNG, PDF (max 5MB)</p>
                <p>• Files must be high quality and legible</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span>Business Profile</span>
            </h3>
            <p className="text-sm text-blue-700 mb-2">
              Add a professional photo of your business to help patients recognize your facility
            </p>
          </div>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="businessImage"
              render={({ field: { onChange, onBlur, name, ref } }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileImage className="h-4 w-4 text-gray-500" />
                    <span>Business Profile Image</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Input 
                        type="file" 
                        accept="image/*" 
                        name={name}
                        ref={ref}
                        onBlur={onBlur}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          onChange(file);
                          setBusinessImageSelected(!!file);
                        }}
                        className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {businessImageSelected && (
                        <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          File selected successfully
                        </p>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">Optional: A photo of your business premise</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Image Best Practices</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                  <p className="text-xs font-medium text-green-600 mb-1">Recommended</p>
                  <p className="text-xs text-gray-600">Front of building, reception area, or professional staff photo</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                  <p className="text-xs font-medium text-red-600 mb-1">Not recommended</p>
                  <p className="text-xs text-gray-600">Personal photos, low quality images, or stock photos</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 space-y-2 shadow-sm">
                <p className="font-medium text-gray-700 mb-1">Why provide a business image?</p>
                <p>• Helps patients recognize your facility</p>
                <p>• Creates trust and improves patient confidence</p>
                <p>• Displayed on your profile and in search results</p>
                <p>• Makes your listing stand out from others</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
