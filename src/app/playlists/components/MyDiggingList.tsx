import React from "react";

import playlist from "../types/playlist";

import DiggingList from "./DiggingList";

import Icon from "@/app/_common/icon/Icon";
import Dropdown from "@/app/_common/Dropdown";

const dropdownList = [
  { text: "최신순", value: "latest" },
  { text: "인기순", value: "popular" },
];

export default function MyDiggingList({ playlists }: { playlists: playlist[] }) {
  const [orderBy, setOrderBy] = React.useState("latest");

  const handleDropdownChange = (value: string) => {
    setOrderBy(value);
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
          className="flex h-[30px] w-[116px] items-center gap-[8px]"
        >
          <Dropdown
            className="h-[30px] w-[78px]"
            droplist={dropdownList}
            selected={orderBy}
            onSelectionChange={handleDropdownChange}
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
        {playlists.map((playlist: playlist) => (
          <DiggingList
            key={playlist.id}
            {...playlist}
          />
        ))}
      </div>
    </div>
  );
}
