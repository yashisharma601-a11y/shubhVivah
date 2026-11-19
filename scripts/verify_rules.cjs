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

function checkAccess(pathname, isAuthenticated) {
  if (isPublicPage(pathname)) {
    return { allowed: true, redirect: null };
  }

  if (!isAuthenticated) {
    return { allowed: false, redirect: `/login?redirect=${encodeURIComponent(pathname)}&message=auth_required` };
  }

  return { allowed: true, redirect: null };
}

const testRoutes = [
  { path: "/", shouldAllowWithoutLogin: true, desc: "Home Page" },
  { path: "/login", shouldAllowWithoutLogin: true, desc: "Login Page" },
  { path: "/register", shouldAllowWithoutLogin: true, desc: "Sign Up Page" },
  { path: "/forgot-password", shouldAllowWithoutLogin: true, desc: "Password Recovery" },
  { path: "/venues", shouldAllowWithoutLogin: false, desc: "Venues Directory" },
  { path: "/venues/heritage-palaces", shouldAllowWithoutLogin: false, desc: "Heritage Palaces Details" },
  { path: "/wedding-vendors/wedding-photography", shouldAllowWithoutLogin: false, desc: "Photography Details" },
  { path: "/wedding-vendors/bridal-makeup-artist", shouldAllowWithoutLogin: false, desc: "Bridal Makeup Details" },
  { path: "/wedding-vendors/decoration", shouldAllowWithoutLogin: false, desc: "Decoration Details" },
  { path: "/dashboard/profile", shouldAllowWithoutLogin: false, desc: "User Profile Details" },
  { path: "/dashboard/couple", shouldAllowWithoutLogin: false, desc: "Couple Dashboard" },
  { path: "/dashboard/vendor", shouldAllowWithoutLogin: false, desc: "Vendor Dashboard" },
];

let allPassed = true;
for (const t of testRoutes) {
  const result = checkAccess(t.path, false);
  const pass = result.allowed === t.shouldAllowWithoutLogin;
  if (!pass) allPassed = false;
  console.log(`${pass ? "PASS" : "FAIL"}: ${t.desc} [${t.path}] -> ${result.allowed ? "Allowed (Public)" : `BLOCKED (Redirects to ${result.redirect})`}`);
}

console.log("\nAll access control tests passed:", allPassed);

