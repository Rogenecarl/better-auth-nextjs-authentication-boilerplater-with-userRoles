import type { UseFormReturn } from "react-hook-form"
import type { CompleteRegistrationFormData } from "@/components/auth/schemas/registration-schema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Lock, Eye, EyeOff, Shield, AlertTriangle, CheckCircle2, KeyRound, BadgeCheck } from "lucide-react"
import { useState } from "react"

interface AccountSetupStepProps {
  form: UseFormReturn<CompleteRegistrationFormData>
}

export function AccountSetupStep({ form }: AccountSetupStepProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Check password strength
  const password = form.watch("password")
  const hasMinLength = password?.length >= 8
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password || "")
  const hasNumber = /\d/.test(password || "")
  const hasUppercase = /[A-Z]/.test(password || "")
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-blue-500" />
          <span>Account Setup</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Create a secure password to protect your healthcare provider account
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Create a Strong Password</span>
            </h3>
            <p className="text-sm text-blue-700 mb-2">
              Your password must be at least 8 characters and include uppercase letters, 
              numbers, and special characters for better security.
            </p>
          </div>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-gray-500" />
                    <span>Password</span>
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password" 
                        className="h-11 pr-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                        {...field} 
                      />
                    </FormControl>
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-gray-500" />
                    <span>Confirm Password</span>
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="Confirm your password" 
                        className="h-11 pr-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                        {...field} 
                      />
                    </FormControl>
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <FormDescription className="text-xs text-gray-500 mt-1">
                    Type your password again to confirm
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm">
            <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              <span>Password Strength</span>
            </h3>
            <p className="text-sm text-blue-700 mb-2">
              A strong password helps protect your account from unauthorized access
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Password strength indicator */}
            <div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${getStrengthColor(password)}`} 
                  style={{ width: `${getStrengthPercentage(password)}%` }}
                ></div>
              </div>
              
              <p className="text-sm text-gray-500 mt-2 mb-4 flex items-center gap-2">
                <span className={`${getStrengthTextColor(password)}`}>
                  {getStrengthText(password)}
                </span>
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Password Requirements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                <div className="flex items-center gap-2">
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center ${hasMinLength ? 'bg-green-500' : 'bg-gray-200'}`}>
                    {hasMinLength && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm text-gray-700">8+ characters</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center ${hasUppercase ? 'bg-green-500' : 'bg-gray-200'}`}>
                    {hasUppercase && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm text-gray-700">Uppercase letter</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center ${hasNumber ? 'bg-green-500' : 'bg-gray-200'}`}>
                    {hasNumber && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm text-gray-700">Number</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center ${hasSpecialChar ? 'bg-green-500' : 'bg-gray-200'}`}>
                    {hasSpecialChar && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm text-gray-700">Special character</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600 space-y-2 shadow-sm">
                <p className="font-medium text-gray-700 mb-1">Security Tips:</p>
                <p>• Don't reuse passwords from other sites</p>
                <p>• Avoid using personal information</p>
                <p>• Change your password periodically</p>
                <p>• Consider using a password manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getStrengthPercentage(password: string | undefined): number {
  if (!password) return 0;
  
  let score = 0;
  
  if (password.length >= 8) score += 25;
  if (/[A-Z]/.test(password)) score += 25;
  if (/\d/.test(password)) score += 25;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 25;
  
  return score;
}

function getStrengthColor(password: string | undefined): string {
  const score = getStrengthPercentage(password);
  
  if (score < 50) return 'bg-red-500';
  if (score < 75) return 'bg-yellow-500';
  return 'bg-green-500';
}

function getStrengthText(password: string | undefined): string {
  const score = getStrengthPercentage(password);
  
  if (score === 0) return 'Please enter a password';
  if (score < 50) return 'Weak password';
  if (score < 75) return 'Moderate password';
  return 'Strong password';
}

function getStrengthTextColor(password: string | undefined): string {
  const score = getStrengthPercentage(password);
  
  if (score < 50) return 'text-red-500 font-medium';
  if (score < 75) return 'text-yellow-600 font-medium';
  if (score >= 75) return 'text-green-600 font-medium';
  return 'text-gray-500';
}
