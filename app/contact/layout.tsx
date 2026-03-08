import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact Zee's Street Eats",
  description: 'Get in touch with us for catering inquiries, event bookings, or general questions.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 