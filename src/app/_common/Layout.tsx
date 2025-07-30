"use client";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className="bg-gray-5">
      <div className={`bg-gray-5 m-auto h-[screen] w-full max-w-[1024px] min-w-[360px] ${className}`}>{children}</div>
    </div>
  );
}
