import { NextRequest, NextResponse } from "next/server";

const authPath = ["/login", "/register"];

export default function Middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const isAuthPath = authPath.some((path) => pathname.startsWith(path));

	const token = request.cookies.get("access_token")?.value;

	if (!token) {
		const loginUrl = new URL("/login", request.url);
		return NextResponse.redirect(loginUrl);
	}

	if (isAuthPath && token) {
		const homeUrl = new URL("/", request.url);
		return NextResponse.redirect(homeUrl);
	}

	return NextResponse.next();
}
