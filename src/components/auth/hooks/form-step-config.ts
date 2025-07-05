import { ProviderRegisterData } from "@/components/auth/schemas/provider-register-schema";

// Change the return type here from string[] to this more specific type
export const getFieldsForStep = (
  step: number
): (keyof ProviderRegisterData)[] => {
  switch (step) {
    case 1:
      return ["firstName", "lastName", "email", "phone"];
    case 2:
      return [
        "businessName",
        "providerType",
        "businessPhone",
        "businessEmail",
        "address",
        "city",
        "province",
        "zipCode",
      ];
    case 3:
      return ["services", "operatingSchedule"];
    case 4:
      return ["permitNumber", "licenseNumber", "documentPhoto"];
    case 5:
      return ["latitude", "longitude"];
    case 6:
      return ["bannerPhoto"];
    case 7:
      return ["password", "confirmPassword"];
    default:
      return [];
  }
};
