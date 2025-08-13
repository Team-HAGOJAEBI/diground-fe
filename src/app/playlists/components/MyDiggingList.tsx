import pli from "../types/pli";

import DiggingPli from "./DiggingPli";

import Dropbox from "@/app/_common/Dropbox";
import Icon from "@/app/_common/icon/Icon";

const dropboxList = [
  { text: "최신순", value: "latest" },
  { text: "인기순", value: "popular" },
];

export default function MyDiggingList({ playlists }: { playlists: pli[] }) {
  return (
    <div
      id="digging-list"
      className="flex w-full flex-col gap-[12px]"
    >
      <div
        id="digging-list-header"
        className="flex h-[30px] w-full justify-between px-[20px]"
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
            selected={1}
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
        className={`custom-scrollbar x-0 flex w-full flex-col gap-[20px] overflow-y-auto p-[0_20px_20px_20px]`}
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
