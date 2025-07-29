import Image from "next/image";

import { DetailList } from "@/mocks/sample/Playlist";

interface ListProps {
  item: DetailList;
}

export default function List({ item }: ListProps) {
  return (
    <div className="mb-[16px] flex items-center gap-[16px] last:mb-0">
      <Image
        src={item.image}
        alt={item.title}
        width={70}
        height={70}
        style={{ borderRadius: "16px" }}
      />
      <div className="flex-1 py-[14px]">
        <p className="text-gray-90 mb-[6px] line-clamp-2 overflow-hidden text-[14px] font-semibold tracking-[-2%]">
          {item.title}
        </p>
        <div className="line-clamp-1 flex text-[12px] text-gray-50">
          {item.artist} {item.time}
        </div>
      </div>
    </div>
  );
}
