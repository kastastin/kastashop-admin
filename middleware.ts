// This file is used to protect all routes in the application
// Docs: https://clerk.com/docs/references/nextjs/clerk-middleware

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
	"/sign-in(.*)",
	"/sign-up(.*)",
	"/api/:path*",
]);

export default clerkMiddleware((auth, request) => {
	if (!isPublicRoute(request)) {
		auth().protect();
	}
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
