import createIntlMiddleware from "next-intl/middleware";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
});

export default async function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Protected routes that need authentication
  const authRoutes = ["/profile", "/my-donations", "/settings"];

  // Public routes that don't need authentication or intl middleware
  const publicRoutes = ["/_next", "/api", "/images", "/fonts"];

  // Check if it's a public route
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if it's a protected route that requires auth
  const isAuthRoute = authRoutes.some(
    (route) =>
      pathname === route ||
      pathname.match(new RegExp(`^/(en|ar)${route}(/.*)?$`))
  );

  if (isAuthRoute) {
    // Get the user session
    const session = await auth();

    // If no session and trying to access protected route, redirect to login
    if (!session) {
      const signInUrl = new URL("/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Apply the intl middleware for all routes
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
