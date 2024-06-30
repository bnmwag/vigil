import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  const hostname = req.headers;

  const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  const customSubDomain = hostname.get("host")?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`).filter(Boolean)[0];

  if (customSubDomain) {
    return NextResponse.rewrite(new URL(`/${customSubDomain.slice(0, -1)}${pathWithSearchParams}`, req.url));
  }

  if (url.pathname === "/" || (url.pathname === "/site" && url.host === process.env.NEXT_PUBLIC_DOMAIN)) {
    return NextResponse.rewrite(new URL("/site", req.url));
  }
}
1;

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
