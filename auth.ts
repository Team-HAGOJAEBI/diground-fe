import * as jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import KakaoProvider from "next-auth/providers/kakao";

import { CustomPrismaAdapter } from "./lib/custom-prisma-adapter";
import { prisma } from "./prisma";

import { getMockUser, updateMockUser } from "@/mocks/sample/Prisma-mock";

export const { handlers, auth, signIn, signOut } = NextAuth({
  useSecureCookies: process.env.NODE_ENV === "production",
  trustHost: true,
  adapter: process.env.NEXT_PUBLIC_MSW_MODE === "true" ? undefined : CustomPrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  experimental: {
    enableWebAuthn: false,
  },
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    encode: async ({ token, secret }) => {
      // Mock 모드에서는 단순한 토큰 생성
      if (process.env.NEXT_PUBLIC_MSW_MODE === "true") {
        try {
          const jsonString = JSON.stringify(token);
          const utf8Bytes = new TextEncoder().encode(jsonString);
          const base64String = btoa(String.fromCharCode(...utf8Bytes));

          return `mock.${base64String}.signature`;
        } catch (error) {
          console.error("Token encoding failed:", error);

          return "mock.eyJzdWIiOiLtlZjqs6Dst53g66qo7YG5IOychOyggCIsImVtYWlsIjoidGVzdEBkaWdyb3VuZC5sb2NhbCJ9.signature";
        }
      }

      return jwt.sign(token as jwt.JwtPayload, secret as string);
    },
    decode: async ({ token, secret }) => {
      // Mock 모드
      if (process.env.NEXT_PUBLIC_MSW_MODE === "true") {
        const mockUser = getMockUser();

        if (!token) {
          return {
            sub: mockUser.id,
            email: mockUser.email,
          } as JWT;
        }

        return { sub: mockUser.id, email: mockUser.email } as JWT;
      }

      return jwt.verify(token as string, secret as string) as JWT;
    },
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Mock 모드일 때 - 업데이트된 Mock 데이터 사용
      if (process.env.NEXT_PUBLIC_MSW_MODE === "true") {
        const mockUser = getMockUser();

        return {
          sub: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          picture: mockUser.image,
        };
      }

      // 실제 로그인 시
      if (account && user) {
        token.sub = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      // Mock 모드일 때
      if (token.sub) {
        session.user.id = token.sub;
        session.user.email = token.email || "";
        session.user.image = token.picture;
        session.user.name = token.name;
      }

      return session;
    },

    async signIn({ user, account, profile }) {
      // Mock 모드일 때는 별도 처리 없이 바로 로그인 허용
      if (process.env.NEXT_PUBLIC_MSW_MODE === "true") {
        const mockName = user?.name ? `${user.name}_${account?.provider}_모킹유저` : "모킹유저";

        updateMockUser({
          id: `mock_user_${Date.now()}`,
          name: mockName,
          email: user?.email || "mock@diground.local",
          image:
            "https://cdnimg.melon.co.kr/cm2/photo/images/000/802/83/025/80283025_20241216144433_org.jpg/melon/quality/80/optimize",
        });

        return true;
      }

      // 실제 모드에서만 OAuth 처리
      if (account?.provider === "kakao" && profile) {
        if (!user.email) {
          user.email = `kakao_${profile.id}@diground.local`;
        }
      }

      return true;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/playlists`;
    },
  },
});
