import { ButtonProps } from "@/app/_common/types/button";

export default function Button({ children, disabled = false, onClick, type = "button" }: ButtonProps) {
  const getShapeClasses = (): string => {
    switch (type) {
      case "submit":
        return "rounded-[8px] h-[60px] w-full px-[20px]";
      case "button":
        return "rounded-[90px] h-[50px] w-[260px] px-[36px]";
      default:
        return "rounded-[90px]";
    }
  };

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
