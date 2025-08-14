import Image from "next/image";

import pli from "../types/pli";

import DigCount from "./Digcount";

import { playArt } from "@/assets/images";

export default function DiggingPli(playlist: pli) {
  return (
    <div className="flex-low mb-[20px] flex h-[70px] w-full gap-[16px] last:mb-[0px]">
      {/* 앨범아트 */}
      <div className="r-16px h-[70px] w-[70px]">
        <Image
          src={playlist.pliCoverUrl || playArt}
          alt={playlist.title}
          width={70}
          height={70}
          style={{ borderRadius: "16px" }}
        />
      </div>

      <div className="flex h-[69px] flex-1 flex-col gap-[4px]">
        <div className="text-gray-80 font-pretendard line-clamp-2 h-[47px] w-full text-[14px] leading-[22px] font-semibold tracking-[-0.02em]">
          {playlist.title}
        </div>
        <div className="flex h-[18px] w-full flex-row justify-between">
          <div className="font-pretendard h-full text-[12px] leading-[100%] text-gray-50">{playlist.nickName}</div>
          <div className="radious-[4px] flex h-full flex-row gap-[2px]">
            <DigCount
              count={playlist.shareCount}
              iconName="share"
            />
            <DigCount
              count={playlist.digCount}
              iconName="share"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
