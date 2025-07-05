"use client";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ProviderRegisterData } from "@/components/auth/schemas/provider-register-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Stethoscope, Clock } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

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
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "services",
  });
  const { fields: scheduleFields } = useFieldArray({
    control: form.control,
    name: "operatingSchedule",
  });

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Stethoscope className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800">Your Services</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            List the healthcare services you provide and their price ranges
          </p>

          <div className="space-y-4 mt-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-6 border rounded-lg bg-gray-50/50 relative space-y-4"
              >
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 hover:bg-gray-200/50"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                )}
                <FormField
                  control={form.control}
                  name={`services.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor={`serviceName-${index}`} className="text-sm font-medium text-gray-700">
                        Service Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id={`serviceName-${index}`}
                          type="text"
                          placeholder="General Check-up"
                          {...field}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`services.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor={`description-${index}`} className="text-sm font-medium text-gray-700">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id={`description-${index}`}
                          placeholder="Describe the service..."
                          {...field}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 min-h-[100px] resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`services.${index}.priceRange`}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor={`priceRange-${index}`} className="text-sm font-medium text-gray-700">
                        Price Range
                      </FormLabel>
                      <FormControl>
                        <Input
                          id={`priceRange-${index}`}
                          type="text"
                          placeholder="$50 - $150"
                          {...field}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4 text-blue-600 border-blue-200 hover:bg-blue-50"
            onClick={() =>
              append({ name: "", description: "", priceRange: "" })
            }
          >
            Add Another Service
          </Button>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800">Operating Hours</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Set your business hours for each day of the week
          </p>

          <div className="space-y-3 mt-6">
            {scheduleFields.map((field, index) => {
              const dayName =
                weekDays[form.watch(`operatingSchedule.${index}.dayOfWeek`)];
              return (
                <div
                  key={field.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-gray-50/50"
                >
                  <FormField
                    control={form.control}
                    name={`operatingSchedule.${index}.isOpen`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
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
                                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-32"
                              />
                            </FormControl>
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
                                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-32"
                              />
                            </FormControl>
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
    </div>
  );
}
