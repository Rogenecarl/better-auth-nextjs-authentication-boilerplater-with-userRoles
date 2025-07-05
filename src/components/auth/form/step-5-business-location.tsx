"use client";

import { useMemo } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPin } from "lucide-react";
import LocationPicker, { LocationValue } from "@/components/LocationPicker";

interface Props {
  form: UseFormReturn<ProviderRegisterData>;
}

/**
 * A form step for selecting the business's geographical location using a map and manual input.
 */
export function Step5BusinessLocation({ form }: Props) {
  // Watch the form fields for real-time updates to sync the map.
  const latitude = form.watch("latitude");
  const longitude = form.watch("longitude");

  // Memoize the location object for the map's `value` prop.
  // This is a key performance optimization that prevents the map from re-rendering
  // on every parent component render, only when lat/lng values actually change.
  const currentLocation = useMemo<LocationValue | null>(() => {
    // Only create a location object if both coordinates are valid numbers.
    if (typeof latitude === "number" && typeof longitude === "number") {
      return { lat: latitude, lng: longitude };
    }
    return null; // Otherwise, the map will have no marker.
  }, [latitude, longitude]);

  /**
   * Updates the form state when a new location is selected on the map.
   * @param location The new location object from the LocationPicker.
   */
  const handleLocationChange = (location: LocationValue) => {
    // Use toFixed to avoid excessively long decimal strings.
    // The schema's `z.coerce.number` will handle the final conversion.
    form.setValue("latitude", parseFloat(location.lat.toFixed(6)), {
      shouldValidate: true,
    });
    form.setValue("longitude", parseFloat(location.lng.toFixed(6)), {
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <h2 className="text-xl font-semibold">Business Location</h2>

      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertTitle>Set Your Location</AlertTitle>
        <AlertDescription>
          Click a precise point on the map to set your coordinates, or enter
          them manually.
        </AlertDescription>
      </Alert>

      <div className="h-[400px] w-full">
        <LocationPicker
          value={currentLocation}
          onChange={handleLocationChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  // `step="any"` is the standard way to allow floating-point numbers.
                  step="any"
                  placeholder="e.g., 6.74468"
                  {...field}
                  // This ensures the input value is always a string to prevent React warnings.
                  value={field.value ?? ""}
                  // Let the zodResolver handle coercion from string to number.
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  placeholder="e.g., 125.365847"
                  {...field}
                  value={field.value ?? ""}
                  onChange={field.onChange}
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
