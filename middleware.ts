import { NextRequest, NextResponse } from "next/server";

// Admin route protection
// Note: Next.js 16 prefers proxy.ts — migrate when middleware.ts can be deleted
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow /admin/login to pass through
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const authCookie = request.cookies.get("admin_session");

    if (!authCookie || authCookie.value !== process.env.ADMIN_SECRET) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
