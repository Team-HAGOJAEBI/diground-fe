import { home, search, more, create } from "@/assets/icons";

interface IconProps {
  name: string;
  className?: string;
}

// 아이콘 추가될 때마다 여기에 추가해주세요.
export const ICON_MAP = {
  home,
  search,
  more,
  create,
};

export default function Icon({ name, className }: IconProps) {
  const IconComponent = ICON_MAP[name as keyof typeof ICON_MAP];

  if (!IconComponent) {
    // eslint-disable-next-line no-console
    console.error(`아이콘 컴포넌트를 찾을 수 없습니다: ${name}`);

    return null;
  }

  return (
    <div className={"w-[30px] h-[30px] flex items-center justify-center"}>
      <IconComponent className={className} />
    </div>
  );
}
