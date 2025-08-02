import { Keyword, KeywordChipVariant } from "../types/keyword";

interface KeywordChipProps {
  keyword?: Keyword;
  isSelected?: boolean;
  onClick?: (keyword?: Keyword) => void;
  disabled?: boolean;
  variant?: KeywordChipVariant;
}

export default function KeywordChip({
  keyword,

  onClick,
  disabled = false,
  variant = "default",
}: KeywordChipProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(keyword);
    }
  };

  return (
    <div
      className="relative flex w-full flex-[0_0_auto] flex-wrap items-start self-stretch"
      role="group"
      aria-label="키워드 선택"
    >
      <button
        className={`bg-gray-5 relative inline-flex h-[50px] flex-[0_0_auto] flex-col items-center justify-center overflow-hidden rounded-[90px] border border-solid border-gray-50 p-20`}
        // className={`keyword-chip ${isSelected ? "selected" : ""} ${variant}`}
        onClick={handleClick}
        disabled={disabled}
        type="button"
      >
        {variant === "add" ? "+" : keyword?.label}
      </button>
    </div>
  );
}
