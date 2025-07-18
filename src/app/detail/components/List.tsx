import Image from "next/image";

import { PlayList } from "@/mocks/sample/Playlist";

interface ListProps {
  item: PlayList;
}

export default function List({ item }: ListProps) {
  return (
    <div className="flex items-center mb-[16px] gap-[16px] last:mb-0">
      <Image
        src={item.image}
        alt={item.title}
        width={70}
        height={70}
        style={{ borderRadius: "16px" }}
      />
      <div className="flex-1 py-[14px]">
        <p className="overflow-hidden text-gray-90 mb-[6px] tracking-[-2%] font-semibold text-[14px] line-clamp-2">
          {item.title}
        </p>
        <div className="flex text-gray-50 text-[12px] line-clamp-1">
          {item.artist} {item.time}
        </div>
      </div>
    </div>
  );
}
