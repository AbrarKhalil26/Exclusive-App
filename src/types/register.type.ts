export const formState = {
  success: false,
  error: {},
  message: null,
};

export type formStateType = {
  success: boolean;
  error: {
    name: string[];
    email: string[];
    password: string[];
    rePassword: string[];
    phone: string[];
  };
  message: string | null;
};
