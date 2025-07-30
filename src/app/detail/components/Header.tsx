import { useState } from "react";

import Icon from "@/app/_common/icon/Icon";
import { cover } from "@/assets/images";
import { PlayList } from "@/mocks/sample/Playlist";

interface HeaderProps {
  detailInfo: PlayList;
  onOpenCommentDrawer: () => void;
  onOpenDiggingDrawer: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Header({
  detailInfo,
  onOpenCommentDrawer,
  onOpenDiggingDrawer,
  className,
  style,
}: HeaderProps) {
  const [like, setLike] = useState<boolean>(false);

  const handleToggleLike = () => {
    setLike(!like);
  };

  return (
    <div
      className={`flex items-end transition-all duration-300 ease-in-out ${className}`}
      style={{
        ...style,
        backgroundPosition: "center",
        backgroundSize: "cover", // 📑 contain/cover 확인 필요
        backgroundRepeat: "no-repeat",
        backgroundImage: [
          "linear-gradient(180deg, rgba(29,29,29,0) 0%, rgba(29,29,29, 0.93) 68%, #121212 100%)",
          // 📑 테스트용 cover import 사용
          `url(${cover.src})`,
        ].join(","),
      }}
    >
      <div className="px-[20px]">
        <div className="flex flex-col gap-[8px]">
          <div className="line-clamp-2 text-2xl font-bold text-gray-100">{detailInfo.title}</div>
          <div className="text-gray-70 line-clamp-4 text-sm whitespace-pre-line">{detailInfo.bio}</div>
          <div className="flex flex-wrap gap-[15px]">
            {detailInfo.tags.map((tag) => (
              <div
                key={tag}
                className="text-gray-80 flex items-center gap-[4px] text-xs"
              >
                <Icon
                  name="tag"
                  className="block h-[12px] w-[12px]"
                />
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-80 mt-[14px] mb-[10px] flex w-[screen] items-center gap-[24px]">
            <div className="flex items-center gap-[24px]">
              <div
                className="flex cursor-pointer items-center gap-[2px]"
                onClick={handleToggleLike}
              >
                <Icon
                  name={like ? "heartFilled" : "heart"}
                  className="w-[24px]"
                />
                <span>{detailInfo.like.cnt}</span>
              </div>
              <div
                className="flex cursor-pointer items-center gap-[2px]"
                onClick={onOpenCommentDrawer}
              >
                <Icon
                  name="comment"
                  className="w-[24px]"
                />
                <span>{detailInfo.comment}</span>
              </div>
              <div className="flex cursor-pointer items-center gap-[2px]">
                <Icon
                  name="share"
                  className="w-[24px]"
                />
                <span>{detailInfo.share}</span>
              </div>
              <div className="flex cursor-pointer items-center gap-[2px]">
                <Icon
                  name="moreDetail"
                  className="w-[31px]"
                />
              </div>
            </div>
          </div>
          <div
            className="relative pr-[5.5px]"
            onClick={onOpenDiggingDrawer}
          >
            <Icon
              name="digging2"
              className="h-[46px] w-[46px]"
            />
            {/* 노란색 : 없는 색깔. */}
            <div className="bg-gray-10 absolute top-[26px] left-[31px] flex h-[20px] w-[20px] items-center justify-center rounded-full border border-[#FFC107]">
              <span className="text-[10px] font-bold text-[#FFC107]">{detailInfo.digging}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
