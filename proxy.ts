import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  const isAuthRoute = request.nextUrl.pathname.startsWith("/products");

  if (!isAuthRoute && token) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  if (isAuthRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/products/:path*"],
};
