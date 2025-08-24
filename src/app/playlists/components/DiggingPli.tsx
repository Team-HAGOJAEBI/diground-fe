import Image from "next/image";
import { useRouter } from "next/navigation";

import playlist from "../types/playlist";

import DigCount from "./Digcount";

import { playArt } from "@/assets/images";

export default function DiggingPli(playlist: playlist) {
  const router = useRouter();

  function handleClick(playlistId: number) {
    router.push(`/detail?id=${playlistId}`); // 해당 플레이리스트로 이동
  }

  return (
    <button
      className="flex h-[70px] w-full gap-[16px] last:mb-[0px]"
      onClick={() => handleClick(playlist.id)}
    >
      {/* 앨범아트 */}
      <div className="r-16px h-[70px] w-[70px]">
        <Image
          src={playlist.coverImageUrl || playArt}
          alt={playlist.title}
          width={70}
          height={70}
          style={{ borderRadius: "16px" }}
        />
      </div>

      <div className="flex h-[69px] flex-1 flex-col gap-[4px]">
        <div className="text-gray-80 font-pretendard line-clamp-2 flex h-[47px] w-full items-center text-left text-[14px] leading-[22px] font-semibold tracking-[-0.02em]">
          {playlist.title}
        </div>
        <div className="flex h-[18px] w-full flex-row justify-between">
          <div className="font-pretendard h-full text-[12px] leading-[100%] text-gray-50">{playlist.nickName}</div>
          <div className="flex h-full flex-row gap-[2px]">
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
    </button>
  );
}
