"use client";

import { useEffect, useState } from "react";

import { SessionProvider } from "next-auth/react";

import { AuthProvider } from "./context/AuthContext";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_MSW_MODE === "true"
    ) {
      const initMocks = async () => {
        try {
          const { worker } = await import("../mocks/browser");

          await worker.start({
            onUnhandledRequest: "bypass",
          });

          setIsInitialized(true);
        } catch (error) {
          console.error("MSW 초기화 실패:", error);
          setIsInitialized(true);
        }
      };

      initMocks();
    } else {
      setIsInitialized(true);
    }
  }, []);

  if (!isInitialized) {
    return null;
  }

  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
}
