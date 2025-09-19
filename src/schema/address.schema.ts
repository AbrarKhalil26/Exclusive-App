import { z } from "zod";

export const addressFormSchema = z.object({
  cartId: z.string().nonempty({ message: "Address is required." }),
  details: z
    .string()
    .nonempty({ message: "Address is required." })
    .min(3, "Address must be at least characters long."),
  city: z
    .string()
    .nonempty({ message: "Address is required." })
    .min(3, "Address must be at least characters long."),
  phone: z
    .string()
    .nonempty({ message: "Phone is required." })
    .regex(/^(002|\+2)?01[0125][0-9]{8}$/, {
      message: "Invalid egyptian phone number",
    }),
    paymentMethod: z.enum(['cash', 'card'])
});

export type AddressFormPayload = z.infer<typeof addressFormSchema>;
