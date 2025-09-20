import { z } from "zod";

export const updateUserFormSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Name is required." })
      .min(3, "Name must be at least characters long."),
    email: z.email({ message: "Please enter a valid email address." }),
    phone: z
      .string()
      .nonempty({ message: "Phone is required." })
      .regex(/^01[0125][0-9]{8}$/, {
        message: "Invalid phone number",
      }),
  })

export type UpdateUserFormPayload = z.infer<typeof updateUserFormSchema>;


export const updatePasswordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty({ message: "Password is required." })
      .min(6, "Password must be at least 6 characters long."),
    password: z
      .string()
      .nonempty({ message: "Password is required." })
      .min(6, "Password must be at least 6 characters long."),
    rePassword: z
      .string()
      .nonempty({ message: "Password is required." })
      .min(6, "Password must be at least 6 characters long."),
  }).refine((data) => data.password === data.rePassword, {
    message: "Password do not match",
    path: ["rePassword"],
  });

export type UpdatePasswordFormPayload = z.infer<typeof updatePasswordFormSchema>;
