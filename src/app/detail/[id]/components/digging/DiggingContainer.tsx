import { tv } from "tailwind-variants";

import Icon from "@/app/_common/icon/Icon";

interface DiggingContainerProps {
  id: string;
  value: string;
  isActive: boolean;
  isConnected: boolean;
}

const labelStyle = tv({
  base: "text-[18px]",
  variants: {
    color: {
      default: "text-gray-60",
      active: "text-gray-100",
    },
    weight: {
      default: "",
      active: "font-bold",
    },
  },
  defaultVariants: {
    color: "default",
    weight: "default",
  },
});

const diggingStyle = tv({
  base: "text-[14px]",
  variants: {
    color: {
      default: "text-gray-100",
      connected: "text-[#ffe11d]", // 📑 폰트 컬러 없는 색상
    },
    weight: {
      default: "",
      connected: "font-bold",
    },
  },
  defaultVariants: {
    color: "default",
    weight: "default",
  },
});

export default function DiggingContainer({ id, value, isActive, isConnected }: DiggingContainerProps) {
  const iconName = `${id}${isActive ? "Active" : ""}`;
  const iconLabel = `${value}${isActive ? "" : " 준비 중"}`;

  return (
    <div className="flex items-center justify-between">
      {/* Digging Left */}
      <div className="flex items-center gap-[12px]">
        <Icon name={iconName} />
        <span
          className={labelStyle({ color: isActive ? "active" : "default", weight: isActive ? "active" : "default" })}
        >
          {iconLabel}
        </span>
      </div>
      {/* Digging Right */}
      {isActive && (
        <div className="flex cursor-pointer items-center gap-[4px]">
          <span
            className={diggingStyle({
              color: isConnected ? "connected" : "default",
              weight: isConnected ? "connected" : "default",
            })}
          >
            {isConnected ? "디깅" : "연동"}하기
          </span>
          {isConnected && <Icon name="digging" />}
        </div>
      )}
    </div>
  );
}
