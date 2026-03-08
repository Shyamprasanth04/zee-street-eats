import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Zee's Street Eats - Food Truck Madness",
  description: 'Best street grub in Manchester—tacos, bao, jerk. Find us, eat now.',
  keywords: 'street food, Manchester, food trucks, tacos, bao buns, jerk chicken',
  openGraph: {
    title: "Zee's Street Eats - Food Truck Madness",
    description: 'Best street grub in Manchester—tacos, bao, jerk. Find us, eat now.',
    images: [
      {
        url: '/images/video-poster.jpg',
        width: 1200,
        height: 630,
        alt: "Zee's Street Eats Food Trucks",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zee's Street Eats - Food Truck Madness",
    description: 'Best street grub in Manchester—tacos, bao, jerk. Find us, eat now.',
    images: ['/images/video-poster.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
} 