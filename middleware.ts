// import { getToken } from "next-auth/jwt";
// import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest, _next: NextFetchEvent) {
//   const { pathname } = request.nextUrl;

//   console.log('PATHANEM ::: ' , pathname);

//   const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
//     console.log('Token:', token);

//     if (!token) {
//       const url = new URL(`/api/auth/signin`, request.url);
//       url.searchParams.set("callbackUrl", request.url);
//       return NextResponse.redirect(url);
//     }

//     if (token.role == "admin") {
//       return NextResponse.rewrite(new URL(`/admin`, request.url));
//     }

//   const protectedPaths = ["/admin"];
//   const matchesProtectedPath = protectedPaths.some((path) =>
//     pathname.startsWith(path)
//   );

//   if (matchesProtectedPath) {
//     const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
//     console.log('Token:', token);

//     if (!token) {
//       const url = new URL(`/api/auth/signin`, request.url);
//       url.searchParams.set("callbackUrl", request.url);
//       return NextResponse.redirect(url);
//     }

//     if (token.role !== "admin") {
//       return NextResponse.rewrite(new URL(`/403`, request.url));
//     }
//   }

//   return NextResponse.next();
// }


import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  // Get the token from NextAuth
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // If the user is trying to access a protected route (like /admin)
  const protectedPaths = ["/admin"];
  const isProtectedRoute = protectedPaths.some((path) => pathname.startsWith(path));

  // If no token and accessing a protected route, redirect to sign-in
  if (isProtectedRoute && !token) {
    const url = new URL(`/api/auth/signin`, request.url);
    url.searchParams.set("callbackUrl", request.url); // Set callback URL to the current page
    return NextResponse.redirect(url);
  }

  // If the user is logged in and trying to access /admin, check role
  if (token) {
    if (token.role === "admin") {
      // If the user is an admin, they are allowed to access /admin
      if (pathname !== "/admin") {
        return NextResponse.next(); // Let the admin access other pages as well
      }
    } else if (isProtectedRoute) {
      // If the user is not an admin and tries to access /admin, redirect to 403 page
      return NextResponse.rewrite(new URL(`/403`, request.url)); // Or another page for unauthorized access
    }
  }

  // Default return, allow access to non-protected routes
  return NextResponse.next();
}
