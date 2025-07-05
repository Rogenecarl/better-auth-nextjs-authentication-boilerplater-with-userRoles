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
import { Trash2 } from "lucide-react";
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
    <div className="space-y-8 animate-in fade-in-50">
      <div>
        <h2 className="text-xl font-semibold">Your Services</h2>
        <div className="space-y-4 mt-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 border rounded-md relative space-y-2"
            >
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <FormField
                control={form.control}
                name={`services.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input placeholder="General Check-up" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`services.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the service..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`services.${index}.priceRange`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Range</FormLabel>
                    <FormControl>
                      <Input placeholder="$50 - $150" {...field} />
                    </FormControl>
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
          className="mt-4"
          onClick={() => append({ name: "", description: "", priceRange: "" })}
        >
          Add Another Service
        </Button>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Operating Hours</h2>
        <div className="space-y-3 mt-4">
          {scheduleFields.map((field, index) => {
            const dayName =
              weekDays[form.watch(`operatingSchedule.${index}.dayOfWeek`)];
            return (
              <div
                key={field.id}
                className="flex items-center justify-between p-3 border rounded-md"
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
                        />
                      </FormControl>
                      <FormLabel className="w-24 font-normal">
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
                            <Input type="time" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <span>to</span>
                    <FormField
                      control={form.control}
                      name={`operatingSchedule.${index}.closeTime`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Closed</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
