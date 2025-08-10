import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  useSecureCookies: process.env.Node_ENV === "production",
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {},
  callbacks: {},
});
