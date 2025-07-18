import { useState } from "react";

import Icon from "@/app/_common/icon/Icon";
import { cover } from "@/assets/images";
import { PlayList } from "@/mocks/sample/Playlist";

interface HeaderProps {
  detailInfo: PlayList;
}

export default function Header({ detailInfo }: HeaderProps) {
  const [like, setLike] = useState<boolean>(false);

  const handleToggleLike = () => {
    setLike(!like);
  };

  return (
    <div
      className="relative w-full h-[45vh] bg-center bg-cover"
      style={{
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
      <div className="absolute bottom-0 left-0 right-0 px-[20px]">
        <div className="flex flex-col gap-[8px]">
          <div className="font-bold text-gray-100 text-2xl line-clamp-2">{detailInfo.title}</div>
          <div className="text-sm text-gray-70 line-clamp-4 whitespace-pre-line">{detailInfo.bio}</div>
          <div className="flex flex-wrap gap-[15px]">
            {detailInfo.tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-[4px] text-xs text-gray-80"
              >
                <Icon
                  name="tag"
                  className="w-[12px] h-[12px] block"
                />
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex items-center gap-[24px] text-gray-80 mt-[14px] mb-[10px]">
          <div
            className="flex items-center gap-[2px] cursor-pointer"
            onClick={handleToggleLike}
          >
            <Icon
              name={like ? "heartFilled" : "heart"}
              className="w-[24px] h-[24px]"
            />
            <span>{detailInfo.like.cnt}</span>
          </div>
          <div className="flex items-center gap-[2px] cursor-pointer">
            <Icon
              name="comment"
              className="w-[24px] h-[24px]"
            />
            <span>{detailInfo.comment.cnt}</span>
          </div>
          <div className="flex items-center gap-[2px] cursor-pointer">
            <Icon
              name="share"
              className="w-[24px] h-[24px]"
            />
            <span>{detailInfo.share.cnt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
