"use client";

import { createContext, useEffect, ReactNode } from "react";

import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  session: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 보호된 라우트 목록
const PROTECTED_ROUTES = ["/playlists", "/detail", "/create", "/settings", "/more"];

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isLoading = status === "loading";
  const isAuthenticated = !!session;

  // 현재 경로가 보호된 라우트인지 확인
  const requiresAuth = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  useEffect(() => {
    if (requiresAuth && !isLoading && !isAuthenticated) {
      router.push("/signin");
    }
  }, [requiresAuth, isLoading, isAuthenticated, router, pathname]);

  // 보호된 페이지에서 로딩 중이거나 인증되지 않은 경우
  if (requiresAuth && (isLoading || !isAuthenticated)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mt-2 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    session: session,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
