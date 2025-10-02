"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Metrics {
  totalClicks: number
  sources: Record<string, number>
  referrers: Record<string, number>
  campaigns: Record<string, number>
  recentClicks: any[]
}

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if already authenticated in session
    const auth = sessionStorage.getItem("analytics_auth")
    if (auth === "true") {
      setIsAuthenticated(true)
      fetchMetrics()
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchMetrics()
      const interval = setInterval(fetchMetrics, 30000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check - use environment variable in production
    if (password === process.env.NEXT_PUBLIC_ANALYTICS_PASSWORD || password === "admin123") {
      setIsAuthenticated(true)
      sessionStorage.setItem("analytics_auth", "true")
      setError("")
      setLoading(true)
    } else {
      setError("Incorrect password")
    }
  }

  const fetchMetrics = async () => {
    try {
      const response = await fetch("/api/track")
      const data = await response.json()
      setMetrics(data)
    } catch (error) {
      console.error("Failed to fetch metrics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Analytics Login</CardTitle>
            <CardDescription>Enter password to access analytics dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Traffic Analytics</h1>
          <button
            onClick={fetchMetrics}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>

        {/* Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Total affiliate link clicks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">{metrics?.totalClicks || 0}</div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(metrics?.sources || {}).map(([source, count]) => (
                  <div key={source} className="flex justify-between items-center">
                    <span className="font-medium">{source}</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{count}</span>
                  </div>
                ))}
                {Object.keys(metrics?.sources || {}).length === 0 && (
                  <p className="text-gray-500 text-sm">No data yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Referrers */}
          <Card>
            <CardHeader>
              <CardTitle>Referrers</CardTitle>
              <CardDescription>Sites referring traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(metrics?.referrers || {}).map(([referrer, count]) => (
                  <div key={referrer} className="flex justify-between items-center">
                    <span className="font-medium truncate max-w-[200px]">{referrer}</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{count}</span>
                  </div>
                ))}
                {Object.keys(metrics?.referrers || {}).length === 0 && (
                  <p className="text-gray-500 text-sm">No data yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Campaigns</CardTitle>
              <CardDescription>Campaign performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(metrics?.campaigns || {}).map(([campaign, count]) => (
                  <div key={campaign} className="flex justify-between items-center">
                    <span className="font-medium">{campaign}</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">{count}</span>
                  </div>
                ))}
                {Object.keys(metrics?.campaigns || {}).length === 0 && (
                  <p className="text-gray-500 text-sm">No data yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Clicks */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Clicks</CardTitle>
              <CardDescription>Latest 10 clicks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {metrics?.recentClicks?.map((click, index) => (
                  <div key={index} className="border-b pb-2 last:border-b-0">
                    <div className="text-sm font-medium">{click.source}</div>
                    <div className="text-xs text-gray-500">{new Date(click.timestamp).toLocaleString()}</div>
                  </div>
                ))}
                {!metrics?.recentClicks?.length && <p className="text-gray-500 text-sm">No clicks yet</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Basic link:</strong> <code className="bg-white px-2 py-1 rounded">/join</code>
            </p>
            <p>
              <strong>With source tracking:</strong>{" "}
              <code className="bg-white px-2 py-1 rounded">/join?source=facebook</code>
            </p>
            <p>
              <strong>With UTM parameters:</strong>{" "}
              <code className="bg-white px-2 py-1 rounded">
                /join?utm_source=email&utm_medium=newsletter&utm_campaign=launch
              </code>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
