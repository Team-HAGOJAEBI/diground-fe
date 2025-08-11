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
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {},
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "kakao" && profile) {
        // 카카오에서 email을 제공하지 않는 경우 기본값 설정
        if (!user.email) {
          user.email = `kakao_${profile.id}@diground.local`;
        }
      }

      return true;
    },
  },
});
