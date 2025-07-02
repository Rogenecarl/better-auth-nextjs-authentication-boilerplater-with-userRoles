"use client";

import React, { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Step } from "@/components/auth/hooks/use-multi-step-form";

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
  canGoToStep: (step: number) => boolean;
  layout?: "horizontal" | "vertical";
  stepIcons?: ReactNode[];
}

export function StepIndicator({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
  canGoToStep,
  layout = "horizontal",
  stepIcons,
}: StepIndicatorProps) {
  if (layout === "vertical") {
    return (
      <div className="w-full">
        <div className="flex flex-col items-start relative">
          {/* Progress bar background - vertical */}
          <div className="absolute top-0 left-5 w-[2px] h-full bg-gray-200 -translate-x-1/2 rounded-full" />

          {/* Active progress - vertical */}
          <div
            className="absolute top-0 left-5 w-[2px] bg-blue-500 -translate-x-1/2 rounded-full transition-all duration-300 ease-in-out"
            style={{
              height: `${Math.max(
                ((currentStep - 1) / (steps.length - 1)) * 100,
                0
              )}%`,
            }}
          />

          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-start mb-8 relative w-full ${
                index === steps.length - 1 ? "" : "pb-6"
              }`}
            >
              <button
                onClick={() => canGoToStep(step.id) && onStepClick(step.id)}
                disabled={!canGoToStep(step.id)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 z-10",
                  {
                    "bg-blue-500 text-white shadow-md": currentStep === step.id,
                    "bg-green-500 text-white": completedSteps.includes(step.id),
                    "bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500":
                      currentStep !== step.id &&
                      !completedSteps.includes(step.id) &&
                      canGoToStep(step.id),
                    "bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed":
                      !canGoToStep(step.id),
                  }
                )}
              >
                {completedSteps.includes(step.id) ? (
                  <Check className="w-5 h-5" />
                ) : stepIcons && stepIcons[index] ? (
                  stepIcons[index]
                ) : (
                  step.id
                )}
              </button>
              <div className="ml-4">
                <p
                  className={cn("font-medium", {
                    "text-blue-600": currentStep === step.id,
                    "text-green-600": completedSteps.includes(step.id),
                    "text-gray-900":
                      currentStep !== step.id &&
                      !completedSteps.includes(step.id),
                  })}
                >
                  {step.title}
                </p>
                <p className="text-sm text-gray-500 mt-1 max-w-[90%]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Horizontal layout
  return (
    <div className="py-6 w-full">
      <div className="hidden md:flex items-center justify-between relative w-full">
        {/* Progress bar background */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -translate-y-1/2" />

        {/* Active progress */}
        <div
          className="absolute top-1/2 left-0 h-[2px] bg-blue-500 -translate-y-1/2 transition-all duration-300 ease-in-out"
          style={{
            width: `${Math.max(
              ((currentStep - 1) / (steps.length - 1)) * 100,
              0
            )}%`,
          }}
        />

        {steps.map((step, index) => (
          <div
            key={step.id}
            className="relative z-10 flex flex-col items-center w-full max-w-[150px]"
          >
            <button
              onClick={() => canGoToStep(step.id) && onStepClick(step.id)}
              disabled={!canGoToStep(step.id)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
                {
                  "bg-blue-500 text-white shadow-md": currentStep === step.id,
                  "bg-green-500 text-white": completedSteps.includes(step.id),
                  "bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500":
                    currentStep !== step.id &&
                    !completedSteps.includes(step.id) &&
                    canGoToStep(step.id),
                  "bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed":
                    !canGoToStep(step.id),
                }
              )}
            >
              {completedSteps.includes(step.id) ? (
                <Check className="w-5 h-5" />
              ) : stepIcons && stepIcons[index] ? (
                stepIcons[index]
              ) : (
                step.id
              )}
            </button>
            <div className="mt-3 text-center w-full">
              <p
                className={cn("text-sm font-medium truncate", {
                  "text-blue-600": currentStep === step.id,
                  "text-green-600": completedSteps.includes(step.id),
                  "text-gray-700":
                    currentStep !== step.id &&
                    !completedSteps.includes(step.id),
                })}
              >
                {step.title}
              </p>
              <p className="text-xs text-gray-500 mt-1 h-8 overflow-hidden">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-gray-700">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-xs font-medium text-blue-600">
            {steps[currentStep - 1]?.title}
          </span>
        </div>

        {/* Mobile progress indicator */}
        <div className="h-1.5 w-full bg-gray-200 rounded-full">
          <div
            className="h-1.5 bg-blue-500 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        <div className="flex overflow-x-auto py-4 gap-3 scrollbar-hide">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => canGoToStep(step.id) && onStepClick(step.id)}
              disabled={!canGoToStep(step.id)}
              className={cn(
                "flex flex-col items-center min-w-[70px] px-2",
                "focus:outline-none"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-2",
                  {
                    "bg-blue-500 text-white": currentStep === step.id,
                    "bg-green-500 text-white": completedSteps.includes(step.id),
                    "bg-white border-2 border-gray-300 text-gray-700":
                      currentStep !== step.id &&
                      !completedSteps.includes(step.id),
                    "opacity-50": !canGoToStep(step.id),
                  }
                )}
              >
                {completedSteps.includes(step.id) ? (
                  <Check className="w-4 h-4" />
                ) : stepIcons && stepIcons[index] ? (
                  stepIcons[index]
                ) : (
                  step.id
                )}
              </div>
              <span
                className={cn("text-xs text-center truncate w-full", {
                  "text-blue-600 font-medium": currentStep === step.id,
                  "text-green-600": completedSteps.includes(step.id),
                  "text-gray-700":
                    currentStep !== step.id &&
                    !completedSteps.includes(step.id),
                })}
              >
                {step.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
