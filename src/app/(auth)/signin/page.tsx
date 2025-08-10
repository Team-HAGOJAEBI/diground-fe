"use client";

import { signIn } from "next-auth/react";

export default function SigninPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        className="bg-yellow-80 rounded px-6 py-3"
        onClick={() => signIn("kakao", { redirectTo: "/detail" })}
      >
        Sign in with KaKao
      </button>
    </div>
  );
}
