"use client";

import { useState } from "react";

import CommonInput from "@/components/CommonInput";

export default function Page() {
  const [value, setValue] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <CommonInput
          label="플랫폼 링크"
          required
          placeholder="유튜브 링크를 한번 넣어볼까나"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={value.length < 1 ? "플랫폼에서 플레이리스트 공유 링크를 복사하여 입력해주세요." : ""}
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
  );
}
