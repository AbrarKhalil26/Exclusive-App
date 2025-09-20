import { getUserToken } from "@/lib/server.utils";
import { updatePasswordFormSchema, updateUserFormSchema } from "@/schema/profile.schema";

export const formState = {
  success: false,
  error: { name: [], email: [], phone: [] },
  message: null,
};
export type updateUserStateType = {
  success: boolean;
  error: {
    name?: string[];
    email?: string[];
    phone?: string[];
  };
  message: string | null;
};

export const updatePasswordFormState = {
  success: false,
  error: { currentPassword: [], password: [], rePassword: [] },
  message: null,
};
export type updatePasswordStateType = {
  success: boolean;
  error: {
    currentPassword?: string[];
    password?: string[];
    rePassword?: string[];
  };
  message: string | null;
};

export async function UpdateUser(
  formState: updateUserStateType,
  formData: FormData
) : Promise<updateUserStateType> {
  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  const parsedData = updateUserFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/updateMe/`,
      {
        method: "PUT",
        headers: {
          token: token as string,
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
    return {
      success: true,
      error: {},
      message: data?.message,
    };
  } catch (error) {
    return {
      success: true,
      error: {},
      message: (error as string),
    };
  }
}

export async function UpdatePassword(
  formState: updatePasswordStateType,
  formData: FormData
) : Promise<updatePasswordStateType> {
  const formValues = {
    currentPassword: formData.get("currentPassword"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
  };

  const parsedData = updatePasswordFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      message: null,
    };
  }
  

  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/changeMyPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
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
    return {
      success: true,
      error: {},
      message: data?.message,
    };
  } catch (error) {
    return {
      success: true,
      error: {},
      message: (error as string) || "Something went wrong",
    };
  }
}
