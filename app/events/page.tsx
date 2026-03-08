'use client'

import { useEffect, useState } from 'react'
import Countdown from '../components/Countdown'
import ImageWithFallback from '../components/ImageWithFallback'
import { motion, Variants } from 'framer-motion'

interface Event {
  id: string
  name: string
  date: string
  location: string
  description: string
  image: string
  badge: string
  status: string
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) throw new Error('Failed to fetch events')
        const data = await response.json()
        
        // Sort events by date
        const sortedEvents = data.events.sort((a: Event, b: Event) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        
        setEvents(sortedEvents)
      } catch (err) {
        console.error('Error fetching events:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const formatEventDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date')
      }
      return date
    } catch (err) {
      console.error('Error parsing date:', dateString, err)
      return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zee-yellow"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-bold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zee-dark to-black relative">
      {/* Hero Section */}
      <section className="relative h-[50vh] lg:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/images/events/hero-banner.jpg"
            alt="Zee's Street Eats Events"
            className="object-cover object-center scale-105"
            priority
            quality={90}
            sizes="100vw"
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
        </div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
          className="container-custom relative z-10 text-center px-4"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zee-yellow via-amber-500 to-zee-yellow animate-gradient">
            Upcoming Events
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join us for unforgettable food experiences across Manchester
          </p>
        </motion.div>
      </section>

      {/* Events List */}
      <section className="section py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {events.map((event, index) => {
              const eventDate = formatEventDate(event.date)
              if (!eventDate) return null // Skip invalid dates
              
              return (
                <motion.div
                  key={event.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/90 to-black/90 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                >
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 text-sm font-medium text-zee-yellow bg-black/80 rounded-full backdrop-blur-sm">
                      {event.badge}
                    </span>
                  </div>
                  <div className="relative h-72 w-full overflow-hidden">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.name}
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      fill
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  </div>
                  <div className="p-8 relative">
                    <h2 className="text-2xl lg:text-3xl font-playfair font-bold text-zee-yellow mb-3 group-hover:text-amber-500 transition-colors duration-300">
                      {event.name}
                    </h2>
                    <p className="text-gray-300 mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                      {event.description}
                    </p>
                    <div className="space-y-3 text-sm">
                      <p className="flex items-center text-gray-400">
                        <svg className="w-5 h-5 mr-2 text-zee-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </p>
                      <p className="flex items-center text-gray-400">
                        <svg className="w-5 h-5 mr-2 text-zee-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {eventDate.toLocaleDateString('en-GB', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long'
                        })}
                      </p>
                      <p className="flex items-center text-gray-400">
                        <svg className="w-5 h-5 mr-2 text-zee-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {eventDate.toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-800">
                      <Countdown targetDate={event.date} eventName={event.name} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
} 