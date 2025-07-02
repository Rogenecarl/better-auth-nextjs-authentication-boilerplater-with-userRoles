"use server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
  completeRegistrationSchema,
  type CompleteRegistrationFormData,
} from "@/components/auth/schemas/registration-schema";
import {
  UserRole,
  UserStatus,
  ProviderStatus,
  DocumentType,
} from "@/generated/prisma";
import { supabase } from "@/lib/supabase";

export async function registerProviderAction(
  data: CompleteRegistrationFormData
) {
  const validationResult = completeRegistrationSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: "Invalid form data. Please review all steps." };
  }

  const {
    email,
    businessEmail,
    firstName,
    lastName,
    password,
    validIdType,
    idImage,
    businessName,
    businessPhone,
    businessAddress,
    businessCity,
    businessProvince,
    businessZipCode,
    businessImage,
    permitImageUrl,
    permitNumber,
    licenseNumber,
    services,
    operatingDays,
    openTime,
    closeTime,
    providerType,
    latitude,
    longitude,
  } = validationResult.data;

  // Check if either email already exists in the database.
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    return {
      error:
        "This personal email is already registered. Please use another email account.",
      field: "email",
    };
  }

  const existingProvider = await prisma.healthProvider.findUnique({
    where: { businessEmail },
    select: { id: true },
  });

  if (existingProvider) {
    return {
      error:
        "This business email is already registered. Please use another business email.",
      field: "businessEmail",
    };
  }

  try {
    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        email,
        name: `${firstName} ${lastName}`,
        password,
        role: UserRole.HEALTH_PROVIDER,
        status: UserStatus.PENDING_VERIFICATION,
      },
    });

    const newUser = await prisma.user.findUniqueOrThrow({
      where: { email },
      select: { id: true },
    });

    // Initialize variables to store uploaded file URLs
    let businessImageUrl = null;
    let idImageUrl = null;
    let permitImageUrl_uploaded = null;

    // Upload ID image to Supabase if provided
    if (idImage) {
      const { data: idData, error: idError } = await supabase.storage
        .from("provider-documents/id-images")
        .upload(`${newUser.id}-id-${Date.now()}`, idImage, {
          upsert: true,
        });

      if (idError) {
        console.error("ID IMAGE UPLOAD ERROR:", idError);
      } else {
        // Get the public URL for the uploaded file
        const { data: idPublicUrl } = supabase.storage
          .from("provider-documents/id-images")
          .getPublicUrl(idData.path);
        
        idImageUrl = idPublicUrl.publicUrl;
      }
    }

    // Upload business permit image to Supabase if provided
    if (permitImageUrl) {
      const { data: permitData, error: permitError } = await supabase.storage
        .from("provider-documents/permit-images")
        .upload(`${newUser.id}-permit-${Date.now()}`, permitImageUrl, {
          upsert: true,
        });

      if (permitError) {
        console.error("PERMIT IMAGE UPLOAD ERROR:", permitError);
      } else {
        // Get the public URL for the uploaded file
        const { data: permitPublicUrl } = supabase.storage
          .from("provider-documents/permit-images")
          .getPublicUrl(permitData.path);
        
        permitImageUrl_uploaded = permitPublicUrl.publicUrl;
      }
    }

    // Upload business image to Supabase if provided
    if (businessImage) {
      const { data: imageData, error: imageError } = await supabase.storage
        .from("provider-documents/business-images")
        .upload(`${newUser.id}-business-${Date.now()}`, businessImage, {
          upsert: true,
        });

      if (imageError) {
        console.error("BUSINESS IMAGE UPLOAD ERROR:", imageError);
      } else {
        // Get the public URL for the uploaded file
        const { data: imagePublicUrl } = supabase.storage
          .from("provider-documents/business-images")
          .getPublicUrl(imageData.path);
        
        businessImageUrl = imagePublicUrl.publicUrl;
      }
    }

    // Create provider in database
    await prisma.$transaction(async (tx) => {
      const newProvider = await tx.healthProvider.create({
        data: {
          userId: newUser.id,
          providerType,
          businessName,
          businessPhone,
          businessEmail,
          address: businessAddress,
          city: businessCity,
          province: businessProvince,
          zipCode: businessZipCode,
          status: ProviderStatus.PENDING,
          images: businessImageUrl ? [businessImageUrl] : [],
          latitude: latitude ? parseFloat(latitude) : 0,
          longitude: longitude ? parseFloat(longitude) : 0,
        },
      });

      const documentsToCreate = [];
      if (idImageUrl && validIdType) {
        documentsToCreate.push({
          userId: newUser.id,
          imageUrl: idImageUrl,
          type: validIdType
            .toUpperCase()
            .replace(/'/g, "")
            .replace(/ /g, "_") as DocumentType,
        });
      }

      // Make sure permitImageUrl exists in the data
      if (permitImageUrl_uploaded && (permitNumber || licenseNumber)) {
        documentsToCreate.push({
          providerId: newProvider.id,
          imageUrl: permitImageUrl_uploaded,
          identifier: `Permit: ${permitNumber}, License: ${
            licenseNumber || "N/A"
          }`,
          type: DocumentType.BUSINESS_PERMIT,
        });
      }

      if (documentsToCreate.length > 0) {
        await tx.document.createMany({ data: documentsToCreate });
      }

      if (services?.length) {
        await tx.service.createMany({
          data: services.map((s) => ({
            name: s.serviceName,
            description: s.description,
            priceRange: s.priceRange || null,
            providerId: newProvider.id,
          })),
        });
      }

      const dayMap: { [key: string]: number } = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
      };
      if (operatingDays?.length) {
        await tx.operatingSchedule.createMany({
          data: operatingDays.map((day) => ({
            providerId: newProvider.id,
            dayOfWeek: dayMap[day],
            openTime,
            closeTime,
            isOpen: true,
          })),
        });
      }
    });

    return {
      success:
        "Registration successful! Please check your email for verification.",
    };
  } catch (error: any) {
    console.error("REGISTRATION ERROR:", error);
    try {
      const orphanedUser = await prisma.user.findUnique({ where: { email } });
      if (orphanedUser)
        await prisma.user.delete({ where: { id: orphanedUser.id } });
    } catch (rollbackError) {
      console.error("ROLLBACK FAILED:", rollbackError);
    }

    return {
      error:
        "An unexpected error occurred during registration. Please try again.",
    };
  }
}
