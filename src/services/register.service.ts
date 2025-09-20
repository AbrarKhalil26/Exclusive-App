"use server";

import { registerFormSchema } from "@/schema/register.schema";
import { formStateType } from "@/types/register.type";

export async function handleRegister(
  formState: formStateType,
  formData: FormData
): Promise<formStateType> {
  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
    phone: formData.get("phone"),
  };

  const parsedData = registerFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    const fieldErrors = parsedData.error.flatten().fieldErrors;
    return {
      success: false,
      error: {
        name: fieldErrors.name ?? [],
        email: fieldErrors.email ?? [],
        password: fieldErrors.password ?? [],
        rePassword: fieldErrors.rePassword ?? [],
        phone: fieldErrors.phone ?? [],
      },
      message: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signup`,
      {
        method: "POST",
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
        error: {
          name: [],
          email: [],
          password: [],
          rePassword: [],
          phone: [],
        },
        message: data?.message,
      };
    }
    return {
      success: true,
      error: {
        name: [],
        email: [],
        password: [],
        rePassword: [],
        phone: [],
      },
      message: data?.message,
    };
  } catch (error) {
    return {
      success: true,
      error: {
        name: [],
        email: [],
        password: [],
        rePassword: [],
        phone: [],
      },
      message: (error as string) || "Something went wrong",
    };
  }
}
