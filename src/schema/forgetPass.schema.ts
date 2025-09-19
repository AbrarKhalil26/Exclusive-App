import { z } from "zod";

export const forgetPasswordFormSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
  verifyCode: z.string().optional(),
});

export type ForgetPassFormPayload = z.infer<typeof forgetPasswordFormSchema>;
