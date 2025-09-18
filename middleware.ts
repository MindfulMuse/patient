
// import { clerkMiddleware } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";
// import { routeMatchers } from "./lib/routes";

// type SessionClaims = {
//   metadata?: {
//     role?: string;
//   };
// };

// const checkRoleAndRedirect = (
//   req: NextRequest,
//   role: string | undefined,
//   allowedRole: keyof typeof routeMatchers
// ): NextResponse | undefined => {
//   const matcher = routeMatchers[allowedRole];
//   if (matcher(req) && role !== allowedRole) {
//     const url = new URL("/", req.url);
//     console.log("Unauthorized access, redirecting to:", url);
//     return NextResponse.redirect(url);
//   }
//   return undefined;
// };

// export default clerkMiddleware(async (auth, req) => {
//   // ✅ Allow homepage to load for everyone
//   if (req.nextUrl.pathname === "/") {
//     return NextResponse.next();
//   }

//   const { userId, sessionClaims } = await auth();
//   const role = (sessionClaims as SessionClaims)?.metadata?.role ?? (userId ? "patient" : "sign-in");

//   // Only checking for admin and doctor roles — add more if needed
//   const response =
//     checkRoleAndRedirect(req, role, "admin") ||
//     checkRoleAndRedirect(req, role, "doctor")||
//      checkRoleAndRedirect(req, role, "patient")
//     ;

//   if (response) return response;

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     // Make sure middleware runs for all necessary routes
//     '/((?!_next|.*\\..*|favicon.ico).*)',
//   ],
// };

// // middleware.ts
// import { clerkMiddleware } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export default clerkMiddleware(async (auth, req: NextRequest) => {
//   const { userId, sessionClaims } = await auth();

//   const role =
//     (sessionClaims?.metadata as { role?: string })?.role ??
//     (userId ? "patient" : "sign-in");

//   const path = req.nextUrl.pathname;

//   // Allow root page to load
//   if (path === "/") return NextResponse.next();

//   // Role-based access control
//   if (path.startsWith("/admin") && role !== "admin") {
//     console.log(`Unauthorized access for role "${role}" to /admin`);
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   if (path.startsWith("/doctor") && role !== "doctor") {
//     console.log(`Unauthorized access for role "${role}" to /doctor`);
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   // if (path.startsWith("/patient") && role !== "patient") {
//   //   console.log(`Unauthorized access for role "${role}" to /patient`);
//   //   return NextResponse.redirect(new URL("/", req.url));
//   // }

//   if (path.startsWith("/patient")) {
//   // const hasQueryId = req.nextUrl.searchParams.has("id");

//   const hasQueryParam = req.nextUrl.searchParams.has("id") || req.nextUrl.searchParams.has("email");

// if (role === "doctor" && hasQueryParam) {
//   return NextResponse.next();
// }


//   if (role !== "patient") {
//     console.log(`Unauthorized access for role "${role}" to /patient`);
//     return NextResponse.redirect(new URL("/", req.url));
//   }
// }


//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!_next|.*\\..*|favicon.ico).*)"],
// };

//middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims } = await auth();

  const role =
    (sessionClaims?.metadata as { role?: string })?.role ??
    (userId ? "patient" : "sign-in");

  const path = req.nextUrl.pathname;

  // 1. Allow public pages
  if (path === "/") return NextResponse.next();

  // 2. Protect /admin: Only admin allowed
  if (path.startsWith("/admin")) {
    if (role !== "admin") {
      console.log(`❌ Unauthorized access to /admin by role "${role}"`);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // 3. Protect /doctor: Only doctor and admin
  if (path.startsWith("/doctor")) {
    if (role !== "doctor" && role !== "admin") {
      console.log(`❌ Unauthorized access to /doctor by role "${role}"`);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  
  // 2. Protect /admin: Only admin allowed
  if (path.startsWith("/nurse")) {
    if (role !== "nurse") {
      console.log(`❌ Unauthorized access to /admin by role "${role}"`);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  

  // 4. Protect /patient
  if (path.startsWith("/patient")) {
    const url = new URL(req.url);
  const email = url.searchParams.get("email");
  const id = url.searchParams.get("id");

  const isQueryAccess = !!email || !!id;

  if (role === "doctor" && isQueryAccess) {
    return NextResponse.next();
  }

  if (role === "admin") {
    return NextResponse.next();
  }

  if (role !== "patient") {
    console.log(`❌ Unauthorized access to /patient by role "${role}"`);
    return NextResponse.redirect(new URL("/", req.url));
  }
  }

  // All good
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*",
    "/doctor/:path*",
    "/patient/:path*",
    "/nurse/:path*",    
    "/((?!_next|.*\\..*|favicon.ico).*)"],
};
