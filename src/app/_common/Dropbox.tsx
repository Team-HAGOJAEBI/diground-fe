import { useState, useEffect, useRef } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(selected);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectItem = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(false);
  };

  // 해당 컴포넌트 외의 구역을 클릭하면 드롭박스 닫음
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // 드롭 열어놨을때만 적용
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={`relative ${className}`}
    >
      <div
        className="box-border flex h-full w-full cursor-pointer rounded-[7px] border border-gray-50 px-[7px] text-gray-100"
        onClick={toggleDropdown}
      >
        <div className="flex h-full flex-1 items-center text-[12px]">{droplist[currentIndex].text}</div>
        <div className="ml-auto flex h-full items-center">
          <Icon
            name="dropdown"
            className="text-gray-70 h-[6px] w-[10px]"
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-[4px] flex w-full flex-col gap-[10px] rounded-[7px] border border-gray-50 bg-white py-[11px] shadow-md">
          {droplist.map((item, index) => (
            <div
              key={item.value}
              className={`cursor-pointer px-[10px] text-[12px] ${
                index === currentIndex ? "text-yellow-60" : "text-gray-100"
              }`}
              onClick={() => selectItem(index)}
            >
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
