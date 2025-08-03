import { Keyword, KeywordChipType } from "../types/keyword";

interface KeywordChipProps {
  keyword?: Keyword;
  isSelected?: boolean;
  onClick?: (keyword?: Keyword) => void;
  disabled?: boolean;
  type?: KeywordChipType;
}

export default function KeywordChip({
  keyword,
  isSelected = false,
  onClick,
  disabled = false,
  type = "default",
}: KeywordChipProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(keyword);
    }
  };

  const baseClasses =
    "inline-block cursor-pointer rounded-full border px-5 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5";
  const selectedClasses = isSelected
    ? "border-[#FFE11D] bg-[#FFE11D] "
    : "border-gray-50 text-gray-100 hover:border-[#FFE11D] hover:text-[#FFE11D]";
  const addClasses = "  border-[#924B4B] bg-[#924B4B] text-gray-100";

  if (type === "add") {
    return (
      <button
        className={`${baseClasses} ${addClasses}`}
        onClick={() => onClick?.()}
        disabled={disabled}
        type="button"
      >
        <span className="font-bold text-[16]">+</span>
      </button>
    );
  }

  return (
    <button
      className={`${baseClasses} ${selectedClasses}`}
      onClick={handleClick}
      disabled={disabled}
      type="button"
    >
      <span className="text-[16]">{keyword?.label || ""}</span>
    </button>
  );
}
