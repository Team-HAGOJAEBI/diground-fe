import { NextRequest, NextResponse } from "next/server";

// Context7 패턴: Edge Runtime에서 안전한 세션 확인
function hasValidSession(request: NextRequest): boolean {
  // 모든 가능한 NextAuth 토큰 확인
  const sessionToken =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token") ||
    request.cookies.get("authjs.session-token");

  if (sessionToken) {
    if (sessionToken.value.startsWith("mock.")) {
      return true;
    }

    return true;
  }

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 인증이 필요없는 경로들
  const publicPaths = ["/signin", "/api/auth", "/_next", "/favicon.ico", "/images", "/static"];

  // 공개 경로는 통과
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 루트 경로도 통과 (필요에 따라 수정)
  if (pathname === "/") {
    return NextResponse.next();
  }

  // 세션 확인
  if (!hasValidSession(request)) {
    // 로그인 페이지로 리다이렉트
    const signInUrl = new URL("/signin", request.url);

    signInUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 다음 경로들을 제외한 모든 요청에 대해 미들웨어 실행:
     * - api/auth (NextAuth 경로)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화)
     * - favicon.ico (파비콘)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
