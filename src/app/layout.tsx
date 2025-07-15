import "./globals.css";
import { MSWProvider } from "./providers";
import localFont from "next/font/local";

const Pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  style: "normal",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={Pretendard.className}
    >
      <body>
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
