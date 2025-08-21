import { useState, useRef, useEffect } from "react";

import Icon from "@/app/_common/icon/Icon";

interface DropboxProps {
  className?: string;
  droplist: dataObj[];
  selected?: number;
  onSelectionChange?: (selectedIndex: number, selectedItem: dataObj) => void;
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

export default function Dropbox({ className, selected = 0, droplist, onSelectionChange }: DropboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(selected);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxId = `dropdown-listbox-${Math.random().toString(36).substr(2, 9)}`;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update selectedIndex when selected prop changes
  useEffect(() => {
    setSelectedIndex(selected);
  }, [selected]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(false);
    onSelectionChange?.(index, droplist[index]);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(true);
      }

      return;
    }

    switch (event.key) {
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        event.preventDefault();
        const nextIndex = selectedIndex < droplist.length - 1 ? selectedIndex + 1 : 0;

        setSelectedIndex(nextIndex);
        break;
      case "ArrowUp":
        event.preventDefault();
        const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : droplist.length - 1;

        setSelectedIndex(prevIndex);
        break;
      case "Enter":
        event.preventDefault();
        handleOptionClick(selectedIndex);
        break;
    }
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <div
        className={`hover:border-gray-70 flex cursor-pointer gap-[4px] rounded-[7px] border border-gray-50 px-[7px] text-gray-100 transition-colors ${className}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        aria-label="Dropdown menu"
      >
        <div className="flex h-full w-[calc(100%-15px)] items-center text-[12px]">{droplist[selectedIndex]?.text}</div>
        <div className="ml-auto flex h-full items-center">
          <Icon
            name="dropdown"
            className={`text-gray-70 h-[6px] w-[10px] cursor-pointer transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="bg-gray-10 absolute top-full left-0 z-50 mt-[2px] w-full rounded-[7px] border border-gray-50 py-[4px] shadow-lg">
          <ul
            id={listboxId}
            role="listbox"
            className="max-h-[200px] overflow-y-auto"
          >
            {droplist.map((item, index) => (
              <li
                key={`${item.value}-${index}`}
                className={`hover:bg-gray-20 cursor-pointer px-[12px] py-[8px] text-[12px] transition-colors ${
                  index === selectedIndex ? "bg-gray-20 text-[#FFE11D]" : "text-gray-100"
                }`}
                onClick={() => handleOptionClick(index)}
                role="option"
                aria-selected={index === selectedIndex}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
