import { useState, useEffect, type FC } from "react";
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
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle2,
  KeyRound,
  BadgeCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";

// --- Password requirements configuration ---
const PASSWORD_REQUIREMENTS = [
  { id: "length", text: "8+ characters", test: (p: string) => p.length >= 8 },
  {
    id: "uppercase",
    text: "Uppercase letter",
    test: (p: string) => /[A-Z]/.test(p),
  },
  { id: "number", text: "Number", test: (p: string) => /\d/.test(p) },
  {
    id: "special",
    text: "Special character",
    test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
  },
];

const STRENGTH_LEVELS = [
  {
    score: 0,
    text: "Please enter a password",
    color: "text-gray-500",
    barColor: "bg-gray-200",
  },
  {
    score: 1,
    text: "Weak",
    color: "text-red-500 font-medium",
    barColor: "bg-red-500",
  },
  {
    score: 2,
    text: "Weak",
    color: "text-red-500 font-medium",
    barColor: "bg-red-500",
  },
  {
    score: 3,
    text: "Moderate",
    color: "text-yellow-600 font-medium",
    barColor: "bg-yellow-500",
  },
  {
    score: 4,
    text: "Strong",
    color: "text-green-600 font-medium",
    barColor: "bg-green-500",
  },
];

// --- Simple reusable components ---
const StepHeader: FC<{ title: string; description: string; icon: React.ReactNode }> = ({ 
  title, description, icon 
}) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
      {icon}
      <span>{title}</span>
    </h2>
    <p className="text-sm text-gray-500 mt-1">{description}</p>
  </div>
);

const InfoBox: FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ 
  title, icon, children 
}) => (
  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm">
    <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
      {icon}
      <span>{title}</span>
    </h3>
    <div className="text-sm text-blue-700">{children}</div>
  </div>
);

// --- Main component ---
interface AccountSetupStepProps {
  form: UseFormReturn<CompleteRegistrationFormData>;
  showValidationErrors?: boolean;
}

export function AccountSetupStep({ form, showValidationErrors = false }: AccountSetupStepProps) {
  const password = form.watch("password") || "";
  
  // Clear errors when component mounts
  useEffect(() => {
    // Only clear errors on initial mount, not when showValidationErrors changes
    if (!showValidationErrors) {
      form.clearErrors();
    }
    
    return () => {
      // Clean up if needed
    };
  }, [form]);
  
  return (
    <div className="space-y-8" onClick={(e) => e.stopPropagation()}>
      <StepHeader
        title="Account Setup"
        description="Create a secure password to protect your healthcare provider account."
        icon={<KeyRound className="h-5 w-5 text-blue-500" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Inputs */}
        <div className="space-y-6">
          <InfoBox
            title="Create a Strong Password"
            icon={<Shield className="h-4 w-4" />}
          >
            <p>Your password must meet the requirements for better security.</p>
          </InfoBox>
          
          <PasswordInput
            form={form}
            name="password"
            label="Password"
            placeholder="Enter your password"
            showValidationErrors={showValidationErrors}
          />
          
          <PasswordInput
            form={form}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            description="Type your password again to confirm."
            showValidationErrors={showValidationErrors}
          />
        </div>

        {/* Right Column: Strength & Tips */}
        <div className="space-y-6">
          <PasswordStrengthIndicator password={password} />
          <SecurityTips />
        </div>
      </div>
    </div>
  );
}

// Password input component with event.preventDefault()
interface PasswordInputProps {
  form: UseFormReturn<CompleteRegistrationFormData>;
  name: "password" | "confirmPassword";
  label: string;
  placeholder: string;
  description?: string;
  showValidationErrors?: boolean;
}

const PasswordInput: FC<PasswordInputProps> = ({
  form,
  name,
  label,
  placeholder,
  description,
  showValidationErrors = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-gray-500" />
            <span>{label}</span>
          </FormLabel>
          <div className="relative">
            <FormControl>
              <Input  
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className="h-11 pr-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                {...field}
                onFocus={(e) => {
                  // Prevent default behavior
                  e.preventDefault();
                  // Clear errors
                  form.clearErrors(name);
                }}
                onChange={(e) => {
                  // Prevent default behavior
                  e.preventDefault();
                  // Update field value
                  field.onChange(e);
                  // Clear errors
                  form.clearErrors(name);
                }}
                onClick={(e) => {
                  // Prevent event propagation
                  e.stopPropagation();
                }}
              />
            </FormControl>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={(e) => {
                // Prevent default behavior
                e.preventDefault();
                e.stopPropagation();
                setShowPassword(!showPassword);
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          {/* Always show error messages when they exist, regardless of showValidationErrors */}
          {form.formState.errors[name] && (
            <FormMessage>
              {form.formState.errors[name]?.message as string}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

// Password strength indicator component
const PasswordStrengthIndicator: FC<{ password: string }> = ({ password }) => {
  // Calculate strength
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { 
      score: 0, 
      percentage: 0, 
      strength: STRENGTH_LEVELS[0],
      requirements: PASSWORD_REQUIREMENTS.map(req => ({
        ...req,
        isValid: false
      }))
    };
    
    const validRequirements = PASSWORD_REQUIREMENTS.filter(req => req.test(pass));
    const score = validRequirements.length;
    const percentage = (score / PASSWORD_REQUIREMENTS.length) * 100;
    
    return {
      score,
      percentage,
      strength: STRENGTH_LEVELS[score],
      requirements: PASSWORD_REQUIREMENTS.map(req => ({
        ...req,
        isValid: req.test(pass)
      }))
    };
  };
  
  const { strength, percentage, requirements } = getPasswordStrength(password);
  
  return (
    <div className="space-y-4">
      <InfoBox
        title="Password Strength"
        icon={<BadgeCheck className="h-4 w-4" />}
      >
        <p>
          A strong password helps protect your account from unauthorized access.
        </p>
      </InfoBox>

      <div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${strength.barColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className={`text-sm mt-2 ${strength.color}`}>{strength.text}</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm space-y-3">
        <h4 className="text-sm font-medium text-gray-700">
          Password Requirements
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
          {requirements.map((req) => (
            <div key={req.id} className="flex items-center gap-2">
              <div
                className={`h-5 w-5 rounded-full flex items-center justify-center transition-colors ${
                  req.isValid ? "bg-green-500" : "bg-gray-200"
                }`}
              >
                {req.isValid && <CheckCircle2 className="h-3 w-3 text-white" />}
              </div>
              <span className="text-sm text-gray-700">{req.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Security tips component
const SecurityTips: FC = () => (
  <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 space-y-2 shadow-sm">
    <p className="font-medium text-gray-700 mb-1">Security Tips:</p>
    <p>• Don't reuse passwords from other sites</p>
    <p>• Avoid using personal information</p>
    <p>• Change your password periodically</p>
    <p>• Consider using a password manager</p>
  </div>
);
