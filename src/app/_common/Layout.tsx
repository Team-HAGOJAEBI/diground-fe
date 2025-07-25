"use client";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className="h-screen w-screen bg-gray-5 flex items-center justify-center">
      <div className={`w-full max-w-[1024px] h-[screen] bg-gray-5 lg:mx-auto ${className}`}>{children}</div>
    </div>
  );
}
