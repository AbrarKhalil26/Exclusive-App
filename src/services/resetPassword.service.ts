"use server";
import { resetPasswordFormSchema } from "@/schema/resetPass.schema";
import { resetPassStateType } from "@/types/resetPass.type";

export async function handleResetPassword(formState: resetPassStateType, formData: FormData) {
  const formValues = {
    email: formData.get("email"),
    newPassword: formData.get("newPassword"),
  };

  const parsedData = resetPasswordFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
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
        error: {},
        message: data?.message,
      };
    }
    return{
      success: true,
      error: {},
      message: data?.message,
    }
  } catch (error) {
    console.log(error);
  }
}
