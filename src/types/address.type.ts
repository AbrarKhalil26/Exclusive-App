export const addressFormState = {
  success: false,
  error: {
    cardId: [],
    details: [],
    city: [],
    phone: [],
    paymentMethod: [],
  },
  message: null,
  callbackUrl: "",
  paymentMethod: undefined,
};

export type addressFormStateType = {
  success: boolean;
  error: {
    cartId?: string[];
    details?: string[];
    city?: string[];
    phone?: string[];
    paymentMethod?: string[]; 
  };
  message: string | null;
  paymentMethod?: "cash" | "card";
  callbackUrl?: string;
};
