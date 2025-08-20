"use client";

import { useEffect, useState } from "react";

import { SessionProvider } from "next-auth/react";

import { AuthProvider } from "./context/AuthContext";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      const initMocks = async () => {
        const { worker } = await import("../mocks/browser");

        await worker.start({
          onUnhandledRequest: (req) => {
            // auth API는 MSW가 가로채지 않도록 함
            if (req.url.includes("/api/auth")) {
              return;
            }
          },
        });

        setIsInitialized(true);
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
