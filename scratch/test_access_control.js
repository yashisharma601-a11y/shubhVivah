import { middleware } from "../middleware.js";

function createMockRequest(pathname) {
  const url = `http://localhost:3000${pathname}`;
  return {
    nextUrl: {
      pathname,
      search: "",
      searchParams: new URLSearchParams(),
    },
    url,
    cookies: {
      get: () => null, // Unauthenticated user (no session cookie)
    },
    headers: new Headers(),
  };
}

async function testAccessControl() {
  console.log("=== Testing Strict Access Control (Without Login) ===");

  const routes = [
    { path: "/", shouldAllow: true, name: "Home Page" },
    { path: "/login", shouldAllow: true, name: "Login Page" },
    { path: "/register", shouldAllow: true, name: "Register Page" },
    { path: "/forgot-password", shouldAllow: true, name: "Forgot Password Page" },
    { path: "/venues", shouldAllow: false, name: "Venues Listing Page" },
    { path: "/venues/heritage-palaces", shouldAllow: false, name: "Heritage Palaces Details" },
    { path: "/wedding-vendors/wedding-photography", shouldAllow: false, name: "Photography Details Page" },
    { path: "/dashboard/couple", shouldAllow: false, name: "Couple Dashboard" },
    { path: "/dashboard/profile", shouldAllow: false, name: "My Profile Section" },
    { path: "/vendors", shouldAllow: false, name: "Vendors Directory" },
  ];

  let passed = 0;
  for (const r of routes) {
    const req = createMockRequest(r.path);
    const res = await middleware(req);
    const isRedirectToLogin = res?.status === 307 && res?.headers?.get("location")?.includes("/login");
    const isAllowed = !isRedirectToLogin;

    if (r.shouldAllow === isAllowed) {
      console.log(`PASS: ${r.name} (${r.path}) -> ${isAllowed ? "ALLOWED (Public)" : "BLOCKED -> REDIRECT TO LOGIN"}`);
      passed++;
    } else {
      console.log(`FAIL: ${r.name} (${r.path}) -> Unexpected behavior`);
    }
  }

  console.log(`=== Results: ${passed}/${routes.length} Tests Passed ===`);
}

testAccessControl().catch(console.error);

