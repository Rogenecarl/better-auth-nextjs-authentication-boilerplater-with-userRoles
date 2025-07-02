"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { StepIndicator } from "@/components/auth/ui/step-indicator";
import { useMultiStepForm } from "@/components/auth/hooks/use-multi-step-form";
import {
  completeRegistrationSchema,
  type CompleteRegistrationFormData,
} from "@/components/auth/schemas/registration-schema";
import { PersonalInfoStep } from "@/components/auth/form/personal-info-form-step";
import { BusinessInfoStep } from "@/components/auth/form/business-info-form-step";
import { ServicesInfoStep } from "@/components/auth/form/services-info-form-step";
import { BusinessDocumentsStep } from "@/components/auth/form/business-document-form-step";
import { AccountSetupStep } from "@/components/auth/form/account-setup-form";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  User,
  Building,
  FileText,
  ClipboardList,
  KeyRound,
  Clock,
  CheckCircle2,
  Shield,
  HelpCircle,
} from "lucide-react";

import { useState } from "react";
import { registerProviderAction } from "@/actions/register-provider.action";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Static image URLs for file fields - using constants ensures consistency
const STATIC_ID_IMAGE_URL = "https://example.com/static-id-image.jpg";
const STATIC_BUSINESS_IMAGE_URL =
  "https://example.com/static-business-image.jpg";
const STATIC_PERMIT_IMAGE_URL = "https://example.com/static-permit-image.jpg";

export function MultiStepRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<CompleteRegistrationFormData>({
    resolver: zodResolver(completeRegistrationSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      validIdType: "",
      idImage: null,
      providerType: undefined,
      businessName: "",
      businessPhone: "",
      businessEmail: "",
      businessAddress: "",
      businessCity: "",
      businessProvince: "",
      businessZipCode: "",
      latitude: "",
      longitude: "",
      services: [{ serviceName: "", description: "", priceRange: "" }],
      operatingDays: [],
      openTime: "",
      closeTime: "",
      permitNumber: "",
      licenseNumber: "",
      permitImageUrl: null,
      businessImage: null,
      password: "",
      confirmPassword: "",
    },
  });

  const {
    currentStep,
    steps,
    nextStep,
    prevStep,
    goToStep,
    isStepComplete,
    canGoToStep,
  } = useMultiStepForm(form);

  const onSubmit = async (data: CompleteRegistrationFormData) => {
    try {
      setIsSubmitting(true);

      // Create a new object with static image values replacing any file objects
      const formDataWithStaticImages = {
        ...data,
        // Always provide these image URLs as strings, not as File objects
        idImage: STATIC_ID_IMAGE_URL,
        permitImageUrl: STATIC_PERMIT_IMAGE_URL,
        // Only include businessImage if there was a file selected
        businessImage: data.businessImage ? STATIC_BUSINESS_IMAGE_URL : null,
      };

      console.log("Submitting form with data:", formDataWithStaticImages);

      const result = await registerProviderAction(formDataWithStaticImages);

      if (result.error) {
        toast.error("Registration failed", {
          description: result.error,
        });
        // If there's a specific field error, focus on that field
        if (result.field && form.getFieldState(result.field as any)) {
          form.setError(result.field as any, {
            type: "manual",
            message: result.error,
          });
        }
      } else if (result.success) {
        toast.success("Registration successful!", {
          description: result.success,
        });
        // Redirect to success page
        router.push("/auth/register/success");
      }
    } catch (error) {
      toast.error("An unexpected error occurred", {
        description: "Please try again later.",
      });
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep form={form} />;
      case 2:
        return <BusinessInfoStep form={form} />;
      case 3:
        return <ServicesInfoStep form={form} />;
      case 4:
        return <BusinessDocumentsStep form={form} />;
      case 5:
        return <AccountSetupStep form={form} />;
      default:
        return <PersonalInfoStep form={form} />;
    }
  };

  // Step icons for sidebar
  const stepIcons = [
    <User key="user" className="h-5 w-5 text-violet-500" />,
    <Building key="building" className="h-5 w-5 text-violet-500" />,
    <ClipboardList key="services" className="h-5 w-5 text-violet-500" />,
    <FileText key="documents" className="h-5 w-5 text-violet-500" />,
    <KeyRound key="account" className="h-5 w-5 text-violet-500" />,
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Left sidebar - fixed to top and bottom */}
      <div className="w-full md:w-80 md:min-h-screen bg-white shadow-lg flex flex-col md:fixed md:top-0 md:bottom-0 md:left-0 z-10">
        {/* Sidebar Header */}
        <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-violet-600 text-white">
          <h1 className="text-xl font-semibold mb-2">
            Healthcare Provider
          </h1>
          <p className="text-sm opacity-90">Complete your registration</p>
        </div>

        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
                          <p className="text-sm font-medium">
              Estimated time: <span className="text-violet-600">10-15 mins</span>
            </p>
          </div>

          <div className="mt-4 flex items-center text-sm text-gray-500">
            <div className="flex items-center text-green-600 mr-4">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              <span>Secure</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              <span>Easy to complete</span>
            </div>
          </div>
        </div>

        <div className="flex-grow px-8 py-6 overflow-y-auto">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
            Registration Steps
          </h2>
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            completedSteps={steps
              .filter((step) => isStepComplete(step.id))
              .map((s) => s.id)}
            onStepClick={goToStep}
            canGoToStep={canGoToStep}
            layout="vertical"
            stepIcons={stepIcons}
          />
        </div>

        {/* Sidebar Footer */}
        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-gray-600">
              <Shield className="h-4 w-4 mr-2 text-violet-600" />
              <span className="text-sm font-medium">Secure Registration</span>
            </div>
            <Link href="#" className="text-violet-600 hover:text-violet-800 text-sm">
              <HelpCircle className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-xs text-gray-500">
            Your information is encrypted and protected
          </p>
        </div>
      </div>

      {/* Main content - with left margin to account for fixed sidebar */}
      <div className="flex-1 md:ml-80 flex flex-col">
        <div className="flex justify-end px-10 pt-5">
          <Link href="/auth/login">
            <Button
              variant="outline"
              className="border-violet-200 hover:bg-violet-50 text-violet-700"
            >
              Already have an account? Login
            </Button>
          </Link>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <div className="flex-grow p-8 md:p-12 overflow-y-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100 bg-gradient-to-br from-white to-blue-50/30">
                {renderCurrentStep()}
              </div>
            </div>

            <div className="p-6 bg-white border-t border-gray-100 shadow-md flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1 || isSubmitting}
                className="h-11 px-5 rounded-md border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
              </Button>

              <div className="text-sm font-medium text-gray-500">
                Step {currentStep} of {steps.length} •{" "}
                {steps[currentStep - 1]?.title}
              </div>

              {currentStep === steps.length ? (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 px-5 rounded-md bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={isSubmitting}
                  className="h-11 px-5 rounded-md bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
