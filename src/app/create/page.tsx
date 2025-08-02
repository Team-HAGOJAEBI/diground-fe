"use client";

import { useState } from "react";

import CommonInput from "@/app/create/components/CommonInput";

import KeywordChip from "@/app/create/components/KeywordChip";

export default function Page() {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const getValueError = () => {
    if (!link) return "링크를 복사하여 입력해주세요";

    return "";
  };

  return (
    <div className="flex w-full justify-center bg-gray-100">
      <div className="bg-gray-5 relative h-[1422px] w-[360px]">
        <div className="flex h-full w-full flex-col items-start gap-[7px] px-[20px] pt-[50px]">
          <h1 className="relative self-stretch pb-[32px] text-[28px] leading-[normal] font-bold tracking-[0] text-gray-100">
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
          <KeywordChip
            keyword={{
              id: "test-1",
              label: "테스트 키워드",
            }}
            isSelected={true}
            // onClick={(keyword) =>() }
            variant="default"
          />
        </div>
      </div>
    </div>
  );
}
