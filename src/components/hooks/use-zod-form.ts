import { useState } from "react";
import { z } from "zod";

export function useZodForm<T extends z.ZodType>(schema: T) {
  type FormValues = z.infer<T>;
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  const validate = (values: unknown): { data?: FormValues; success: boolean } => {
    try {
      setErrors({});
      const validatedData = schema.parse(values);
      return { data: validatedData as FormValues, success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof FormValues;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      }
      return { success: false };
    }
  };

  const handleSubmit = (
    onSubmit: (data: FormValues, formData: FormData) => void | Promise<void>
  ) => {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      // Clear previous errors
      setErrors({});
      
      const formData = new FormData(event.currentTarget);
      
      // Extract form values
      const formValues: Record<string, string> = {};
      const schemaObject = schema as unknown as z.ZodObject<z.ZodRawShape>;
      
      if (schemaObject._def && schemaObject._def.shape) {
        const shape = schemaObject._def.shape();
        Object.keys(shape).forEach((key) => {
          formValues[key] = String(formData.get(key) || "");
        });
      }

      const result = validate(formValues);
      if (result.success && result.data) {
        onSubmit(result.data, formData);
      }
    };
  };

  // Generate a FormData object from the validated data
  const createFormData = (data: FormValues): FormData => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    return formData;
  };

  return {
    errors,
    handleSubmit,
    validate,
    setErrors,
    createFormData,
  };
} 