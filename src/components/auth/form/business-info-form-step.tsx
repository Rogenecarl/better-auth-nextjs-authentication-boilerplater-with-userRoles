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
import { ProviderType } from "@/generated/prisma";
import {
  Building,
  Phone,
  Mail,
  MapPin,
  Map,

  Store,
  LocateFixed,
} from "lucide-react";

interface BusinessInfoStepProps {
  form: UseFormReturn<CompleteRegistrationFormData>;
  showValidationErrors?: boolean;
}

const providerTypes = Object.values(ProviderType);

export function BusinessInfoStep({ form, showValidationErrors = false }: BusinessInfoStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Building className="h-5 w-5 text-blue-500" />
          <span>Business Information</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Provide details about your healthcare business for registration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <Store className="h-4 w-4" />
              <span>Business Details</span>
            </h3>
            <p className="text-sm text-blue-700 mb-2">
              Provide information about your healthcare business for your
              profile
            </p>
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-gray-500" />
                    <span>Business Name</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your business name"
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
              name="providerType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span>Business Type</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-md shadow-md max-h-56">
                      {providerTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs text-gray-500 mt-1">
                    Choose the category that best describes your healthcare
                    business
                  </FormDescription>
                  {showValidationErrors && <FormMessage />}
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="businessPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>Business Phone</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter business phone"
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
                name="businessEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>Business Email</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter business email"
                        {...field}
                        className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </FormControl>
                    {showValidationErrors && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <LocateFixed className="h-4 w-4" />
              <span>Location Information</span>
            </h3>
            <p className="text-sm text-blue-700 mb-2">
              Your business location will be displayed to patients searching for
              healthcare services
            </p>
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="businessAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>Business Address</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter business address"
                      {...field}
                      className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </FormControl>
                  {showValidationErrors && <FormMessage />}
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="businessCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>City</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter city"
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
                name="businessProvince"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>Province/State</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter province"
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
                name="businessZipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>ZIP Code</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter ZIP code"
                        {...field}
                        className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </FormControl>
                    {showValidationErrors && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Map className="h-4 w-4 text-gray-500" />
                      <span>Latitude</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter latitude"
                        {...field}
                        className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Optional coordinates for map location
                    </FormDescription>
                    {showValidationErrors && <FormMessage />}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Map className="h-4 w-4 text-gray-500" />
                      <span>Longitude</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter longitude"
                        {...field}
                        className="h-11 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Optional coordinates for map location
                    </FormDescription>
                    {showValidationErrors && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4">
              <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 space-y-2 shadow-sm">
                <p className="font-medium text-gray-700 mb-1">
                  Location Benefits:
                </p>
                <p>
                  • Accurate location helps patients find your services easily
                </p>
                <p>• Appears on maps and in location-based searches</p>
                <p>• Optional GPS coordinates improve map precision</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
