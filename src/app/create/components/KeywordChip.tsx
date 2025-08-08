import { tv } from "tailwind-variants";

import { Keyword } from "../../_common/types/keyword";

import { KeywordChipType } from "@/app/create/types/keywordChipType";

/**
 * KeywordChip 컴포넌트 Props 인터페이스
 * @interface KeywordChipProps
 */
interface KeywordChipProps {
  /** 키워드 객체 (type이 "add"일 때는 선택적) */
  keyword?: Keyword;
  /** 키워드 선택 상태 (기본값: false) */
  isSelected?: boolean;
  /** 클릭 시 호출되는 콜백 함수 */
  onClick?: (keyword?: Keyword) => void;
  /** 버튼 비활성화 상태 (기본값: false) */
  disabled?: boolean;
  /** 칩 타입 - "default" 또는 "add" (기본값: "default") */
  type?: KeywordChipType;
}

/**
 * 개별 키워드 칩 또는 추가 버튼을 렌더링하는 컴포넌트
 *
 * @component
 * @param {Keyword} [keyword] - 키워드 객체 (type이 "add"일 때는 선택적)
 * @param {boolean} [isSelected=false] - 키워드 선택 상태 (기본값: false)
 * @param {(keyword?: Keyword) => void} [onClick] - 클릭 시 호출되는 콜백 함수
 * @param {boolean} [disabled=false] - 버튼 비활성화 상태 (기본값: false)
 * @param {KeywordChipType} [type="default"] - 칩 타입 - "default" 또는 "add" (기본값: "default")
 * @returns {JSX.Element} 키워드 칩 또는 추가 버튼 컴포넌트
 *
 * @example
 * ```tsx
 * // 일반 키워드 칩
 * <KeywordChip
 *   keyword={{ id: 1, label: "React" }}
 *   isSelected={true}
 *   onClick={(keyword) => console.log(keyword)}
 * />
 *
 * // 추가 버튼
 * <KeywordChip
 *   type="add"
 *   onClick={() => console.log("Add new keyword")}
 * />
 * ```
 */
export default function KeywordChip({
  keyword,
  isSelected = false,
  onClick,
  disabled = false,
  type = "default",
}: KeywordChipProps) {
  /**
   * 키워드 칩 클릭 핸들러
   * disabled 상태가 아닐 때만 onClick 콜백을 호출합니다.
   */
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(keyword);
    }
  };

  const buttonVariants = tv({
    /** 모든 키워드 칩에 공통으로 적용되는 기본 스타일 클래스 */
    base: `inline-flex items-center justify-center cursor-pointer rounded-[90px] border px-[20px] pb-[20px] pt-[20px] h-[50px] whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5`,
    variants: {
      /** 칩 타입에 따른 스타일 */
      type: {
        default: "",
        add: "border-[#924B4B] bg-[#924B4B] text-gray-100 min-w-[61px]",
      },
      /** 선택 상태에 따른 스타일 */
      selected: {
        true: "border-[#FFE11D] text-[#FFE11D] font-bold",
        false: "border-gray-50 text-gray-100 hover:border-[#FFE11D] hover:text-[#FFE11D]",
      },
    },
    compoundVariants: [
      {
        type: "add",
        selected: true,
        class: "border-[#924B4B] bg-[#924B4B] text-gray-100",
      },
      {
        type: "add",
        selected: false,
        class: "border-[#924B4B] bg-[#924B4B] text-gray-100", // 추후에 디자이너가 설정해주면 그 떄 변경
      },
    ],
    defaultVariants: {
      type: "default",
      selected: false,
    },
  });

  return (
    <button
      className={buttonVariants({ type, selected: isSelected })}
      onClick={type === "add" ? () => onClick?.() : handleClick}
      disabled={disabled}
      type="button"
    >
      {type === "add" ? (
        <span className="text-[20px] font-bold"> + </span>
      ) : (
        <span className="text-[16px]">{keyword?.label || ""}</span>
      )}
    </button>
  );
}
