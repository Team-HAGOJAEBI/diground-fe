import Icon from "@/app/_common/icon/Icon";

interface DropboxProps {
  className?: string;
  droplist: dataObj[];
  selected?: number;
}
/**
 * 드롭박스에 표시될 각 항목의 타입을 정의
 * @property {string} text - 드롭박스에 보여질 텍스트
 * @property {string} value - 해당 항목의 실제 값
 */
interface dataObj {
  text: string;
  value: string;
}

export default function Dropbox({ className, selected = 0, droplist }: DropboxProps) {
  return (
    <div className={`flex gap-[4px] rounded-[7px] border border-gray-50 px-[7px] text-gray-100 ${className}`}>
      <div className="flex h-full w-[calc(100%-15px)] items-center text-[12px]">{droplist[selected].text}</div>
      <div className="ml-auto flex h-full items-center">
        <Icon
          name="dropdown"
          className="text-gray-70 h-[6px] w-[10px] cursor-pointer"
        />
      </div>
    </div>
  );
}
