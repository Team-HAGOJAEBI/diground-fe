"use client";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    // 📑 bg-gray-20 임시. 250718 기준 아직 정의된 바 없음.
    <div className="h-screen w-screen bg-gray-20 flex items-center justify-center">
      {/* 📑 bg-gray-5 임시. #131313을 쓰셨는데 해당 컬러는 베리에이션에 없음. */}
      <div className={`w-[400px] h-full bg-gray-5 ${className}`}>{children}</div>
    </div>
  );
}
