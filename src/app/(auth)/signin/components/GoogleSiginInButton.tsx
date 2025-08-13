"use client";

import Icon from "@/app/_common/icon/Icon";

interface GoogleSignInButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function GoogleSignInButton({
  children = "Sign in with Google",
  onClick,
  disabled = false,
  className = "",
}: GoogleSignInButtonProps) {
  return (
    <button
      type="button"
      aria-label="Sign in with Google"
      disabled={disabled}
      onClick={onClick}
      className={[
        "group relative inline-flex h-10 w-auto max-w-[400px] min-w-min items-center justify-center px-3",
        "rounded border border-[#747775] bg-gray-100",
        "text-sm font-medium tracking-[0.25px] text-[#1f1f1f]",
        "transition-[background-color,border-color,box-shadow] duration-200 ease-out",
        "hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.30),0_1px_3px_1px_rgba(60,64,67,0.15)]",
        "focus-visible:ring-4 focus-visible:ring-black/10 focus-visible:outline-none",
        "active:shadow-sm",
        "cursor-pointer whitespace-nowrap select-none",
        "disabled:cursor-default disabled:border-[#1f1f1f1f] disabled:bg-white/38 disabled:text-black/40",
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
        {/* 구글 아이콘 (20x20) */}
        <span className="h-5 w-5 min-w-5">
          <Icon name="googleIcon" />
        </span>
        <span className="flex-1 truncate">{children}</span>
      </span>
    </button>
  );
}
