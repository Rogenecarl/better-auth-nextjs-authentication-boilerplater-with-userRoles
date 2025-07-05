"use client";

import { useState, useEffect } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import {
  ProviderRegisterData,
  serviceFormSchema,
  ServiceFormValues,
} from "@/components/auth/schemas/provider-register-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Stethoscope,
  Clock,
  Plus,
  Edit,
  X,
  DollarSign,
  FileText,
  Calendar,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

interface Props {
  form: UseFormReturn<ProviderRegisterData>;
}

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function Step3ServicesSchedule({ form }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Service form
  const serviceForm = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: "",
      description: "",
      priceRange: "",
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "services",
  });

  const { fields: scheduleFields } = useFieldArray({
    control: form.control,
    name: "operatingSchedule",
  });

  // Filter out empty services (services without a name)
  const validServices = fields.filter(field => field.name && field.name.trim() !== "");

  // Ensure we have at least one valid service in the form data
  useEffect(() => {
    // If there are no valid services but there are empty placeholders, remove them
    if (validServices.length === 0 && fields.length > 0) {
      // This will ensure the form validation works correctly
      form.setValue("services", [], { shouldValidate: true });
    }
  }, [validServices.length, fields.length, form]);

  const handleOpenDialog = (index?: number) => {
    if (index !== undefined) {
      // Edit existing service
      setEditingIndex(index);
      const service = fields[index];
      serviceForm.reset({
        name: service.name,
        description: service.description,
        priceRange: service.priceRange,
      });
    } else {
      // Add new service
      setEditingIndex(null);
      serviceForm.reset({
        name: "",
        description: "",
        priceRange: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    serviceForm.reset();
  };

  const onSubmitService = (values: ServiceFormValues) => {
    if (editingIndex !== null) {
      // Update existing service
      update(editingIndex, values);
    } else {
      // Add new service
      append(values);
    }
    handleCloseDialog();
  };

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="flex items-center gap-2 mb-6">
        <Stethoscope className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800">
          Services & Schedule
        </h2>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        List your healthcare services and set your business operating hours
      </p>

      <div className="flex flex-col lg:flex-row gap-6 mt-5">
        {/* Services Card */}
        <div className="flex-1">
          <div className="flex gap-3 mb-5 bg-blue-50 border border-blue-100 rounded-lg p-3">
            <Stethoscope className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800 text-sm">
                Healthcare Services
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Add all healthcare services you offer with descriptions and
                pricing
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {validServices.length === 0 ? (
              <div className="text-center p-6 border border-dashed border-blue-200 rounded-lg bg-blue-50/30">
                <Stethoscope className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <p className="text-blue-700 font-medium">
                  No services added yet
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  Click the button below to add your first service
                </p>
                <p className="text-xs text-red-500 mt-3 font-medium">
                  You must add at least one service to continue
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {validServices.map((field, index) => {
                  const originalIndex = fields.findIndex(f => f.id === field.id);
                  return (
                    <div
                      key={field.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm hover:shadow transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Stethoscope className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {field.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                            >
                              <DollarSign className="w-3 h-3 mr-1" />
                              {field.priceRange || "No price set"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                          onClick={() => handleOpenDialog(originalIndex)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => remove(originalIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <Button
            type="button"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => handleOpenDialog()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>

        {/* Schedule Card */}
        <div className="flex-1">
          <div className="flex gap-3 mb-5 bg-blue-50 border border-blue-100 rounded-lg p-3">
            <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800 text-sm">
                Operating Hours
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Set your business hours for each day of the week
              </p>
              <p className="text-sm text-red-600 mt-1 font-medium">
                * At least one day must be open with operating hours
              </p>
            </div>
          </div>
          
          {/* Show validation error if all days are closed */}
          {form.formState.errors.operatingSchedule?.message && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-sm text-red-600">
                {form.formState.errors.operatingSchedule.message}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {scheduleFields.map((field, index) => {
              const dayName =
                weekDays[form.watch(`operatingSchedule.${index}.dayOfWeek`)];
              return (
                <div
                  key={field.id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm"
                >
                  <FormField
                    control={form.control}
                    name={`operatingSchedule.${index}.isOpen`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              if (!checked) {
                                // Clear times when closed
                                form.setValue(`operatingSchedule.${index}.openTime`, "", { shouldValidate: true });
                                form.setValue(`operatingSchedule.${index}.closeTime`, "", { shouldValidate: true });
                                // Clear any errors
                                form.clearErrors([
                                  `operatingSchedule.${index}.openTime`,
                                  `operatingSchedule.${index}.closeTime`
                                ]);
                              }
                            }}
                            id={`isOpen-${index}`}
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor={`isOpen-${index}`}
                          className="w-24 font-medium text-gray-700"
                        >
                          {dayName}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  {form.watch(`operatingSchedule.${index}.isOpen`) ? (
                    <div className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`operatingSchedule.${index}.openTime`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id={`openTime-${index}`}
                                type="time"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  // Clear any errors when time is set
                                  form.clearErrors(`operatingSchedule.${index}.openTime`);
                                }}
                                className="rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-32 h-10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <span className="text-gray-500">to</span>
                      <FormField
                        control={form.control}
                        name={`operatingSchedule.${index}.closeTime`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id={`closeTime-${index}`}
                                type="time"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  // Clear any errors when time is set
                                  form.clearErrors(`operatingSchedule.${index}.closeTime`);
                                }}
                                className="rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-32 h-10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">Closed</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Service Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingIndex !== null ? "Edit Service" : "Add New Service"}
            </DialogTitle>
            <DialogDescription>
              {editingIndex !== null
                ? "Update the details of your healthcare service"
                : "Enter the details of your healthcare service"}
            </DialogDescription>
          </DialogHeader>

          <Form {...serviceForm}>
            <form
              onSubmit={serviceForm.handleSubmit(onSubmitService)}
              className="space-y-4"
            >
              <FormField
                control={serviceForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel
                      htmlFor="service-name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Service Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="service-name"
                        type="text"
                        placeholder="e.g., General Checkup"
                        {...field}
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={serviceForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel
                      htmlFor="service-description"
                      className="text-sm font-medium text-gray-700"
                    >
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="service-description"
                        placeholder="Describe what this service includes..."
                        {...field}
                        className="min-h-[100px] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={serviceForm.control}
                name="priceRange"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel
                      htmlFor="service-price"
                      className="text-sm font-medium text-gray-700"
                    >
                      Price Range
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="service-price"
                        type="text"
                        placeholder="e.g., $50 - $150"
                        {...field}
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingIndex !== null ? "Update Service" : "Add Service"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
