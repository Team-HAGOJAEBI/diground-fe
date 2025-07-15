import "./globals.css";
import { MSWProvider } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
