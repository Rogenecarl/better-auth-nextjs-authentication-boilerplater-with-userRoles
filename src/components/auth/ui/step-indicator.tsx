"use client";

import React from "react";
import { 
  User, 
  Building2, 
  FileText, 
  Clock, 
  MapPin, 
  Image, 
  KeyRound,
  CheckCircle2,
  Circle,
  Clock3,
  Shield,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
}

type Step = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps: Step[] = [
    {
      id: 1,
      title: "Personal Information",
      description: "Basic details and identity verification",
      icon: <User className="h-5 w-5" />
    },
    {
      id: 2,
      title: "Business Information",
      description: "Details about your healthcare business",
      icon: <Building2 className="h-5 w-5" />
    },
    {
      id: 3,
      title: "Services Offered",
      description: "Healthcare services and operating hours",
      icon: <Clock className="h-5 w-5" />
    },
    {
      id: 4,
      title: "Verification Documents",
      description: "Business permits and licenses",
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: 5,
      title: "Business Location",
      description: "Map location of your business",
      icon: <MapPin className="h-5 w-5" />
    },
    {
      id: 6,
      title: "Cover Photo",
      description: "Banner image for your profile",
      icon: <Image className="h-5 w-5" />
    },
    {
      id: 7,
      title: "Account Setup",
      description: "Create your login credentials",
      icon: <KeyRound className="h-5 w-5" />
    }
  ];

  // Icons for mobile view
  const mobileIcons = [
    <User key="user" className="h-4 w-4" />,
    <Building2 key="building" className="h-4 w-4" />,
    <Clock key="clock" className="h-4 w-4" />,
    <FileText key="file" className="h-4 w-4" />,
    <MapPin key="map" className="h-4 w-4" />,
    <Image key="image" className="h-4 w-4" />,
    <KeyRound key="key" className="h-4 w-4" />
  ];

    return (
    <div className="w-full h-full bg-white text-gray-800 flex flex-col shadow-lg">
      {/* Fixed Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-b-xl">
        <h1 className="text-xl lg:text-2xl font-bold">Healthcare Provider</h1>
        <p className="text-sm opacity-90 mt-1">Complete your registration</p>
        
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
            <Clock3 className="w-4 h-4" />
            <span>10-15 mins</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-4 h-4" />
            <span>Secure</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-4 h-4" />
            <span>Easy to complete</span>
          </div>
        </div>
      </div>
      
      {/* Scrollable Steps Section */}
      <div className="flex-1 overflow-y-auto p-6 pt-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-blue-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        <h2 className="text-sm font-medium tracking-wider uppercase text-blue-600 mb-4 sticky top-0 bg-white py-2 -mt-2 -mx-6 px-6 border-b border-gray-100">
          REGISTRATION STEPS
        </h2>
        
        <div className="space-y-3">
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
            <div
              key={step.id}
                className={cn(
                  "flex items-start gap-3 p-3 relative rounded-xl transition-all",
                  isActive ? "bg-blue-50 border border-blue-100 shadow-sm" : 
                  isCompleted ? "bg-gray-50" : "hover:bg-gray-50"
                )}
              >
                <div className="relative">
                  <div 
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full z-10 relative shadow-sm",
                      isActive ? "bg-blue-600 text-white" : 
                      isCompleted ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  
                  {step.id < steps.length && (
                    <div className={cn(
                      "absolute left-4 top-8 w-[2px] h-[calc(100%-4px)]",
                      isCompleted ? "bg-green-500" : "bg-gray-200"
                    )} />
                  )}
                </div>
                
                <div className="pt-1">
                  <h3 className={cn(
                    "font-medium",
                    isActive ? "text-blue-700" : isCompleted ? "text-gray-800" : "text-gray-600"
                  )}>
                  {step.title}
                  </h3>
                  <p className={cn(
                    "text-xs",
                    isActive ? "text-blue-600" : "text-gray-500"
                  )}>
                  {step.description}
                </p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
      
      {/* Fixed Footer */}
      <div className="p-6 border-t border-gray-100 mt-auto bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-t-xl">
        <div className="flex items-center gap-2 text-sm">
          <Shield className="w-4 h-4" />
          <span className="font-medium">Secure Registration</span>
            </div>
        <p className="text-xs opacity-90 mt-1">Your information is encrypted and protected</p>
      </div>

      {/* Mobile Steps - Horizontal Scrolling */}
      <div className="lg:hidden block p-4 border-t border-gray-100 bg-white overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex gap-3 min-w-max">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <div 
              key={step.id}
              className={cn(
                  "flex flex-col items-center w-16",
                  isActive ? "opacity-100" : "opacity-70"
              )}
            >
              <div
                className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full mb-1 shadow-sm",
                    isActive ? "bg-blue-600 text-white" : 
                    isCompleted ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    mobileIcons[index]
                  )}
                </div>
                <span className="text-[10px] text-center whitespace-nowrap overflow-hidden text-ellipsis w-full">
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
