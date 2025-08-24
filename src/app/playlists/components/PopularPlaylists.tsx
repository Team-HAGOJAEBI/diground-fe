import HotPlaylistCard from "./HotPlaylistCard";

import { popularPlayList } from "@/mocks/sample/Playlists";

export default function PopularPlaylists({ className }: { className?: string }) {
  return (
    <div>
      <div
        id="지금_인기있는_플레이리스트"
        className={`${className} flex h-[47px] w-full flex-col gap-[7px]`}
      >
        <div className="h-[24px] text-[20px] leading-[100%] font-bold tracking-[0%] text-gray-100">
          지금 인기있는 플레이리스트
        </div>
        <div className="text-gray-70 text-[13px] font-[400]">DIGROUND 유저들이 많이 듣고 있는 플레이리스트에요.</div>
      </div>

      <div className="h-[15px] w-full"></div>
      <div
        id="poularPlayListContainer"
        className="relative h-[226px] w-full overflow-hidden"
      >
        <div
          id="popularPlayListDiv1"
          className="scrollbar-none inline-flex h-full w-full gap-[16px] overflow-x-auto"
        >
          {popularPlayList.map((playlist) => (
            <HotPlaylistCard
              key={playlist.id}
              title={playlist.title}
              digCount={playlist.digCount}
              shareCount={playlist.shareCount}
              coverArt={{ id: playlist.id, url: playlist.url, dominantColor: playlist.dominantColor }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
