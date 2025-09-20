import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          name: "email",
          type: "email",
          placeholder: "email@gmail.com",
        },
        password: {
          name: "password",
          type: "password",
          placeholder: "**********",
        },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(
            `${process.env.API_BASE_URL}/api/v1/auth/signin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message);
          }
          const decoded = JSON.parse(atob(data.token.split(".")[1]));
          return {
            id: decoded.id,
            user: data.user,
            token: data.token,
          };
        } catch (err) {
          throw new Error((err as Error).message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      if (trigger === "update" && session) {
        token.user = { ...(token.user ?? {}), ...session };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
