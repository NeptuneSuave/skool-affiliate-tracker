"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate newsletter subscription
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSubscribed(true)
    console.log("[v0] Newsletter subscription for:", email)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/images/gradient-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute inset-0 opacity-0"
        style={{
          background: "rgba(0, 0, 0, 0.15)",
        }}
      ></div>

      {/* Floating glass orbs for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-50 animate-pulse"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
          }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full opacity-40 animate-pulse delay-1000"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
          }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full opacity-45 animate-pulse delay-500"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
          }}
        ></div>
      </div>

      <Card
        className="max-w-md hover-lift shadow-2xl relative z-10 opacity-100 w-[126%] mx-[0] border-transparent"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(40px) saturate(250%)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow:
            "0 32px 80px rgba(0, 0, 0, 0.3), 0 16px 64px rgba(255, 255, 255, 0.2), inset 0 3px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(255, 255, 255, 0.3)",
        }}
      >
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold font-sans text-card-foreground">
            Camera Confidence{" "}
            <span className="inline-block">
              <span style={{ color: "#1E1EE6" }}>L</span>
              <span style={{ color: "#D4A017" }}>a</span>
              <span style={{ color: "#E61E2A" }}>b</span>
            </span>
          </CardTitle>
          <div className="text-lg font-semibold text-card-foreground/90 font-sans mb-2">
            31 Days. 5 Minutes. 4 Elements. 1 You.
          </div>
          <CardDescription className="text-card-foreground/70 font-sans">
            {isSubscribed
              ? "Welcome to the community! Check your email for your first confidence-building exercise."
              : "Join busy entrepreneurs, coaches & creators who are building camera confidence in just 5 minutes a day."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {!isSubscribed ? (
            <>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-card-foreground font-sans">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email to start your journey"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-white/40 bg-white/10 placeholder:text-card-foreground/50 text-card-foreground py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-200"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full ripple-effect hover-lift font-sans font-bold py-5 transition-all duration-300"
                  style={{ backgroundColor: "#0C115B", color: "white" }}
                  disabled={isLoading}
                >
                  {isLoading ? "Joining..." : "Start My 31-Day Journey"}
                </Button>
              </form>

              <div className="space-y-3 pt-2">
                <div className="text-center">
                  <p className="text-xs text-card-foreground/60 font-sans mb-3">Transform from nervous to confident:</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-card-foreground/80">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <span className="font-sans">Daily 5-minute confidence exercises</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-card-foreground/80">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <span className="font-sans">Proven 4-element framework</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-card-foreground/80">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <span className="font-sans">Community support & feedback</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-card-foreground/80">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <span className="font-sans">From camera-shy to confident in 31 days</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Success state with Camera Confidence Lab specific messaging */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-card-foreground font-sans">Welcome to the Lab!</h3>
                <p className="text-sm text-card-foreground/70 font-sans">
                  Your 31-day camera confidence journey starts now. Check your email for Day 1 of your transformation.
                </p>
              </div>
            </div>
          )}

          <div className="text-center">
            <p className="text-xs text-card-foreground/50 font-sans">
              No spam, ever. Unsubscribe anytime with one click.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
