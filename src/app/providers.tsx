"use client";

import { useEffect, useState } from "react";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      const initMocks = async () => {
        const { worker } = await import("../mocks/browser");
        await worker.start({
          onUnhandledRequest: "warn",
        });
        console.log("MSW Worker 정상 시작됨!");
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

  return <>{children}</>;
}
