import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Only handle /skool route
  if (request.nextUrl.pathname === "/skool") {
    // Extract source from referrer if not explicitly provided
    const referrer = request.headers.get("referer") || "direct"
    let autoSource = "direct"

    if (referrer !== "direct") {
      try {
        const refUrl = new URL(referrer)
        const hostname = refUrl.hostname.toLowerCase()

        // Auto-detect common platforms from referrer
        if (hostname.includes("reddit.com")) autoSource = "reddit"
        else if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) autoSource = "youtube"
        else if (hostname.includes("instagram.com")) autoSource = "instagram"
        else if (hostname.includes("facebook.com") || hostname.includes("fb.com")) autoSource = "facebook"
        else if (hostname.includes("twitter.com") || hostname.includes("x.com")) autoSource = "twitter"
        else if (hostname.includes("linkedin.com")) autoSource = "linkedin"
        else if (hostname.includes("tiktok.com")) autoSource = "tiktok"
        else if (hostname.includes("pinterest.com")) autoSource = "pinterest"
        else if (hostname.includes("discord.com") || hostname.includes("discord.gg")) autoSource = "discord"
        else if (hostname.includes("t.me") || hostname.includes("telegram")) autoSource = "telegram"
        else autoSource = hostname.replace("www.", "")
      } catch (e) {
        autoSource = "unknown"
      }
    }

    // Capture tracking data
    const trackingData = {
      timestamp: new Date().toISOString(),
      referrer: referrer,
      userAgent: request.headers.get("user-agent") || "unknown",
      source: request.nextUrl.searchParams.get("source") ||
              request.nextUrl.searchParams.get("utm_source") || autoSource,
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
