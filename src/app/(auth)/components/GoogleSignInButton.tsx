"use client";

import Icon from "@/app/_common/icon/Icon";

interface GoogleSignInButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function GoogleSignInButton({ onClick, disabled = false, className = "" }: GoogleSignInButtonProps) {
  return (
    <button
      type="button"
      aria-label="Sign in with Google"
      disabled={disabled}
      onClick={onClick}
      className={[
        // 레이아웃/크기
        "group relative inline-flex items-center justify-center",
        "h-10 w-auto max-w-[400px] min-w-min px-3",
        // 모양/테두리
        "rounded border border-[#747775]",
        // 색/폰트
        "bg-gray-100 bg-none text-[#1f1f1f]",
        // Roboto를 전역 폰트로 매핑했다면 font-sans로 충분
        "font-roboto text-sm font-medium tracking-[0.25px]",
        // 브라우저 기본/선택/정렬
        "appearance-none overflow-hidden text-center align-middle select-none",
        // 트랜지션(원본 0.218s)
        "transition-[background-color,border-color,box-shadow] duration-[218ms] ease-out",
        // 상호작용
        "cursor-pointer whitespace-nowrap",
        "focus-visible:ring-4 focus-visible:ring-black/10 focus-visible:outline-none",
        "hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.30),0_1px_3px_1px_rgba(60,64,67,0.15)]",
        "active:shadow-sm",
        // disabled
        "disabled:cursor-default disabled:border-[#1f1f1f1f] disabled:bg-gray-100/38 disabled:text-black/40",
        className,
      ].join(" ")}
    >
      {/* state overlay (hover/focus/active 시 잔상) */}
      <span
        className={[
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200",
          // hover에서 8%, focus/active에서 12% 투명도 (임의값 사용)
          "group-hover:opacity-[0.08] group-focus:opacity-[0.12] group-active:opacity-[0.12]",
          "bg-[#303030]",
        ].join(" ")}
      />
      <span className="relative z-[1] flex w-full items-center gap-3">
        <Icon
          name="googleIcon"
          className="h-5 w-5 min-w-5"
        />
        <span>로그인</span>
      </span>
    </button>
  );
}
