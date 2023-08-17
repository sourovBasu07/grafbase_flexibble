import { getServerSession } from "next-auth/next";
import { User } from "next-auth";
// import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { Jwt } from "jsonwebtoken";
import { createUser, getUser } from "./actions";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  jwt: {
    encode: ({ token, secret }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );

      return encodedToken;
    },
    decode: async ({ token, secret }) => {
      const decodedToken = jsonwebtoken.verify(token, secret);

      return decodedToken;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email;

      try {
        const data = await getUser(email);

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error) {
        console.log("Error retrieving us er data", error);
        return session;
      }
    },
    async signIn({ user }) {
      try {
        const userExists = await getUser(user?.email);

        if (!userExists.user) {
          await createUser(user.name, user.email, user.image);
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session;
}
