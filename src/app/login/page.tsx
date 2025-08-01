"use client";

import Image from "next/image";

import Layout from "../_common/Layout";

import { kakaoLogin } from "@/assets/icons";

export default function Login() {
  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      scope: "profile_nickname, profile_image",
      redirectUri: "http://localhost:3000/login/kakao",
    });
  };

  return (
    <Layout className="flex h-[100vh] flex-col items-center justify-center text-center text-gray-100">
      {/* Login Title */}
      <div className="mb-[172px]">
        <p>좋아하는 것을, 더 좋아하도록</p>
        <span>DIGROUND</span>
      </div>

      {/* Login */}
      <div>
        <p>
          간편하게 로그인하고 <br /> 다양한 노래를 DIGGING해 보세요.
        </p>
        <div className="flex">
          <Image
            src={kakaoLogin}
            alt="카카오 로그인"
            onClick={loginWithKakao}
          />
          <div>구글 로그인 하나</div>
        </div>
        <span>로그인 없이 둘러보기</span>
      </div>
    </Layout>
  );
}
