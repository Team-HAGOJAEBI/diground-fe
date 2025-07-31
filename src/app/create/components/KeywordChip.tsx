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
  isSelected = false,
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
    <button
      className={`keyword-chip ${isSelected ? "selected" : ""} ${variant}`}
      onClick={handleClick}
      disabled={disabled}
      type="button"
    >
      {variant === "add" ? "+" : keyword?.label}
    </button>
  );
}
