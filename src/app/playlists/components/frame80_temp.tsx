"use client";

import Image from "next/image";
import { readableColor } from "polished";

import DigCount from "./Digcount_temp";

import { playArt } from "@/assets/images";

export default function Frame80({
  title,
  digCount,
  shareCount,
  pliArt,
}: {
  title: string;
  digCount: string;
  shareCount: string;
  pliArt: { id: number; url: string; dominantColor: string };
}) {
  const textColor = readableColor(pliArt.dominantColor); // 도미넌트 컬러에 따라 텍스트 색상 결정

  return (
    <div className="relative h-[226px] w-[190px]">
      <div className="relative h-[190px] w-[190px]">
        <Image
          src={playArt}
          alt={`${title}의 썸네일`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-[16px]"
        />
      </div>
      <div
        className={`absolute top-[120px] h-[106px] w-[190px] rounded-b-[16px]`}
        style={{
          background: `linear-gradient(to top, ${pliArt.dominantColor} 70%, transparent 100%)`,
        }}
      >
        <div className="absolute top-[24px] left-[10px] flex h-[72px] w-[170px] flex-col gap-[6px]">
          <div
            className={`line-clamp-2 h-[40px] w-[170px] text-[16px] leading-[20px] font-[700] ${
              title.length <= 20 ? "flex items-center" : ""
            }`}
            style={{ color: textColor }}
          >
            {title}
          </div>
        </div>
      </div>

      <div className="bg-gray-10 absolute bottom-[10px] left-[10px] mb-[1px] flex h-[26px] w-auto items-center justify-center rounded-[28px] p-[4px_8px_4px_6px]">
        <DigCount
          count={digCount}
          iconName={"share"}
        />
        <DigCount
          count={shareCount}
          iconName={"share"}
        />
      </div>
    </div>
  );
}
