import { useEffect, useState } from "react";

import { getPopularPlaylists } from "../api/playListsApi";
import PopularPlaylist from "../types/popularPlaylist";

import HotPlaylistCard from "./HotPlaylistCard";

function usePopularPlaylists() {
  const [popularPlayList, setPopularPlayList] = useState<PopularPlaylist[]>([]);

  useEffect(() => {
    const fetchPopularPlaylists = async () => {
      try {
        const { data } = await getPopularPlaylists();

        setPopularPlayList(data);
      } catch (error) {
        console.error("리스트를 불러오는 중 문제가 발생했습니다:", error);
      }
    };

    fetchPopularPlaylists();
  }, []);

  return { popularPlayList } as const;
}

export default function PopularPlaylists({ className }: { className?: string }) {
  const { popularPlayList } = usePopularPlaylists();

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
              id={playlist.id}
              title={playlist.title}
              digCount={playlist.digCount}
              shareCount={playlist.shareCount}
              coverImageUrl={playlist.coverImageUrl}
              textColor={playlist.textColor}
              dominantColor={playlist.dominantColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
