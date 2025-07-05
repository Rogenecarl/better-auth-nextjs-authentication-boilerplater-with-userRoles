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
import { MapPin, FileText, Navigation } from "lucide-react";
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
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800">Business Location</h2>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Set your business location on the map for customers to find you
      </p>

      <div className="mt-5 bg-blue-50 border border-blue-100 rounded-lg p-4 mb-5">
        <div className="flex gap-3">
          <Navigation className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 text-sm">Map Location</h3>
            <p className="text-sm text-blue-700 mt-1">
              Click a precise point on the map to set your coordinates, or enter them manually
            </p>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-sm border border-gray-200">
          <LocationPicker
            value={currentLocation}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem className="space-y-0 flex-1">
              <FormLabel htmlFor="latitude" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                Latitude
              </FormLabel>
              <FormControl>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  placeholder="e.g., 6.74468"
                  {...field}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
            <FormItem className="space-y-0 flex-1">
              <FormLabel htmlFor="longitude" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                Longitude
              </FormLabel>
              <FormControl>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  placeholder="e.g., 125.365847"
                  {...field}
                  value={field.value ?? ""}
                  onChange={field.onChange}
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
