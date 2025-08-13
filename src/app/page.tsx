"use client";

import { useRouter } from "next/navigation";

import "../assets/styles/globals.css";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center text-center text-gray-100">
      <div>
        <p>로그인 전!!! 냅다 로그인하세요!</p>
        <button onClick={() => router.push("/signin")}>로그인 하러 가기</button>
      </div>
    </div>
  );
}
