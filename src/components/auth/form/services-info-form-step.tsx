"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { CompleteRegistrationFormData } from "@/components/auth/schemas/registration-schema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Clock, 
  DollarSign, 
  Calendar, 
  Plus, 
  Trash2, 
  Clipboard, 
  Info,
  ClipboardList,
  BadgeCheck,
  CalendarClock
} from "lucide-react"

interface ServicesInfoStepProps {
  form: UseFormReturn<CompleteRegistrationFormData>;
  showValidationErrors?: boolean;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

const timeSlots = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
]

export function ServicesInfoStep({ form, showValidationErrors = false }: ServicesInfoStepProps) {
  const watchServices = form.watch("services") || []

  const addService = () => {
    const currentServices = form.getValues("services") || []
    form.setValue("services", [
      ...currentServices,
      { serviceName: "", description: "", priceRange: "" },
    ])
  }
  
  const removeService = (index: number) => {
    const currentServices = form.getValues("services") || []
    form.setValue(
      "services",
      currentServices.filter((_, i) => i !== index)
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-blue-500" />
          <span>Services Information</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Provide details about the healthcare services you offer and your operating schedule
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              <span>Services You Provide</span>
            </h3>
            <p className="text-sm text-blue-700 mb-2">
              List all medical services that you offer to patients. Be specific about what you provide.
            </p>
          </div>

              <div className="space-y-4">
            {watchServices.map((_, index) => (
              <Card key={index} className="relative p-5 border border-gray-200 rounded-lg shadow-sm">
                {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeService(index)}
                    className="absolute top-2 right-2 h-8 w-8 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                    </Button>
                  )}

                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name={`services.${index}.serviceName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clipboard className="h-4 w-4 text-gray-500" />
                          <span>Service Name</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. General Checkup, Dental Cleaning" 
                            {...field} 
                            className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </FormControl>
                        {showValidationErrors && <FormMessage />}
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`services.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-gray-500" />
                          <span>Description</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief description of the service" 
                            {...field} 
                            className="min-h-24 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </FormControl>
                        {showValidationErrors && <FormMessage />}
                      </FormItem>
                    )}
                  />

                <FormField
                  control={form.control}
                    name={`services.${index}.priceRange`}
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          <span>Price Range</span>
                        </FormLabel>
                      <FormControl>
                          <Input 
                            placeholder="e.g. $50-100, $75 per hour" 
                            {...field} 
                            className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                      </FormControl>
                        <FormDescription className="text-xs text-gray-500">
                          Optional - Provide an estimate or range of prices
                        </FormDescription>
                        {showValidationErrors && <FormMessage />}
                    </FormItem>
                  )}
                />
              </div>
            </Card>
          ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={addService}
              className="w-full py-6 border-dashed border-gray-300 text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50 transition-colors rounded-lg shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" /> 
              Add Another Service
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              <span>Operating Hours</span>
            </h3>
            <p className="text-sm text-blue-700 mb-2">
              Set your regular business hours. This helps patients know when they can visit your facility.
            </p>
          </div>

          <FormField
            control={form.control}
            name="operatingDays"
            render={({ field }) => (
              <FormItem className="p-5 border border-gray-200 rounded-lg shadow-sm">
                <FormLabel className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Operating Days</span>
                </FormLabel>
                <div className="grid grid-cols-2 gap-3">
                  {daysOfWeek.map((day) => (
                    <FormItem
                      key={day}
                      className="flex items-center space-x-3 space-y-0"
                    >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(day)}
                                onCheckedChange={(checked) => {
                            const currentValue = field.value || []
                            if (checked) {
                              field.onChange([...currentValue, day])
                            } else {
                              field.onChange(
                                currentValue.filter((value) => value !== day)
                              )
                            }
                                }}
                              />
                            </FormControl>
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        {day}
                      </FormLabel>
                          </FormItem>
                  ))}
                </div>
                {showValidationErrors && <FormMessage />}
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="openTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Opening Time</span>
                  </FormLabel>
                    <FormControl>
                    <select
                      {...field}
                      className="w-full h-11 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  {showValidationErrors && <FormMessage />}
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="closeTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Closing Time</span>
                  </FormLabel>
                    <FormControl>
                    <select
                      {...field}
                      className="w-full h-11 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  {showValidationErrors && <FormMessage />}
                </FormItem>
              )}
            />
          </div>
          
          <div className="pt-4">
            <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 space-y-2 shadow-sm">
              <p className="font-medium text-gray-700 mb-1">Notes about Operating Hours:</p>
              <p>• Your operating hours will be displayed to potential patients</p>
              <p>• You can update these hours later through your provider dashboard</p>
              <p>• For split shifts or special schedules, choose your primary hours here and you can add details later</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
