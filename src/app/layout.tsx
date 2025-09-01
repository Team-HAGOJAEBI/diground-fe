import "../assets/styles/globals.css";

import { Roboto } from "next/font/google";
import localFont from "next/font/local";

import { MSWProvider } from "./providers";

const Pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  style: "normal",
  variable: "--font-pretendard",
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${Pretendard.className} ${roboto.className}`}
    >
      <body>
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
