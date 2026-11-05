import { NextResponse } from "next/server";
import { verifySessionTokenUniversal } from "./lib/session";

// 1. Explicitly Allowed Public Pages (Only Home, Login, Register, Forgot Password)
const PUBLIC_PAGES = [
  "/",
  "/login",
  "/register",
  "/vendors/register",
  "/forgot-password",
];

function isPublicPage(pathname) {
  if (pathname === "/") return true;
  return PUBLIC_PAGES.some((route) => {
    if (route === "/") return false;
    return pathname === route || pathname.startsWith(route + "/");
  });
}

// 2. Explicitly Allowed Public APIs
const PUBLIC_APIS = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/auth/me",
  "/api/auth/logout",
  "/api/admin/login",
  "/api/sathi-chat",
  "/api/sathi-chat/inquiry",
  "/api/vendors/register",
  "/api/contact/register",
];

function isPublicApi(pathname) {
  return PUBLIC_APIS.some((route) => pathname === route || pathname.startsWith(route + "/"));
}

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // 1. Admin Panel has dedicated role-based security & login handled on /admin
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.next();
  }

  // 2. Check for active session cookie
  const sessionCookie = request.cookies.get("shubhvivah_session")?.value;
  let user = null;
  if (sessionCookie) {
    user = await verifySessionTokenUniversal(sessionCookie);
  }

  const isAuthenticated = Boolean(user);

  // 3. Handle Public Routes
  if (isPublicPage(pathname) || isPublicApi(pathname)) {
    // If logged-in user visits /login or /register, redirect to their dashboard or intended redirect
    if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
      const redirectParam = request.nextUrl.searchParams.get("redirect");
      let destination = `/dashboard/${user.user_type || "couple"}`;
      if (
        redirectParam &&
        redirectParam.startsWith("/") &&
        !redirectParam.startsWith("//") &&
        !redirectParam.startsWith("/login") &&
        !redirectParam.startsWith("/register")
      ) {
        destination = redirectParam;
      }
      return NextResponse.redirect(new URL(destination, request.url));
    }

    return NextResponse.next();
  }

  // 4. Handle Unauthenticated Access to Protected Routes
  if (!isAuthenticated) {
    // 4a. Protected API Route -> Return 401 Unauthorized
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        {
          success: false,
          error: "unauthorized",
          message: "Authentication required. Please log in to access this matrimonial data.",
        },
        {
          status: 401,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );
    }

    // 4b. Protected Page Route -> Redirect to /login with original URL and message
    const targetUrl = pathname + search;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", targetUrl);
    loginUrl.searchParams.set("message", "auth_required");

    const response = NextResponse.redirect(loginUrl, { status: 307 });
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  }

  // 5. Authenticated Access to Protected Routes
  const response = NextResponse.next();
  // Prevent browser caching of private matrimonial pages so back-button after logout is secure
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Static asset files (.png, .jpg, .jpeg, .gif, .svg, .webp, .ico, .woff, .woff2, .ttf, .css, .js)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|css|js)$).*)",
  ],
};

