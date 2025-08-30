"use client";
import { useEffect, useRef, useState } from "react";

import { getMyPlaylists } from "./api/playListsApi";
import Header from "./components/Header";
import MyDiggingList from "./components/MyDiggingList";
import PopularPlaylists from "./components/PopularPlaylists";
import playlist from "./types/playlist";

import NoPlaylists from "@/app/playlists/components/NoPlaylists";
import useHeaderAnimation from "@/hooks/useHeaderAnimation";

function usePlaylistsData() {
  const [playlists, setPlaylists] = useState<playlist[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const { data } = await getMyPlaylists();

      setPlaylists(data);
    };

    fetchPlaylists();
  }, []);

  return { playlists } as const;
}

export default function PlaylistsPage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrolling } = useHeaderAnimation(scrollRef);

  const { playlists } = usePlaylistsData();

  return (
    <div
      ref={scrollRef}
      id="playlists"
      className={`custom-scrollbar h-screen overflow-y-auto ${scrolling ? "scrolling" : "scrollbar-none"}`}
    >
      <div
        id="playlists_header"
        className="relative mb-[23px] h-[55px] pt-[20px] pl-[20px]"
      >
        <Header />
      </div>

      <div
        id="playlists_hotPlaylist"
        className="mb-[23px] h-[289px] overflow-hidden pl-[20px]"
        style={{ zIndex: 100 }}
      >
        <PopularPlaylists className="w-full" />
      </div>

      <div
        id="playlists_myplaylists"
        className={`flex-1 ${scrolling ? "scrolling pr-[12px] pl-[20px]" : "scrollbar-none px-[20px]"}`}
      >
        {playlists.length === 0 ? <NoPlaylists /> : <MyDiggingList playlists={playlists} />}
      </div>
    </div>
  );
}
