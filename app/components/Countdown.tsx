'use client'

import { useState, useEffect } from 'react'

interface CountdownProps {
  targetDate: Date | string
  eventName: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export default function Countdown({ targetDate, eventName }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  })

  useEffect(() => {
    // Ensure we're working with a valid date
    const target = new Date(targetDate)
    
    if (isNaN(target.getTime())) {
      console.error('Invalid target date provided to Countdown component')
      return
    }

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = target.getTime() - now.getTime()
      
      // Calculate the time components
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds),
        isExpired: difference <= 0
      })
    }

    // Initial calculation
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    // Cleanup
    return () => clearInterval(timer)
  }, [targetDate])

  // Format the time values to always show two digits
  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0')
  }

  const eventDate = new Date(targetDate)

  if (isNaN(eventDate.getTime())) {
    return (
      <div className="bg-red-900/50 backdrop-blur-sm p-6 rounded-xl border border-red-800/50">
        <p className="text-red-400">Invalid event date</p>
      </div>
    )
  }

  return (
    <div className="bg-zee-dark/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50">
      <h2 className="text-2xl font-bold text-zee-yellow mb-2">{eventName}</h2>
      <p className="text-xl text-gray-300">
        {eventDate.toLocaleDateString('en-GB', { 
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
        {' at '}
        {eventDate.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
      
      {timeLeft.isExpired ? (
        <div className="mt-4 text-xl text-gray-400">
          Event starts soon
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-center space-x-4">
          <div className="text-center">
            <span className="text-3xl font-bold text-zee-yellow">{formatTime(timeLeft.days)}</span>
            <span className="block text-sm text-gray-400">Days</span>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold text-zee-yellow">{formatTime(timeLeft.hours)}</span>
            <span className="block text-sm text-gray-400">Hours</span>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold text-zee-yellow">{formatTime(timeLeft.minutes)}</span>
            <span className="block text-sm text-gray-400">Minutes</span>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold text-zee-yellow">{formatTime(timeLeft.seconds)}</span>
            <span className="block text-sm text-gray-400">Seconds</span>
          </div>
        </div>
      )}
    </div>
  )
} 