import { useState, useEffect, useRef } from "react";

import Icon from "@/app/_common/icon/Icon";

interface DropboxProps {
  className?: string;
  droplist: dataObj[];
  selected?: string;
  onSelectionChange?: (id: string) => void;
}
/**
 * 드롭박스 props
 * @property {string} text - 드롭박스에 보여질 텍스트
 * @property {string} value - 해당 항목의 실제 값(id)
 */
interface dataObj {
  text: string;
  value: string;
}

/**
 * 드롭박스 컴포넌트
 * @property {string} className - 추가적인 CSS 클래스
 * @property {dataObj[]} droplist - 드롭박스에 표시할 항목 목록
 * @property {string} selected - 현재 선택된 항목의 값
 * @property {(value: string) => void} onSelectionChange - 선택 변경 시 호출되는 콜백 함수
 */
export default function Dropbox({ className, selected, droplist, onSelectionChange }: DropboxProps) {
  // 선택된 값
  const [selectedValue, setSelectedValue] = useState(selected ?? droplist[0].value);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(droplist.findIndex((item) => item.value === selectedValue));
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectItem = (index: number) => {
    setCurrentIndex(index);
    setSelectedValue(droplist[index].value);
    setIsOpen(false);
    if (onSelectionChange) {
      onSelectionChange(droplist[index].value);
    }
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
        <div className="bg-gray-5 absolute top-full left-0 mt-[4px] flex w-full flex-col gap-[10px] rounded-[7px] border border-gray-50 bg-white py-[11px] shadow-md">
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
