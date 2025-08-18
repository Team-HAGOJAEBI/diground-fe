"use client";
import { useRef } from "react";

import Header from "./components/Header";
import MyDiggingList from "./components/MyDiggingList";
import PopularPlaylists from "./components/PopularPlaylists";

import NoPlaylists from "@/app/playlists/components/NoPlaylists";
import useHeaderAnimation from "@/hooks/useHeaderAnimation";
import { Playlists } from "@/mocks/sample/Playlists";

export default function PlaylistsPage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrolling } = useHeaderAnimation(scrollRef);

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
        id="playlists_hotpli"
        className="mb-[23px] h-[289px] overflow-hidden pl-[20px]"
        style={{ zIndex: 100 }}
      >
        <PopularPlaylists className="w-full" />
      </div>

      <div
        id="playlists_mypli"
        className={`flex-1 ${scrolling ? "scrolling pr-[12px] pl-[20px]" : "scrollbar-none px-[20px]"}`}
      >
        {Playlists.length === 0 ? <NoPlaylists /> : <MyDiggingList playlists={Playlists} />}
      </div>
    </div>
  );
}
