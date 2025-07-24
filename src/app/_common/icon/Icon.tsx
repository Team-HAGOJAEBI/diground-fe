import {
  home,
  search,
  more,
  moreFilled,
  moreDetail,
  create,
  prev,
  tag,
  heart,
  heartFilled,
  share,
  comment,
  arrowUp,
  close,
  digging,
} from "@/assets/icons";

interface IconProps {
  name: string;
  className?: string;
  onClick?: () => void;
}

// 아이콘 추가될 때마다 여기에 추가해주세요.
export const ICON_MAP = {
  home,
  search,
  more,
  moreFilled,
  moreDetail,
  create,
  prev,
  tag,
  heart,
  heartFilled,
  share,
  comment,
  arrowUp,
  close,
  digging,
};

export default function Icon({ name, className, onClick }: IconProps) {
  const IconComponent = ICON_MAP[name as keyof typeof ICON_MAP];

  if (!IconComponent) {
    console.error(`아이콘 컴포넌트를 찾을 수 없습니다: ${name}`);

    return null;
  }

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      <IconComponent />
    </div>
  );
}
