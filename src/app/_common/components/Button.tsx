import { ButtonProps } from "@/app/_common/types/button";

/**
 * 버튼 컴포넌트
 * 타입에 따라 다른 스타일이 적용되는 재사용 가능한 버튼 컴포넌트입니다.
 *
 * @component
 * @param {React.ReactNode} children - 버튼 내부에 표시될 내용 (텍스트, 아이콘 등)
 * @param {boolean} [disabled=false] - 버튼 비활성화 상태 (기본값: false)
 * @param {() => void} [onClick] - 버튼 클릭 시 호출되는 콜백 함수
 * @param {"button" | "submit" } [type="button"] - HTML 버튼 타입 (기본값: "button")
 * @returns {JSX.Element} 버튼 컴포넌트
 *
 * @example
 * ```tsx
 * // 기본 버튼
 * <Button onClick={() => console.log('clicked')}>
 *   클릭하세요
 * </Button>
 *
 * // submit 버튼
 * <Button type="submit">
 *   제출
 * </Button>
 *
 * // 비활성화된 버튼
 * <Button disabled={true}>
 *   비활성화
 * </Button>
 * ```
 */
export default function Button({ children, disabled = false, onClick, type = "button" }: ButtonProps) {
  /**
   * 버튼 타입에 따라 다른 모양의 버튼의 스타일 적용
   * @returns {string} 타입별 CSS 클래스 문자열
   */
  const getShapeClasses = (): string => {
    switch (type) {
      case "submit":
        // submit 버튼: 직사각형, 높이 60px, 전체 너비
        return "rounded-[8px] h-[60px] w-full px-[20px]";
      case "button":
        // 일반 버튼: 둥근 모양, 높이 50px, 고정 너비 260px
        return "rounded-[90px] h-[50px] w-[260px] px-[36px]";
      default:
        // 기본값: 둥근 모양
        return "rounded-[90px] h-[50px] w-[260px] px-[36px]";
    }
  };

  /** 모든 버튼에 공통으로 적용되는 기본 스타일 클래스 */
  const baseClasses = "bg-[#FFE11D] text-gy-05 font-[16px] font-bold leading-[20px]  disabled:cursor-not-allowed ";
  const combinedClasses = `${baseClasses} ${getShapeClasses()} `.trim();

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
