"use client";

import { useState } from "react";

import Icon from "./icon/Icon";

interface FooterProps {
  selectedIndex: number;
}

const FOOTER_MENU = {
  home: "홈",
  create: "생성",
  search: "탐색",
  more: "더보기",
};

export default function Footer({ selectedIndex }: FooterProps) {
  const [current, setCurrent] = useState(selectedIndex);

  const handleOnClick = (currentIndex: number) => {
    setCurrent(currentIndex);
  };

  return (
    <div className="flex h-[89px] w-[inherit] bg-gray-10 py-[8px_32px] px-[20px] border-t border-gray-30">
      {Object.entries(FOOTER_MENU).map(([key, menu], idx) => {
        return (
          <div
            key={key + idx}
            className="flex flex-col gap-[4px] px-[22px] py-[6px] items-center m-auto hover:cursor-pointer"
            onClick={() => handleOnClick(idx)}
          >
            <Icon
              name={key as keyof typeof FOOTER_MENU}
              // 📑 추후 기획자에게 문의 해봐야 함. 현재는 클릭 이벤트가 다 존재한다고 생각하고 함.
              className={`w-[30px] h-[30px] ${current === idx ? "text-[#FFE11D]" : "text-[#9F9F9F]"}`}
            />
            <span className={`${current === idx ? "text-gray-100" : "text-gray-50"} text-[11px]`}>{menu}</span>
          </div>
        );
      })}
    </div>
  );
}
