"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import "../assets/styles/globals.css";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    // 로딩이 완료된 후에만 리다이렉트
    if (status !== "loading") {
      // 로그인 여부와 상관없이 /playlists로 리디렉트
      router.replace("/playlists");
    }
  }, [status, router]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center text-center text-gray-100">
      <div>
        <p>로그인 전!!! 냅다 로그인하세요!</p>
        <button onClick={() => router.push("/signin")}>로그인 하러 가기</button>
      </div>

  );
}
