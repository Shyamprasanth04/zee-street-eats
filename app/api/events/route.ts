import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Helper function to read events data
const readEventsData = () => {
  const filePath = path.join(process.cwd(), 'data', 'events.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents)
}

// Helper function to write events data
const writeEventsData = (data: any) => {
  const filePath = path.join(process.cwd(), 'data', 'events.json')
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// GET /api/events
export async function GET() {
  try {
    const data = readEventsData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

// POST /api/events
export async function POST(request: Request) {
  try {
    const newEvent = await request.json()
    const data = readEventsData()
    
    // Add new event
    data.events.push({
      ...newEvent,
      id: `event-${Date.now()}`,
      status: 'upcoming'
    })
    
    writeEventsData(data)
    return NextResponse.json(newEvent)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}

// PUT /api/events
export async function PUT(request: Request) {
  try {
    const updatedEvent = await request.json()
    const data = readEventsData()
    
    // Update event
    const index = data.events.findIndex((e: any) => e.id === updatedEvent.id)
    if (index === -1) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }
    
    data.events[index] = updatedEvent
    writeEventsData(data)
    return NextResponse.json(updatedEvent)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    )
  }
}

// DELETE /api/events
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const data = readEventsData()
    
    // Remove event
    data.events = data.events.filter((e: any) => e.id !== id)
    writeEventsData(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    )
  }
} 