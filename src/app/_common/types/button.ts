/**
 * Button 컴포넌트 Props 인터페이스
 * @interface ButtonProps
 */
export interface ButtonProps {
  /** 버튼 내부에 표시될 내용 (텍스트, 아이콘 등) */
  children: React.ReactNode;
  /** 버튼 비활성화 상태 (기본값: false) */
  disabled?: boolean;
  /** 버튼 클릭 시 호출되는 콜백 함수 */
  onClick?: () => void;
  /** HTML 버튼 타입 (기본값: "button") */
  type?: "button" | "submit";
}

// 나중에 확장 가능한 타입들
export type ButtonType = "button" | "submit";
