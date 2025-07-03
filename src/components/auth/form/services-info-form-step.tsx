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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  CalendarClock,
  X,
  Check,
  Edit
} from "lucide-react"

interface ServicesInfoStepProps {
  form: UseFormReturn<CompleteRegistrationFormData>;
  showValidationErrors?: boolean;
}

// Service form data interface
interface ServiceFormData {
  serviceName: string;
  description: string;
  priceRange: string;
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

// Time slots in 12-hour format with AM/PM
const timeSlots = [
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", 
  "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"
]

export function ServicesInfoStep({ form, showValidationErrors = false }: ServicesInfoStepProps) {
  const watchServices = form.watch("services") || []
  
  // State for service modal
  const [serviceModalOpen, setServiceModalOpen] = useState(false)
  const [currentService, setCurrentService] = useState<ServiceFormData>({
    serviceName: "",
    description: "",
    priceRange: ""
  })
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  
  // State for custom time inputs
  const [useCustomOpenTime, setUseCustomOpenTime] = useState(false)
  const [useCustomCloseTime, setUseCustomCloseTime] = useState(false)
  
  // Handle adding or updating a service
  const handleSaveService = () => {
    const currentServices = form.getValues("services") || []
    
    if (editingIndex !== null) {
      // Update existing service
      const updatedServices = [...currentServices]
      updatedServices[editingIndex] = currentService
      form.setValue("services", updatedServices)
    } else {
      // Add new service
      form.setValue("services", [...currentServices, currentService])
    }
    
    // Reset and close modal
    resetServiceForm()
  }
  
  // Open modal to edit a service
  const handleEditService = (index: number) => {
    const service = form.getValues("services")[index]
    setCurrentService({
      serviceName: service.serviceName || "",
      description: service.description || "",
      priceRange: service.priceRange || ""
    })
    setEditingIndex(index)
    setServiceModalOpen(true)
  }
  
  // Open modal to add a new service
  const handleAddService = () => {
    resetServiceForm()
    setServiceModalOpen(true)
  }
  
  // Remove a service
  const removeService = (index: number) => {
    const currentServices = form.getValues("services") || []
    form.setValue(
      "services",
      currentServices.filter((_, i) => i !== index)
    )
  }
  
  // Reset service form
  const resetServiceForm = () => {
    setCurrentService({
      serviceName: "",
      description: "",
      priceRange: ""
    })
    setEditingIndex(null)
    setServiceModalOpen(false)
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
        {/* Services Section */}
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

          {/* Services List */}
          <div className="space-y-4">
            {watchServices.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {watchServices.map((service, index) => (
                  <Card key={index} className="p-4 border border-gray-200 hover:border-blue-200 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">{service.serviceName}</h4>
                        {service.priceRange && (
                          <p className="text-sm text-blue-600 mt-1">{service.priceRange}</p>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditService(index)}
                          className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeService(index)}
                          className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-500 mb-3">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <p className="text-gray-600 font-medium">No services added yet</p>
                <p className="text-sm text-gray-500 mt-1">Click the button below to add your first service</p>
              </div>
            )}
            
            {/* Add Service Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddService}
              className="w-full py-4 border-dashed border-gray-300 text-blue-600 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50 transition-colors rounded-lg shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" /> 
              Add Service
            </Button>
          </div>
        </div>

        {/* Operating Hours Section */}
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

          {/* Operating Days */}
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

          {/* Operating Hours */}
          <div className="grid grid-cols-2 gap-4">
            {/* Opening Time */}
            <FormField
              control={form.control}
              name="openTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Opening Time</span>
                  </FormLabel>
                  <div className="space-y-2">
                    <FormControl>
                      <select
                        {...field}
                        className="w-full h-11 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "custom") {
                            setUseCustomOpenTime(true);
                            field.onChange("");
                          } else {
                            setUseCustomOpenTime(false);
                            field.onChange(value);
                          }
                        }}
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                        <option value="custom">Custom time</option>
                      </select>
                    </FormControl>
                    
                    {useCustomOpenTime && (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="time"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>
                    )}
                  </div>
                  {showValidationErrors && <FormMessage />}
                </FormItem>
              )}
            />
            
            {/* Closing Time */}
            <FormField
              control={form.control}
              name="closeTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Closing Time</span>
                  </FormLabel>
                  <div className="space-y-2">
                    <FormControl>
                      <select
                        {...field}
                        className="w-full h-11 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "custom") {
                            setUseCustomCloseTime(true);
                            field.onChange("");
                          } else {
                            setUseCustomCloseTime(false);
                            field.onChange(value);
                          }
                        }}
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                        <option value="custom">Custom time</option>
                      </select>
                    </FormControl>
                    
                    {useCustomCloseTime && (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="time"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>
                    )}
                  </div>
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
              <p>• For split shifts or special schedules, choose your primary hours here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Modal */}
      <Dialog open={serviceModalOpen} onOpenChange={setServiceModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              {editingIndex !== null ? "Edit Service" : "Add New Service"}
            </DialogTitle>
            <DialogDescription className="text-center">
              {editingIndex !== null 
                ? "Update the details of your healthcare service" 
                : "Enter the details of the healthcare service you provide"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Service Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Clipboard className="h-4 w-4 text-gray-500" />
                <span>Service Name</span>
                <span className="text-red-500">*</span>
              </label>
              <Input 
                placeholder="e.g. General Checkup, Dental Cleaning" 
                value={currentService.serviceName}
                onChange={(e) => setCurrentService({...currentService, serviceName: e.target.value})}
                className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            
            {/* Service Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Info className="h-4 w-4 text-gray-500" />
                <span>Description</span>
              </label>
              <Textarea 
                placeholder="Brief description of the service" 
                value={currentService.description}
                onChange={(e) => setCurrentService({...currentService, description: e.target.value})}
                className="min-h-24 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <p className="text-xs text-gray-500">
                Provide a short description of what this service includes
              </p>
            </div>
            
            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span>Price Range</span>
              </label>
              <Input 
                placeholder="e.g. $50-100, $75 per hour" 
                value={currentService.priceRange}
                onChange={(e) => setCurrentService({...currentService, priceRange: e.target.value})}
                className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <p className="text-xs text-gray-500">
                Optional - Provide an estimate or range of prices
              </p>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={resetServiceForm}
              className="border-gray-300"
            >
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleSaveService}
              disabled={!currentService.serviceName.trim()}
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
            >
              <Check className="h-4 w-4 mr-2" />
              {editingIndex !== null ? "Update Service" : "Add Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
