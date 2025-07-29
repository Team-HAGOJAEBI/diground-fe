import Drawer from "../Drawer";

import DiggingContainer from "./DiggingContainer";

import Icon from "@/app/_common/icon/Icon";

// key값 아이콘명이랑 맞추기!
const DIGGING_LIST = [
  { id: "youtubeMusic", value: "유튜브 뮤직", isActive: true, isConnected: true },
  { id: "appleMusic", value: "애플뮤직", isActive: true, isConnected: true },
  { id: "spotify", value: "스포티파이", isActive: true, isConnected: false },
  { id: "melon", value: "멜론", isActive: false, isConnected: false },
];

export default function DiggingDrawer({ onClose }: { onClose: () => void }) {
  return (
    <Drawer
      title="디깅하기"
      onClose={onClose}
      className="pb-[30px]"
    >
      <div className="flex flex-col gap-[37px] mt-[24px]">
        {DIGGING_LIST.map((list) => (
          <DiggingContainer
            key={list.id}
            {...list}
          />
        ))}
      </div>
      <span className="flex items-center gap-[4px] text-gray-80 justify-end mt-[37px] cursor-pointer">
        로그인하고 플랫폼 연동 설정 유지하기
        <Icon name="arrowRight" />
      </span>
    </Drawer>
  );
}
