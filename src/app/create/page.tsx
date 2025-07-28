"use client";

import { useState } from "react";

import CommonInput from "@/app/create/components/CommonInput";

export default function Page() {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const getValueError = () => {
    if (!link) return "링크를 복사하여 입력해주세요";

    return "";
  };

  return (
    <div className="bg-gray-100 flex justify-center w-full">
      <div className="bg-gray-5 w-[360px] h-[1422px] relative">
        <div className="flex flex-col w-full h-full items-start gap-[7px] pt-[50px] px-[20px]">
          <h1 className="relative self-stretch font-bold text-gray-100 text-[28px] tracking-[0] leading-[normal] pb-[32px]">
            플레이리스트 만들기
          </h1>
          <CommonInput
            label="플렛폼 링크"
            required
            placeholder="유튜브 링크를 한번 넣어볼까나"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            errorMessage={getValueError()}
          />
          <CommonInput
            label="제목"
            placeholder="플레이리스트 제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <CommonInput
            label="설명"
            placeholder="선택사항입니다."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            textarea
          />
        </div>
      </div>
    </div>
  );
}
