import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Only handle /skool route
  if (request.nextUrl.pathname === "/skool") {
    // Capture tracking data
    const trackingData = {
      timestamp: new Date().toISOString(),
      referrer: request.headers.get("referer") || "direct",
      userAgent: request.headers.get("user-agent") || "unknown",
      source: request.nextUrl.searchParams.get("source") ||
              request.nextUrl.searchParams.get("utm_source") || "unknown",
      medium: request.nextUrl.searchParams.get("medium") ||
              request.nextUrl.searchParams.get("utm_medium") || "unknown",
      campaign: request.nextUrl.searchParams.get("campaign") ||
                request.nextUrl.searchParams.get("utm_campaign") || "unknown",
      url: request.url,
      ip: request.ip || request.headers.get("x-forwarded-for") || "unknown",
    }

    // Log tracking data to Vercel Runtime Logs
    console.log("📊 Affiliate click tracked:", JSON.stringify(trackingData, null, 2))

    // Immediate redirect
    return NextResponse.redirect("https://www.skool.com/signup?ref=140ae4676486437a8baf431fe7e556a3", 307)
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/skool",
}
