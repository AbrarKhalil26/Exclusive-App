export const formState = {
  success: false,
  error: {
    name: [],
    email: [],
    password: [],
    rePassword: [],
    phone: [],
  },
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
