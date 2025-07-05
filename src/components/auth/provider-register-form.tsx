"use client";

import { useState, useTransition, useEffect, useActionState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { CheckCircle, Building2, MapPin, Calendar, FileText, Image, User, Mail, Phone } from "lucide-react";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ProviderType } from "@/generated/prisma";

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
  const [reviewOpen, setReviewOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
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
  
  const providerTypeLabels: Record<string, string> = {
    HOSPITAL: "Hospital",
    CLINIC: "Clinic",
    LABORATORY: "Laboratory",
    PHARMACY: "Pharmacy",
    DOCTOR: "Doctor",
    DENTIST: "Dentist",
    THERAPIST: "Therapist",
    OTHER: "Other"
  };

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

  const handleOpenReview = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setReviewOpen(true);
  };
  
  const handleReviewSubmit = () => {
    setReviewOpen(false);
    setConfirmOpen(true);
  };
  
  const handleConfirmSubmit = () => {
    setConfirmOpen(false);
    handleSubmit((data: FieldValues) => processForm(data as ProviderRegisterData))();
  };

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
                  {currentStep === 7 && (
                    <Step6AccountSetup 
                      form={form} 
                      onSubmit={() => {
                        handleSubmit((data: FieldValues) => processForm(data as ProviderRegisterData))();
                      }}
                    />
                  )}
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
                      type="button" 
                      onClick={handleOpenReview}
                      disabled={isPending}
                      className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {isPending ? "Submitting..." : "Review & Submit"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      
      {/* Review Dialog */}
      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              Review Your Information
            </DialogTitle>
            <DialogDescription>
              Please review all your information before creating your account
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Personal Information */}
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium text-blue-800">Personal Information</h3>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Full Name</p>
                    <p className="text-base text-gray-800">{form.getValues().firstName} {form.getValues().lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email Address</p>
                    <p className="text-base text-gray-800">{form.getValues().email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone Number</p>
                    <p className="text-base text-gray-800">{form.getValues().phone}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Business Information */}
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium text-blue-800">Business Information</h3>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Business Name</p>
                    <p className="text-base text-gray-800">{form.getValues().businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Business Type</p>
                    <p className="text-base text-gray-800">{providerTypeLabels[form.getValues().providerType] || form.getValues().providerType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Business Email</p>
                    <p className="text-base text-gray-800">{form.getValues().businessEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Business Phone</p>
                    <p className="text-base text-gray-800">{form.getValues().businessPhone}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location */}
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium text-blue-800">Location</h3>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-base text-gray-800">{form.getValues().address}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">City</p>
                      <p className="text-base text-gray-800">{form.getValues().city}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Province/State</p>
                      <p className="text-base text-gray-800">{form.getValues().province}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">ZIP Code</p>
                      <p className="text-base text-gray-800">{form.getValues().zipCode || "—"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Latitude</p>
                      <p className="text-base text-gray-800">{form.getValues().latitude}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Longitude</p>
                      <p className="text-base text-gray-800">{form.getValues().longitude}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Services */}
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium text-blue-800">Services ({form.getValues().services.filter(s => s.name && s.name.trim() !== "").length})</h3>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="space-y-4">
                  {form.getValues().services.filter(s => s.name && s.name.trim() !== "").map((service, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <p className="font-medium text-gray-800">{service.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      <p className="text-sm text-blue-600 mt-1">Price Range: {service.priceRange}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Operating Hours */}
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium text-blue-800">Operating Hours</h3>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="grid grid-cols-1 gap-2">
                  {form.getValues().operatingSchedule
                    .sort((a, b) => {
                      // Sort days of week with Sunday at the end
                      return a.dayOfWeek === 0 ? 1 : b.dayOfWeek === 0 ? -1 : a.dayOfWeek - b.dayOfWeek;
                    })
                    .map((schedule, index) => (
                    <div key={index} className="flex justify-between py-1">
                      <p className="text-sm font-medium text-gray-700">
                        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][schedule.dayOfWeek]}
                      </p>
                      <p className="text-sm text-gray-600">
                        {schedule.isOpen ? `${schedule.openTime} - ${schedule.closeTime}` : "Closed"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Business Documents */}
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium text-blue-800">Business Documents</h3>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Permit Number</p>
                    <p className="text-base text-gray-800">{form.getValues().permitNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">License Number</p>
                    <p className="text-base text-gray-800">{form.getValues().licenseNumber || "—"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Document Photo</p>
                    <p className="text-base text-gray-800">
                      {form.getValues().documentPhoto ? "Uploaded" : "Not uploaded"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Banner Photo */}
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                <div className="flex items-center gap-2">
                  <Image className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium text-blue-800">Banner Photo</h3>
                </div>
              </div>
              <div className="p-4 bg-white">
                <p className="text-base text-gray-800">
                  {form.getValues().bannerPhoto ? "Uploaded" : "Not uploaded"}
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setReviewOpen(false)}
            >
              Go Back & Edit
            </Button>
            <Button 
              type="button"
              onClick={handleReviewSubmit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Confirm & Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Confirmation Dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              Create Your Account
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to create your healthcare provider account? 
              This will submit your registration for review.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmSubmit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Yes, Create Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
