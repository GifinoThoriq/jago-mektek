import connectDb from "@/app/_lib/connect-db";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/_models/User";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connectDb();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
