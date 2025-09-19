export const formState = {
  success: false,
  error: {
    email: [],
    newPassword: [],
  },
  message: null,
};

export type resetPassStateType = {
  success: boolean;
  error: {
    email: string[];
    newPassword: string[],
  };
  message: string | null;
};