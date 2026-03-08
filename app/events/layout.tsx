import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Zee's Street Eats - Food Truck Events in Manchester",
  description: 'Join us at our upcoming food truck events across Manchester. Experience the best street food, vibrant atmosphere, and amazing flavors.',
  openGraph: {
    images: ['/images/events/hero-banner.jpg'],
  },
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 