"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { CompleteRegistrationFormData } from "@/components/auth/schemas/registration-schema";

export interface Step {
  id: number;
  title: string;
  description: string;
}

export function useMultiStepForm(
  form: UseFormReturn<CompleteRegistrationFormData>
) {
  const [currentStep, setCurrentStep] = useState(1);
  // Track which steps have had their validation triggered
  const [validatedSteps, setValidatedSteps] = useState<number[]>([]);
  // Track which step we've attempted to validate (for showing errors)
  const [attemptedValidationStep, setAttemptedValidationStep] = useState<number | null>(null);

  const steps: Step[] = [
    {
      id: 1,
      title: "Personal Information",
      description: "Basic details and identity verification",
    },
    {
      id: 2,
      title: "Business Information",
      description: "Details about your healthcare business",
    },
    {
      id: 3,
      title: "Services Offered",
      description: "Healthcare services and operating hours",
    },
    {
      id: 4,
      title: "Business Documents",
      description: "Required permits and business images",
    },
    {
      id: 5,
      title: "Account Setup",
      description: "Create secure login credentials",
    },
  ];

  const nextStep = async (e?: React.MouseEvent | React.FormEvent) => {
    // Prevent default form submission if event is provided
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Mark this step as attempted for validation
    setAttemptedValidationStep(currentStep);
    
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      // Clear validation state when moving to next step
      form.clearErrors();
      // Reset the attempted validation step
      setAttemptedValidationStep(null);
    }
  };

  const prevStep = (e?: React.MouseEvent) => {
    // Prevent default form submission if event is provided
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      // Clear validation state when moving to previous step
      form.clearErrors();
      // Reset the attempted validation step
      setAttemptedValidationStep(null);
    }
  };

  const goToStep = (step: number, e?: React.MouseEvent) => {
    // Prevent default form submission if event is provided
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (step >= 1 && step <= steps.length && canGoToStep(step)) {
      setCurrentStep(step);
      // Clear validation state when jumping to a step
      form.clearErrors();
      // Reset the attempted validation step
      setAttemptedValidationStep(null);
    }
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    // Mark this step as validated
    setValidatedSteps((prev) => 
      prev.includes(currentStep) ? prev : [...prev, currentStep]
    );
    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const getFieldsForStep = (
    step: number
  ): (keyof CompleteRegistrationFormData)[] => {
    switch (step) {
      case 1:
        return [
          "email",
          "firstName",
          "lastName",
          "phone",
          "validIdType",
          "idImage",
        ];
      case 2:
        return [
          "providerType",
          "businessName",
          "businessPhone",
          "businessEmail",
          "businessAddress",
          "businessCity",
          "businessProvince",
          "businessZipCode",
        ];
      case 3:
        return ["services", "operatingDays", "openTime", "closeTime"];
      case 4:
        return ["permitNumber", "licenseNumber", "permitImageUrl"];
      case 5:
        return ["password", "confirmPassword"];
      default:
        return [];
    }
  };

  const isStepComplete = (stepId: number): boolean => {
    const formData = form.getValues();

    // Logic for each step's completion
    switch (stepId) {
      case 1: {
        const { firstName, lastName, email, phone, validIdType, idImage } =
          formData;
        return Boolean(
          firstName && lastName && email && phone && validIdType && idImage
        );
      }

      case 2: {
        const {
          providerType,
          businessName,
          businessPhone,
          businessEmail,
          businessAddress,
          businessCity,
          businessProvince,
          businessZipCode,
        } = formData;

        return Boolean(
          providerType &&
            businessName &&
            businessPhone &&
            businessEmail &&
            businessAddress &&
            businessCity &&
            businessProvince &&
            businessZipCode
        );
      }

      case 3: {
        const { services, operatingDays, openTime, closeTime } = formData;
        const hasServices =
          services?.length > 0 &&
          services.some((s) => Boolean(s.serviceName && s.description));
        const hasSchedule =
          operatingDays?.length > 0 && Boolean(openTime && closeTime);

        return Boolean(hasServices && hasSchedule);
      }

      case 4: {
        const { permitNumber, permitImageUrl } = formData;
        return Boolean(permitNumber && permitImageUrl);
      }

      case 5: {
        const { password, confirmPassword } = formData;
        return Boolean(
          password && confirmPassword && password === confirmPassword
        );
      }

      default:
        return false;
    }
  };

  const canGoToStep = (stepId: number): boolean => {
    // Can always go to the first step
    if (stepId === 1) return true;

    // Can go to any step that comes before the current step
    if (stepId < currentStep) return true;

    // Can go to the next step only if the current step is complete
    if (stepId === currentStep + 1) return isStepComplete(currentStep);

    // For steps more than one ahead, all previous steps must be complete
    if (stepId > currentStep + 1) {
      for (let i = 1; i < stepId; i++) {
        if (!isStepComplete(i)) return false;
      }
      return true;
    }

    return false;
  };

  // Check if a step has been validated (to show/hide errors)
  const isStepValidated = (stepId: number): boolean => {
    // Only show validation errors if we've attempted to validate this specific step
    return attemptedValidationStep === stepId;
  };

  return {
    currentStep,
    steps,
    nextStep,
    prevStep,
    goToStep,
    isStepComplete,
    canGoToStep,
    validateCurrentStep,
    getFieldsForStep,
    validatedSteps,
    isStepValidated,
  };
}
