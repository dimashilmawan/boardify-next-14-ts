import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  beforeAuth() {},
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // redirect to original url if login user access public routes
    if (auth.userId && auth.isPublicRoute) {
      let url = "/select-org";
      console.log("2ND");
      if (auth.orgId) {
        url = `/organization/${auth.orgId}`;
      }
      const selectOrg = new URL(url, req.url);
      return NextResponse.redirect(selectOrg);
    }
    // redirect them to organization selection page
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
      console.log("3RD");
      const selectOrg = new URL("/select-org", req.url);
      return NextResponse.redirect(selectOrg);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
