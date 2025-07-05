"use client";

import { useState, useTransition, useEffect, useActionState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  providerRegisterSchema,
  ProviderRegisterData,
} from "@/components/auth/schemas/provider-register-schema";
import {
  registerProviderAction,
  FormState,
} from "@/actions/register-provider.action";
import { getFieldsForStep } from "@/components/auth/hooks/form-step-config";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

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
    <div className="w-full max-w-3xl mx-auto p-6 sm:p-8 border rounded-lg shadow-sm bg-card">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center">
          Health Provider Registration
        </h1>
        <p className="text-muted-foreground text-sm text-center">
          Step {currentStep} of {TOTAL_STEPS}
        </p>
        <Progress value={(currentStep / TOTAL_STEPS) * 100} className="mt-4" />
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit((data: FieldValues) =>
              processForm(data as ProviderRegisterData)
            )(e);
          }}
          className="space-y-8"
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

          <div className="flex justify-between items-center pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 1 || isPending}
            >
              Previous
            </Button>
            {currentStep < TOTAL_STEPS ? (
              <Button type="button" onClick={handleNextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Create Account"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
