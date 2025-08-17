import HotPliCard from "./HotPliCard";

import { popularPlayList } from "@/mocks/sample/Playlists";

export default function PopularPlaylists({ className }: { className?: string }) {
  return (
    <div>
      <div
        id="지금_인기있는_플레이리스트"
        className={`${className} flex h-[47px] w-full flex-col gap-[7px] pl-[20px]`}
      >
        <div className="h-[24px] text-[20px] leading-[100%] font-bold tracking-[0%] text-gray-100">
          지금 인기있는 플레이리스트
        </div>
        <div className="text-gray-70 text-[13px] font-[400]">DIGROUND 유저들이 많이 듣고 있는 플레이리스트에요.</div>
      </div>

      <div
        id="poularPlayListContainer"
        className="fixed top-[141px] h-[226px] w-full overflow-hidden"
      >
        <div
          id="popularPlayListDiv1"
          className="scrollbar-none inline-flex h-full w-full gap-[16px] overflow-x-auto p-[0_20px]"
        >
          {popularPlayList.map((playlist) => (
            <HotPliCard
              key={playlist.id}
              title={playlist.title}
              digCount={playlist.digCount}
              shareCount={playlist.shareCount}
              pliArt={{ id: playlist.id, url: playlist.url, dominantColor: playlist.dominantColor }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
