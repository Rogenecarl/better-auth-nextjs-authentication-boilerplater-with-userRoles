"use server";

import { headers } from "next/headers";
import { User } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { providerRegisterSchema } from "@/components/auth/schemas/provider-register-schema";

export type FormState = {
  success: boolean;
  message: string;
};

export async function registerProviderAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Validate data
  const rawData = Object.fromEntries(formData.entries());
  const dataToValidate = {
    ...rawData,
    services: JSON.parse((formData.get("services") as string) || "[]"),
    operatingSchedule: JSON.parse(
      (formData.get("operatingSchedule") as string) || "[]"
    ),
    documentPhoto: formData.get("documentPhoto"),
    bannerPhoto: formData.get("bannerPhoto"),
    latitude: rawData.latitude ? Number(rawData.latitude) : undefined,
    longitude: rawData.longitude ? Number(rawData.longitude) : undefined,
  };

  const validationResult = providerRegisterSchema.safeParse(dataToValidate);
  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.errors[0]?.message || "Invalid data.",
    };
  }

  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    documentPhoto,
    bannerPhoto,
    ...providerData
  } = validationResult.data;
  const fullName = `${firstName} ${lastName}`;

  // Variables for cleanup logic
  let createdUser: User | null = null;
  const uploadedFilePaths: string[] = [];

  try {
    // 2. Create user with better-auth
    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name: fullName,
        email,
        password,
        role: "HEALTH_PROVIDER",
        status: "PENDING_APPROVAL",
      },
    });

    createdUser = await prisma.user.findUniqueOrThrow({ where: { email } });

    // 3. Upload files to Supabase
    const docFile = documentPhoto as File;
    const docPath = `business-docu/${createdUser.id}-${docFile.name}`;
    const { error: docError } = await supabase.storage
      .from("provider-documents")
      .upload(docPath, docFile);
    if (docError)
      throw new Error(`Document Upload Failed: ${docError.message}`);
    uploadedFilePaths.push(docPath);

    const bannerFile = bannerPhoto as File;
    const bannerPath = `cover-photo/${createdUser.id}-${bannerFile.name}`;
    const { error: bannerError } = await supabase.storage
      .from("provider-documents")
      .upload(bannerPath, bannerFile);
    if (bannerError)
      throw new Error(`Cover Photo Upload Failed: ${bannerError.message}`);
    uploadedFilePaths.push(bannerPath);

    const {
      data: { publicUrl: documentPublicUrl },
    } = supabase.storage.from("provider-documents").getPublicUrl(docPath);
    const {
      data: { publicUrl: bannerPublicUrl },
    } = supabase.storage.from("cover-photo").getPublicUrl(bannerPath);

    if (!documentPublicUrl || !bannerPublicUrl)
      throw new Error("Could not get public URLs for files.");

    // 4. Create all related DB records in a transaction
    await prisma.$transaction(async (tx) => {
      await tx.user.update({ where: { id: createdUser!.id }, data: { phone } });
      const newProvider = await tx.healthProvider.create({
        data: {
          userId: createdUser!.id,
          businessName: providerData.businessName,
          providerType: providerData.providerType,
          businessPhone: providerData.businessPhone,
          businessEmail: providerData.businessEmail,
          address: providerData.address,
          city: providerData.city,
          province: providerData.province,
          zipCode: providerData.zipCode,
          latitude: providerData.latitude,
          longitude: providerData.longitude,
          status: "PENDING",
          images: [bannerPublicUrl],
        },
      });
      await tx.document.create({
        data: {
          providerId: newProvider.id,
          type: "BUSINESS_PERMIT",
          identifier: providerData.permitNumber,
          imageUrl: documentPublicUrl,
          status: "PENDING",
        },
      });
      await tx.service.createMany({
        data: providerData.services.map((service: any) => ({
          providerId: newProvider.id,
          ...service,
        })),
      });
      await tx.operatingSchedule.createMany({
        data: providerData.operatingSchedule.map((schedule: any) => ({
          providerId: newProvider.id,
          ...schedule,
        })),
      });
    });

    return {
      success: true,
      message: "Registration successful! Your profile is pending review.",
    };
  } catch (error) {
    console.error("REGISTRATION FAILURE:", error);

    // --- CLEANUP ON FAILURE ---
    if (uploadedFilePaths.length > 0) {
      const { data, error: removeError } = await supabase.storage
        .from("provider-documents")
        .remove(uploadedFilePaths);
      if (removeError)
        console.error("Failed to cleanup Supabase files:", removeError.message);
    }
    if (createdUser) {
      await prisma.user
        .delete({ where: { id: createdUser.id } })
        .catch((e) => console.error("Failed to delete orphaned user", e));
    }
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return { success: false, message: errorMessage };
  }
}
