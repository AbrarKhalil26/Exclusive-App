export const addressFormState = {
  success: false,
  error: {
    cardId: [],
    details: [],
    city: [],
    phone: [],
  },
  message: null,
  callbackUrl: "",
};

export type addressFormStateType = {
  success: boolean;
  error: {
    cartId?: string[];
    details?: string[];
    city?: string[];
    phone?: string[];
  };
  message: string | null;
  callbackUrl?: string;
};
