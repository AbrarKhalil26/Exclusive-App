"use server";
import { resetPasswordFormSchema } from "@/schema/resetPass.schema";
import { resetPassStateType } from "@/types/resetPass.type";

export async function handleResetPassword(
  formState: resetPassStateType,
  formData: FormData
): Promise<resetPassStateType> {
  const formValues = {
    email: formData.get("email"),
    newPassword: formData.get("newPassword"),
  };

  const parsedData = resetPasswordFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    const fieldErrors = parsedData.error.flatten().fieldErrors;
    return {
      success: false,
      error: {
        email: fieldErrors.email ?? [],
        newPassword: fieldErrors.newPassword ?? [],
      },
      message: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: { email: [], newPassword: [] },
        message: data?.message,
      };
    }
    return {
      success: true,
      error: { email: [], newPassword: [] },
      message: data?.message,
    };
  } catch (error) {
    return {
      success: true,
      error: { email: [], newPassword: [] },
      message: (error as string) || "Something went wrong",
    };
  }
}
