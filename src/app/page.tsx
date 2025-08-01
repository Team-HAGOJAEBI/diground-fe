"use client";

import { useRouter } from "next/navigation";
import "../assets/styles/globals.css";

export default function Home() {
  const router = useRouter();

  const mainMessage = "아직 로그인 전....";

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center text-gray-100">
      <p>{mainMessage}</p>
      <button onClick={() => router.push("/login")}>로그인 하러 가기</button>
    </div>
  );
}
