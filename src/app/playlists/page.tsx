"use client";
import { useRef } from "react";

import Header from "./components/header";
import MyDiggingList from "./components/MyDiggingList";
import PopularPlaylists from "./components/PopularPlaylists";

import NoPlaylists from "@/app/playlists/components/NoPlaylists";
import useHeaderAnimation from "@/hooks/useHeaderAnimation";
import { Playlists } from "@/mocks/sample/Playlists";

export default function PlaylistsPage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { style: headerStyle, scrolling } = useHeaderAnimation(scrollRef, {
    headerMaxHeight: 326,
    headerMinHeight: 60,
  });

  return (
    <div
      id="playlists"
      className="relative h-screen overflow-hidden"
    >
      <Header />
      <div className="mt-[68px]">
        <div
          id="playlists_no_scroll_Y"
          style={{ ...headerStyle, position: "fixed", top: 0, left: 0 }}
          className="z-10 w-full transition-all duration-200"
        >
          <PopularPlaylists className="absolute fixed top-[78px]" />
        </div>

        <div
          ref={scrollRef}
          id="poularPlayListContainer"
          className={`custom-scrollbar overflow-y-auto pb-[89px] ${scrolling ? "scrolling" : ""}`}
          style={{ paddingTop: headerStyle.height, height: "100vh" }}
        >
          <div
            id="playlists"
            className="w-full"
            style={{ minHeight: "calc(100vh - 89px)", zIndex: 50, position: "relative" }}
          >
            {Playlists.length === 0 ? <NoPlaylists /> : <MyDiggingList playlists={Playlists} />}
          </div>
        </div>
      </div>
    </div>
  );
}
