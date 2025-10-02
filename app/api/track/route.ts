import { NextRequest, NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Create logs directory if it doesn't exist
    const logsDir = path.join(process.cwd(), "logs")
    if (!existsSync(logsDir)) {
      await mkdir(logsDir, { recursive: true })
    }

    const logFile = path.join(logsDir, "traffic.json")

    // Read existing logs or create empty array
    let logs = []
    if (existsSync(logFile)) {
      const fileContent = await readFile(logFile, "utf-8")
      logs = JSON.parse(fileContent)
    }

    // Add new tracking data
    logs.push(data)

    // Write updated logs
    await writeFile(logFile, JSON.stringify(logs, null, 2))

    return NextResponse.json({ success: true, message: "Tracking data saved" })
  } catch (error) {
    console.error("Error saving tracking data:", error)
    return NextResponse.json({ success: false, error: "Failed to save tracking data" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const logFile = path.join(process.cwd(), "logs", "traffic.json")

    if (!existsSync(logFile)) {
      return NextResponse.json([])
    }

    const fileContent = await readFile(logFile, "utf-8")
    const logs = JSON.parse(fileContent)

    // Calculate basic metrics
    const metrics = {
      totalClicks: logs.length,
      sources: logs.reduce((acc: any, log: any) => {
        acc[log.source] = (acc[log.source] || 0) + 1
        return acc
      }, {}),
      referrers: logs.reduce((acc: any, log: any) => {
        acc[log.referrer] = (acc[log.referrer] || 0) + 1
        return acc
      }, {}),
      campaigns: logs.reduce((acc: any, log: any) => {
        acc[log.campaign] = (acc[log.campaign] || 0) + 1
        return acc
      }, {}),
      recentClicks: logs.slice(-10),
    }

    return NextResponse.json(metrics)
  } catch (error) {
    console.error("Error reading tracking data:", error)
    return NextResponse.json({ error: "Failed to read tracking data" }, { status: 500 })
  }
}
