import { useState } from "react";

import pli from "../types/pli";

import DiggingPli from "./DiggingPli";

import Dropbox from "@/app/_common/Dropbox";
import Icon from "@/app/_common/icon/Icon";

const dropboxList = [
  { text: "최신순", value: "latest" },
  { text: "인기순", value: "popular" },
];

export default function MyDiggingList({ playlists }: { playlists: pli[] }) {
  const [sortOption, setSortOption] = useState(1); // Start with "인기순" (popular)

  const handleSortChange = (selectedIndex: number) => {
    setSortOption(selectedIndex);
    // Here you could implement actual sorting logic based on the selected index
  };

  return (
    <div
      id="digging-list"
      className="flex w-full flex-col"
    >
      <div
        id="digging-list-header"
        className="bg-gray-5 sticky top-0 z-20 flex h-[62px] w-full justify-between pt-[17px] pb-[12px]"
      >
        <div className="flex items-center text-[20px] leading-[100%] font-bold tracking-[0%] text-gray-100">
          내가 디깅한 플레이리스트
        </div>
        <div
          id="digging-list-filter"
          className="flex h-[30px] w-[104px] items-center gap-[8px]"
        >
          <Dropbox
            className="h-[30px] w-[66px]"
            droplist={dropboxList}
            selected={sortOption}
            onSelectionChange={handleSortChange}
          />
          <div className="flex h-[30px] w-[30px] items-center justify-center">
            <Icon
              className="text-gray-80 h-[20px] w-[20px]"
              name="search"
            />
          </div>
        </div>
      </div>

      <div
        id="digging-list-body"
        className="flex w-full flex-col gap-[20px] pb-[20px]"
      >
        {playlists.map((playlist: pli) => (
          <DiggingPli
            key={playlist.id}
            {...playlist}
          />
        ))}
      </div>
    </div>
  );
}
