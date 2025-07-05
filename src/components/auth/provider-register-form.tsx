"use client";

import { useState, useTransition, useEffect, useActionState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

import {
  providerRegisterSchema,
  ProviderRegisterData,
} from "@/components/auth/schemas/provider-register-schema";
import {
  registerProviderAction,
  FormState,
} from "@/actions/register-provider.action";
import { getFieldsForStep } from "@/components/auth/hooks/form-step-config";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { StepIndicator } from "@/components/auth/ui/step-indicator";
import { Step1PersonalInfo } from "@/components/auth/form/step-1-personal-info";
import { Step2BusinessInfo } from "@/components/auth/form/step-2-business-info";
import { Step3ServicesSchedule } from "@/components/auth/form/step-3-services-schedule";
import { Step4BusinessDocuments } from "@/components/auth/form/step-4-business-documents";
import { Step5BusinessLocation } from "@/components/auth/form/step-5-business-location";
import { Step5BusinessCoverPhoto } from "@/components/auth/form/step-6-business-cover-photo";
import { Step6AccountSetup } from "@/components/auth/form/step-7-account-setup";

const TOTAL_STEPS = 7;
const initialFormState: FormState = { success: false, message: "" };

export function ProviderRegisterForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [formState, formAction] = useActionState(
    registerProviderAction,
    initialFormState
  );

  const form = useForm<ProviderRegisterData>({
    resolver: zodResolver(providerRegisterSchema) as any,
    mode: "onTouched",
    defaultValues: {
      // Step 1
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      // Step 2
      businessName: "",
      providerType: "HOSPITAL",
      businessPhone: "",
      businessEmail: "",
      address: "",
      city: "",
      province: "",
      zipCode: "",
      latitude: 6.74735,
      longitude: 125.355369,
      // Step 3
      services: [{ name: "", description: "", priceRange: "" }],
      operatingSchedule: Array.from({ length: 7 }, (_, i) => ({
        dayOfWeek: i,
        isOpen: true,
        openTime: "09:00",
        closeTime: "17:00",
      })).sort((a, b) =>
        a.dayOfWeek === 0
          ? 1
          : b.dayOfWeek === 0
          ? -1
          : a.dayOfWeek - b.dayOfWeek
      ),
      // Step 4
      permitNumber: "",
      licenseNumber: "",
      documentPhoto: undefined,
      // Step 5
      bannerPhoto: undefined,
      // Step 6
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, trigger } = form;

  useEffect(() => {
    if (formState.message) {
      if (formState.success) {
        toast.success(formState.message);
        router.push("/auth/login");
      } else {
        toast.error(formState.message);
      }
    }
  }, [formState, router]);

  const handleNextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => setCurrentStep((prev) => prev - 1);

  const processForm = async (data: ProviderRegisterData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "services" || key === "operatingSchedule") {
        formData.append(key, JSON.stringify(value));
      } else if (value) {
        formData.append(key, value as string | Blob);
      }
    });
    startTransition(() => formAction(formData));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar - Fixed on desktop */}
      <div className="lg:w-[320px] w-full">
        <div className="lg:fixed lg:top-0 lg:bottom-0 lg:left-0 lg:w-[320px] lg:h-screen">
          <StepIndicator currentStep={currentStep} />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 lg:pl-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-end mb-4 lg:mb-6">
            <Link 
              href="/auth/login" 
              className="text-sm text-violet-600 hover:text-violet-800 font-medium"
            >
              Already have an account? Login
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-5 sm:p-8">
            <Form {...form}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit((data: FieldValues) =>
                    processForm(data as ProviderRegisterData)
                  )(e);
                }}
                className="space-y-6 lg:space-y-8"
              >
                <div className="min-h-[350px]">
                  {currentStep === 1 && <Step1PersonalInfo form={form} />}
                  {currentStep === 2 && <Step2BusinessInfo form={form} />}
                  {currentStep === 3 && <Step3ServicesSchedule form={form} />}
                  {currentStep === 4 && <Step4BusinessDocuments form={form} />}
                  {currentStep === 5 && <Step5BusinessLocation form={form} />}
                  {currentStep === 6 && <Step5BusinessCoverPhoto form={form} />}
                  {currentStep === 7 && <Step6AccountSetup form={form} />}
                </div>

                <div className="flex items-center justify-between pt-4 border-t mt-4 lg:mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1 || isPending}
                    className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500/20"
                  >
                    Previous
                  </Button>
                  
                  <div className="text-xs sm:text-sm text-gray-500">
                    Step {currentStep} of {TOTAL_STEPS}
                  </div>
                  
                  {currentStep < TOTAL_STEPS ? (
                    <Button 
                      type="button" 
                      onClick={handleNextStep}
                      className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      disabled={isPending}
                      className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20"
                    >
                      {isPending ? "Submitting..." : "Create Account"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
