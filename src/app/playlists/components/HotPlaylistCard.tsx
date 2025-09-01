"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import PopularPlaylist from "../types/popularPlaylist";

import DigCount from "./Digcount";

import { playArt } from "@/assets/images";

export default function HotPlaylistCard({
  id,
  title,
  digCount,
  shareCount,
  coverImageUrl,
  dominantColor,
  textColor,
}: PopularPlaylist) {
  const router = useRouter();

  function handleClick(coverArtId: number) {
    router.push(`/detail/${coverArtId}`); // 해당 플레이리스트로 이동
  }

  return (
    <button
      className="relative h-[226px] w-[190px]"
      onClick={() => handleClick(id)}
    >
      <div className="h-[226px] w-[190px]">
        <div className="relative h-[190px] w-[190px]">
          <Image
            src={coverImageUrl ?? playArt}
            alt={`${title}의 썸네일`}
            layout="fill"
            objectFit="cover"
            className="rounded-t-[16px]"
            unoptimized
          />
        </div>
        <div
          className={`absolute top-[120px] h-[106px] w-[190px] rounded-b-[16px]`}
          style={{
            background: `linear-gradient(to top, ${dominantColor ?? "#fcc003"} 70%, transparent 100%)`,
          }}
        >
          <div className="absolute top-[24px] left-[10px] flex h-[72px] w-[170px] flex-col gap-[6px]">
            <div
              className={`line-clamp-2 h-[40px] w-[170px] text-left text-[16px] leading-[20px] font-[700] ${
                title.length <= 20 ? "flex items-center" : ""
              }`}
              style={{ color: textColor ?? "#000000" }}
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
    </button>
  );
}
