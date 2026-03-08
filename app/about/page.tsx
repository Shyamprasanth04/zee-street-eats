'use client'

import { motion } from 'framer-motion'
import ImageWithFallback from '../components/ImageWithFallback'

const storySections = [
  {
    title: "Our Beginning",
    content: "Zee's Street Eats started as a small food stall in Manchester's Northern Quarter, serving authentic street food from around the world. Our founder, Zee, combined his passion for global cuisine with his love for Manchester's vibrant food scene.",
    image: "/images/about/beginning.jpg",
    position: "left"
  },
  {
    title: "The Journey",
    content: "What began as a single stall quickly grew into a beloved local institution. We've expanded our offerings while maintaining our commitment to quality, authenticity, and the community spirit that defines Manchester.",
    image: "/images/about/journey.jpg",
    position: "right"
  },
  {
    title: "Our Mission",
    content: "We're dedicated to bringing the world's street food to Manchester, creating a space where food lovers can explore global flavors while supporting local vendors and sustainable practices.",
    image: "/images/about/mission.jpg",
    position: "left"
  }
]

const teamMembers = [
  {
    name: "Zee Khan",
    role: "Founder & Head Chef",
    image: "/images/about/team/zee-khan.jpg",
    description: "With over 15 years of experience in the culinary world, Zee brings his passion for authentic street food to every dish."
  },
  {
    name: "Sarah Chen",
    role: "Operations Manager",
    image: "/images/about/team/sarah-chen.jpg",
    description: "Sarah ensures everything runs smoothly, from vendor coordination to customer experience."
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Events",
    image: "/images/about/team/marcus-rodriguez.jpg",
    description: "Marcus creates unforgettable food experiences through our carefully curated events and festivals."
  }
]

function StorySection({ section, index }: { section: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`flex flex-col ${section.position === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 mb-24`}
    >
      <div className="w-full md:w-1/2">
        <motion.div
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
        >
          <ImageWithFallback
            src={section.image}
            alt={section.title}
            className="object-cover"
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>
      </div>
      <div className="w-full md:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: section.position === 'right' ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
          className="space-y-6"
        >
          <div className="inline-block">
            <h2 className="text-3xl font-playfair font-bold text-zee-yellow mb-3">
              {section.title}
            </h2>
            <div className={`h-1 w-20 bg-zee-yellow ${section.position === 'right' ? 'ml-auto' : ''} rounded-full`} />
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            {section.content}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

function TeamMember({ member }: { member: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-xl">
        <ImageWithFallback
          src={member.image}
          alt={member.name}
          className="object-cover"
          quality={85}
          sizes="(max-width: 768px) 100vw, 33vw"
          fill
        />
      </div>
      <h3 className="text-2xl font-playfair font-bold text-zee-yellow mb-2">
        {member.name}
      </h3>
      <p className="text-gray-400 mb-4">{member.role}</p>
      <p className="text-gray-300 text-sm max-w-xs mx-auto">
        {member.description}
      </p>
    </motion.div>
  )
}

export default function About() {
  return (
    <main className="min-h-screen bg-zee-dark relative">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/images/about/hero.jpg"
            alt="About Zee's Street Eats"
            className="object-cover object-center"
            priority
            quality={75}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/30" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container-custom relative z-10 text-center px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zee-yellow via-amber-500 to-zee-yellow animate-gradient"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Discover the journey of Zee's Street Eats and our passion for bringing global flavors to Manchester
          </motion.p>
        </motion.div>
      </section>

      {/* Story Sections */}
      <section className="section py-24">
        <div className="container-custom">
          {storySections.map((section, index) => (
            <StorySection key={index} section={section} index={index} />
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-zee-dark/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block">
              <h2 className="text-4xl font-playfair font-bold text-zee-yellow mb-3">
                Meet Our Team
              </h2>
              <div className="h-1 w-20 bg-zee-yellow mx-auto rounded-full" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block">
              <h2 className="text-4xl font-playfair font-bold text-zee-yellow mb-3">
                Our Values
              </h2>
              <div className="h-1 w-20 bg-zee-yellow mx-auto rounded-full" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Quality",
                description: "We source the finest ingredients and maintain the highest standards in food preparation and service."
              },
              {
                title: "Community",
                description: "We're committed to supporting local vendors and creating a welcoming space for food lovers."
              },
              {
                title: "Sustainability",
                description: "We prioritize eco-friendly practices and sustainable sourcing in all our operations."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center p-8 rounded-2xl bg-zee-dark/20 backdrop-blur-sm border border-white/10 hover:border-zee-yellow/30 transition-all duration-300"
              >
                <h3 className="text-2xl font-playfair font-bold text-zee-yellow mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 