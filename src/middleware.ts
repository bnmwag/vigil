import { type NextRequest, NextResponse } from "next/server";
import { marketingRoutes, marketingRoutPrefix } from "./routes";

export function middleware(req: NextRequest) {
  const { nextUrl: url, headers } = req;
  const searchParams = url.searchParams.toString();
  const hostname = headers.get("host");
  const pathWithSearchParams = `${url.pathname}${searchParams ? `?${searchParams}` : ""}`;
  
  if (hostname && process.env.NEXT_PUBLIC_DOMAIN) {
    const customSubDomain = hostname.split(process.env.NEXT_PUBLIC_DOMAIN).filter(Boolean)[0];
    if (customSubDomain) {
      const newUrl = new URL(`/${customSubDomain.slice(0, -1)}${pathWithSearchParams}`, req.url);
      return NextResponse.rewrite(newUrl);
    }
  }

  const pathname = url.pathname.replace(marketingRoutPrefix, "") || "/";
  const isMarketingRoute = url.pathname.startsWith(marketingRoutPrefix);
  
  if (isMarketingRoute) {
    return NextResponse.redirect(new URL(pathname, req.url));
  }

  const noPrefixMarketingRoutes = marketingRoutes.map(route => route.replace(marketingRoutPrefix, ""));
  const isNoPrefixMarketingRoute = noPrefixMarketingRoutes.includes(pathname) && url.host === process.env.NEXT_PUBLIC_DOMAIN;
  
  if (pathname === "/" || isNoPrefixMarketingRoute) {
    const newPath = pathname === "/" ? "/site" : `/site/${pathname.startsWith("/") ? pathname.slice(1) : pathname}`;
    return NextResponse.rewrite(new URL(newPath, req.url));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
