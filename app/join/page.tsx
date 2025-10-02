"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

function JoinPageContent() {
  const searchParams = useSearchParams()

  useEffect(() => {
    // Capture traffic source data
    const trackingData = {
      timestamp: new Date().toISOString(),
      referrer: document.referrer || "direct",
      userAgent: navigator.userAgent,
      source: searchParams.get("source") || searchParams.get("utm_source") || "unknown",
      medium: searchParams.get("medium") || searchParams.get("utm_medium") || "unknown",
      campaign: searchParams.get("campaign") || searchParams.get("utm_campaign") || "unknown",
      url: window.location.href,
    }

    // Log to console (can be replaced with analytics service)
    console.log("Traffic tracking:", trackingData)

    // Send to analytics endpoint
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trackingData),
    }).catch((err) => console.error("Tracking error:", err))

    // Redirect immediately after tracking
    window.location.href = "https://www.skool.com/signup?ref=140ae4676486437a8baf431fe7e556a3"
  }, [searchParams])

  return null
}

export default function JoinPage() {
  return (
    <Suspense fallback={null}>
      <JoinPageContent />
    </Suspense>
  )
}
