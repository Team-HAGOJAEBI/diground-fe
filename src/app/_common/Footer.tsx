"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Icon from "./icon/Icon";

interface FooterProps {
  selectedIndex: number;
}

const FOOTER_MENU = {
  home: { label: "홈", url: "/playlists" },
  create: { label: "생성", url: "/create" },
  search: { label: "탐색", url: "/search" },
  more: { label: "더보기", url: "/more" },
};

export default function Footer({ selectedIndex }: FooterProps) {
  const router = useRouter();
  const [current, setCurrent] = useState(selectedIndex);

  const handleOnClick = (currentIndex: number) => {
    setCurrent(currentIndex);
    const menuKey = Object.keys(FOOTER_MENU)[currentIndex];
    const targetUrl = FOOTER_MENU[menuKey as keyof typeof FOOTER_MENU].url;

    router.push(targetUrl); // 각 메뉴의 url로 이동
  };

  return (
    <div className="bg-gray-10 border-gray-30 fixed bottom-0 left-0 flex h-[89px] w-[100vw] border-t px-[20px] py-[8px_32px]">
      {Object.entries(FOOTER_MENU).map(([key, menu], idx) => {
        return (
          <div
            key={key + idx}
            className="m-auto flex flex-col items-center gap-[4px] px-[22px] py-[6px] hover:cursor-pointer"
            onClick={() => handleOnClick(idx)}
          >
            <Icon
              name={key as keyof typeof FOOTER_MENU}
              className={`h-[30px] w-[30px] ${current === idx ? "text-[#FFE11D]" : "text-[#9F9F9F]"}`}
            />
            <span className={`${current === idx ? "text-gray-100" : "text-gray-50"} text-[11px]`}>{menu.label}</span>
          </div>
        );
      })}
    </div>
  );
}
