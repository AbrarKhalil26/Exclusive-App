import { z } from "zod";

export const resetPasswordFormSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
  newPassword: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters long."),
});

export type ResetPasswordFormPayload = z.infer<typeof resetPasswordFormSchema>;
