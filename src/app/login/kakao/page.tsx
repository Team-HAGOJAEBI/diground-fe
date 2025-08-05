"use client";

import { useEffect, useRef } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function KakaoLogin() {
  const router = useRouter();
  const called = useRef(false);

  useEffect(() => {
    // 0. 중복 호출 가드
    if (called.current) return;
    called.current = true;

    // 1. 인가 코드 추출
    const AuthCode = new URL(window.location.href).searchParams.get("code");

    if (!AuthCode) return;

    // 2. 토큰 발급
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY as string,
      redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI as string,
      code: AuthCode,
    });

    axios
      .post("https://kauth.kakao.com/oauth/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        sessionStorage.setItem("tokenInfo", JSON.stringify(res.data));

        // 3. 유저 정보 조회
        axios
          .get("https://kapi.kakao.com/v2/user/me", {
            headers: {
              "Authorization": `Bearer ${res.data.access_token}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then((response) => {
            sessionStorage.setItem("user", JSON.stringify(response.data));
            router.replace("/");
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, [router]);

  return <div className="text-3xl text-gray-100"> 인가 완료! 이제 넘어갈거얌!</div>;
}
