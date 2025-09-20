"use server";
import { forgetPassStateType } from "@/types/forgetPass.type";

export async function handleForgetPassword(
  formState: forgetPassStateType,
  formData: FormData
) : Promise<forgetPassStateType>{
  const email = formData.get("email") as string | null;
  const verifyCode = formData.get("verifyCode") as string | null;

  try {
    const endpoint = verifyCode ? `verifyResetCode` : `forgotPasswords`;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          verifyCode ? { resetCode: verifyCode } : { email }
        ),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: { email: [], verifyCode: [] },
        message: data?.message,
      };
    }
    return {
      success: true,
      error: { email: [], verifyCode: [] },
      message: data?.message,
    };
  } catch (error) {
    return {
        success: false,
        error: { email: [], verifyCode: [] },
        message: error as string,
      };
  }
}
