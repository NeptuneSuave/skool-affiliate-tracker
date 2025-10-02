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

    // Log tracking data (you can also send to external service here)
    console.log("Affiliate click tracked:", trackingData)

    // Store in background (non-blocking)
    fetch(`${request.nextUrl.origin}/api/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trackingData),
    }).catch(() => {}) // Fire and forget

    // Immediate redirect
    return NextResponse.redirect("https://www.skool.com/signup?ref=140ae4676486437a8baf431fe7e556a3", 307)
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/skool",
}
