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
  AlertCircle,
} from "lucide-react";

import { useState } from "react";
import { registerProviderAction } from "@/actions/register-provider.action";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

export function MultiStepRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
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

  const handleSubmitReview = () => {
    setShowReviewModal(true);
  };

  const handleContinueSubmission = async () => {
    setShowReviewModal(false);
    setShowConfirmationModal(true);
  };

  const handleFinalSubmit = async () => {
    const data = form.getValues();
    try {
      setIsSubmitting(true);
      setShowConfirmationModal(false);

      // We'll pass the actual file objects to the server action
      // The server will handle uploading them to Supabase
      const formData = {
        ...data,
        // Keep the actual File objects for upload
        idImage: data.idImage,
        permitImageUrl: data.permitImageUrl,
        businessImage: data.businessImage,
      };

      console.log("Submitting form with data:", formData);

      const result = await registerProviderAction(formData);

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

  const formData = form.getValues();

  // Helper function to display file names in the review modal
  const getFileName = (file: File | null | string) => {
    if (!file) return "No file selected";
    if (typeof file === "string") return file;
    return file.name;
  };

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
            onSubmit={form.handleSubmit(handleSubmitReview)}
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
                    "Review & Submit"
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

      {/* Review Information Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center text-violet-700">
              Review Your Information
            </DialogTitle>
            <DialogDescription className="text-center">
              Please review all your information before final submission
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 my-4">
            {/* Personal Information */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-violet-700 mb-3 flex items-center">
                <User className="w-5 h-5 mr-2" /> Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ID Type</p>
                  <p className="font-medium">{formData.validIdType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ID Document</p>
                  <p className="font-medium text-violet-600">
                    {formData.idImage ? getFileName(formData.idImage) : "No file selected"}
                  </p>
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-violet-700 mb-3 flex items-center">
                <Building className="w-5 h-5 mr-2" /> Business Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Business Name</p>
                  <p className="font-medium">{formData.businessName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Provider Type</p>
                  <p className="font-medium">{formData.providerType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Business Email</p>
                  <p className="font-medium">{formData.businessEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Business Phone</p>
                  <p className="font-medium">{formData.businessPhone}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">
                    {formData.businessAddress}, {formData.businessCity}, {formData.businessProvince} {formData.businessZipCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Services Information */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-violet-700 mb-3 flex items-center">
                <ClipboardList className="w-5 h-5 mr-2" /> Services & Hours
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Services Offered</p>
                  <div className="space-y-3">
                    {formData.services.map((service, index) => (
                      <div key={index} className="border-l-2 border-violet-400 pl-3 py-1">
                        <p className="font-medium">{service.serviceName}</p>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        {service.priceRange && (
                          <p className="text-sm text-violet-600">Price: {service.priceRange}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-sm text-gray-500">Operating Days</p>
                    <p className="font-medium">{formData.operatingDays.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hours</p>
                    <p className="font-medium">{formData.openTime} - {formData.closeTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Documents */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-violet-700 mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2" /> Business Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Permit Number</p>
                  <p className="font-medium">{formData.permitNumber}</p>
                </div>
                {formData.licenseNumber && (
                  <div>
                    <p className="text-sm text-gray-500">License Number</p>
                    <p className="font-medium">{formData.licenseNumber}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Permit Document</p>
                  <p className="font-medium text-violet-600">
                    {formData.permitImageUrl ? getFileName(formData.permitImageUrl) : "No file selected"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Business Image</p>
                  <p className="font-medium text-violet-600">
                    {formData.businessImage ? getFileName(formData.businessImage) : "No file selected"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowReviewModal(false)}
              className="border-gray-200"
            >
              Edit Information
            </Button>
            <Button 
              type="button" 
              onClick={handleContinueSubmission}
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
            >
              Continue to Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Final Confirmation Modal */}
      <Dialog open={showConfirmationModal} onOpenChange={setShowConfirmationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-violet-100 p-3 rounded-full">
                  <AlertCircle className="h-8 w-8 text-violet-600" />
                </div>
              </div>
              Confirm Registration
            </DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to submit your registration? Once submitted, you will need to wait for approval from our team.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-center mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmationModal(false)}
              className="sm:w-1/3"
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white sm:w-1/3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
