"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { User } from "@/mocks/sample/User";

import "../assets/styles/globals.css";

export default function Home() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<User | null>(null);

  // 📑 임시
  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");

    if (sessionUser) {
      const { profile } = JSON.parse(sessionUser).kakao_account;

      setUserInfo(profile);
    } else {
      setUserInfo(null);
    }
  }, []);

  const logoutWithKakao = () => {
    const { access_token } = JSON.parse(sessionStorage.getItem("tokenInfo") || "{}");

    axios
      .post(
        "https://kapi.kakao.com/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(() => {
        alert("로그아웃 성공!");
        sessionStorage.removeItem("tokenInfo");
        sessionStorage.removeItem("user");
        router.replace("/login");
      });
  };

  const userProfile = (user: User | null) => {
    if (!user) {
      return (
        <div>
          <p>로그인 전!!! 냅다 로그인하세요!</p>
          <button onClick={() => router.push("/login")}>로그인 하러 가기</button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-2">
        {user.profileImageUrl ? (
          <Image
            src={user.profileImageUrl}
            alt="profile"
            width={100}
            height={100}
          />
        ) : null}
        <p className="text-center">{user.nickname}님, 안녕하세요</p>
        <button onClick={logoutWithKakao}>로그아웃</button>
      </div>
    );
  };
  // 임시 끝

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center text-center text-gray-100">
      {userProfile(userInfo)}
    </div>
  );
}
