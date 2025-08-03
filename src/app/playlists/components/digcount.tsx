import Icon from "@/app/_common/icon/Icon";

export default function DigCount({ count, iconName }: { count: number; iconName: string }) {
  return (
    <div
      id="digcount"
      className="mr-1 flex h-[18px] w-auto items-center gap-[1px]"
    >
      <div className="flex h-[18px] w-[18px] items-center justify-center">
        <div className="relative h-[14px] w-[14px] items-center justify-center">
          <Icon
            name={iconName}
            className="h-[14px] w-[14px] rounded-[1px]"
          />
        </div>
      </div>
      <div className="flex h-[14px] w-auto items-center justify-center text-[12px] leading-[100%] font-[400] tracking-[0%] text-gray-100">
        <span>{count}</span>
      </div>
    </div>
  );
}
