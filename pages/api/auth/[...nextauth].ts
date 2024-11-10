import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userService } from "services/UserService";
import connectMongoDB from "utils/mongodb";

export default async function auth(req:any, res:any) {
  await connectMongoDB();

  return NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        id: "credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials) throw new Error("No credentials provided.");

          const { email, password } = credentials;
          const user = await userService.signInCredentials(email, password);

          console.log("USER ::: " , user);

          if (!user) throw new Error("Invalid email or password.");

          return user;
        },
      }),
    ],
    pages: { signIn: "/signin" },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.role = user.role;
          token.id = user.id;
          console.log('JWT Callback:', token);
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.role = token.role;
          session.user.id = token.id;
          console.log('Session Callback:', session)
        }
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
  });
}
