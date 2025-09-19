export const formState = {
  success: false,
  error: {
    email: [],
    verifyCode: [],
  },
  message: null,
};

export type forgetPassStateType = {
  success: boolean;
  error: {
    email: string[];
    verifyCode: string[],
  };
  message: string | null;
};