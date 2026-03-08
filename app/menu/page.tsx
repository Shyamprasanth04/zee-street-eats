'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ImageWithFallback from '../components/ImageWithFallback'

const vendors = [
  {
    name: 'Curry King',
    specialty: 'Indian Street Food',
    image: '/images/vendors/curry-king.jpg',
    items: [
      {
        name: 'Chicken Tikka Masala',
        description: 'Tender chicken in rich, creamy tomato sauce with basmati rice',
        price: '£11.99',
        image: '/images/vendors/chicken-tikka.jpg'
      },
      {
        name: 'Lamb Rogan Josh',
        description: 'Slow-cooked lamb in aromatic Kashmiri curry sauce',
        price: '£13.99',
        image: '/images/vendors/lamb-rogan.jpg'
      }
    ]
  },
  {
    name: 'Noodle Ninja',
    specialty: 'Pan-Asian',
    image: '/images/vendors/noodle-ninja.jpg',
    items: [
      {
        name: 'Pad Thai',
        description: 'Stir-fried rice noodles with prawns, tofu, and peanuts',
        price: '£10.99',
        image: '/images/vendors/pad-thai.jpg'
      },
      {
        name: 'Ramen Bowl',
        description: 'Rich pork broth with noodles, egg, and chashu pork',
        price: '£12.99',
        image: '/images/vendors/ramen.jpg'
      }
    ]
  },
  {
    name: 'Burger Beast',
    specialty: 'Gourmet Burgers',
    image: '/images/vendors/burger-beast.jpg',
    items: [
      {
        name: 'Beast Burger',
        description: 'Double beef patty with cheese, bacon, and special sauce',
        price: '£14.99',
        image: '/images/vendors/beast-burger.jpg'
      },
      {
        name: 'Veggie Beast',
        description: 'Plant-based patty with halloumi and roasted vegetables',
        price: '£12.99',
        image: '/images/vendors/veggie-beast.jpg'
      }
    ]
  },
  {
    name: 'Jerk Junkie',
    specialty: 'Caribbean',
    image: '/images/vendors/jerk-junkie.jpg',
    items: [
      {
        name: 'Jerk Chicken',
        description: 'Spicy marinated chicken with rice and peas',
        price: '£11.99',
        image: '/images/vendors/jerk-chicken.jpg'
      },
      {
        name: 'Curry Goat',
        description: 'Tender goat in rich Caribbean curry sauce',
        price: '£13.99',
        image: '/images/vendors/curry-goat.jpg'
      }
    ]
  },
  {
    name: 'Pizza Prince',
    specialty: 'Artisan Pizza',
    image: '/images/vendors/pizza-prince.jpg',
    items: [
      {
        name: 'Northern Special',
        description: 'Black pudding, chorizo, and caramelized onions',
        price: '£13.99',
        image: '/images/vendors/northern-special.jpg'
      },
      {
        name: 'Truffle Shuffle',
        description: 'Wild mushrooms, truffle oil, and mozzarella',
        price: '£15.99',
        image: '/images/vendors/truffle-shuffle.jpg'
      }
    ]
  }
]

function MenuItem({ item }: { item: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl bg-zee-dark/20 backdrop-blur-sm border border-white/10 hover:border-zee-yellow/30 transition-all duration-300 shadow-lg hover:shadow-zee-yellow/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-72 w-full overflow-hidden rounded-t-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={isHovered ? 'hover' : 'normal'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              className="object-cover transition-all duration-500 group-hover:scale-110"
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-2xl font-playfair font-bold text-zee-yellow group-hover:text-amber-500 transition-colors duration-300">
              {item.name}
            </h3>
            <span className="text-xl font-semibold text-zee-yellow bg-black/50 px-3 py-1 rounded-full">
              {item.price}
            </span>
          </div>
          <p className="text-gray-200 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function VendorSection({ vendor }: { vendor: any }) {
  return (
    <section className="mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="inline-block">
          <h2 className="text-4xl font-playfair font-bold text-zee-yellow mb-3">
            {vendor.name}
          </h2>
          <div className="h-1 w-20 bg-zee-yellow mx-auto rounded-full" />
        </div>
        <p className="text-gray-400 mt-4 text-lg">
          {vendor.specialty}
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {vendor.items.map((item: any, index: number) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    </section>
  )
}

export default function Menu() {
  return (
    <main className="min-h-screen bg-zee-dark relative">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/images/video-poster.jpg"
            alt="Zee's Street Eats Menu"
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
            Our Menu
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Explore our delicious street food offerings from around the world
          </motion.p>
        </motion.div>
      </section>

      {/* Menu Sections */}
      <section className="section py-24">
        <div className="container-custom">
          {vendors.map((vendor, index) => (
            <VendorSection key={index} vendor={vendor} />
          ))}
        </div>
      </section>
    </main>
  )
} 