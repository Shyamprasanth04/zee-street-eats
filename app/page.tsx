'use client'

import Link from 'next/link'
import { Suspense, useState, useEffect } from 'react'
import Loading from './components/Loading'
import { ErrorBoundary } from './components/ErrorBoundary'
import ImageWithFallback from './components/ImageWithFallback'
import Countdown from './components/Countdown'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// Define upcoming events
const upcomingEvents = [
  {
    name: 'Northern Food Fest',
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    location: 'Manchester City Centre',
    description: 'Join us for a celebration of Northern cuisine with live music and special guest chefs.'
  },
  {
    name: 'Summer Street Food Market',
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    location: 'Castlefield Bowl',
    description: 'Experience the best of summer street food with our curated selection of vendors.'
  },
  {
    name: 'Food Truck Festival',
    date: new Date(new Date().setDate(new Date().getDate() + 14)),
    location: 'MediaCityUK',
    description: 'The biggest food truck gathering in Manchester, featuring over 20 vendors.'
  }
]

// Get the next upcoming event
const nextEvent = upcomingEvents.find(event => event.date > new Date()) || upcomingEvents[0]

const vendors = [
  {
    id: 'curry-king',
    name: 'Curry King',
    price: '£8-12',
    description: 'Authentic Indian Cuisine',
    images: [
      '/images/vendors/curry-king.jpg',
      '/images/vendors/chicken-tikka.jpg',
      '/images/vendors/lamb-rogan.jpg'
    ]
  },
  {
    id: 'noodle-ninja',
    name: 'Noodle Ninja',
    price: '£7-10',
    description: 'Asian Fusion Noodles',
    images: [
      '/images/vendors/noodle-ninja.jpg',
      '/images/vendors/pad-thai.jpg',
      '/images/vendors/ramen.jpg'
    ]
  },
  {
    id: 'burger-beast',
    name: 'Burger Beast',
    price: '£8-12',
    description: 'Gourmet Burgers',
    images: [
      '/images/vendors/burger-beast.jpg',
      '/images/vendors/beast-burger.jpg',
      '/images/vendors/veggie-beast.jpg'
    ]
  },
  {
    id: 'jerk-junkie',
    name: 'Jerk Junkie',
    price: '£8-15',
    description: 'Caribbean Flavors',
    images: [
      '/images/vendors/jerk-junkie.jpg',
      '/images/vendors/jerk-chicken.jpg',
      '/images/vendors/curry-goat.jpg'
    ]
  },
  {
    id: 'pizza-prince',
    name: 'Pizza Prince',
    price: '£10-15',
    description: 'Artisanal Pizzas',
    images: [
      '/images/vendors/pizza-prince.jpg',
      '/images/vendors/northern-special.jpg',
      '/images/vendors/truffle-shuffle.jpg'
    ]
  }
]

function VendorCard({ vendor }: { vendor: { 
  id: string; 
  name: string; 
  price: string; 
  description: string;
  images: string[];
}}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          credentials: 'include',
        });
        setIsAuthenticated(response.ok);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % vendor.images.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [vendor.images, isHovered]);

  const handleImageSelect = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative overflow-hidden bg-zee-dark/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 hover:border-zee-yellow/30 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-80 w-full overflow-hidden rounded-t-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <ImageWithFallback
              src={vendor.images[currentImageIndex]}
              alt={`${vendor.name} - ${vendor.description}`}
              className="object-cover transition-all duration-500 group-hover:scale-110"
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {vendor.images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-zee-yellow w-4' 
                  : 'bg-gray-400/50 hover:bg-gray-300'
              }`}
              onClick={() => handleImageSelect(index)}
              aria-label={`Show image ${index + 1} of ${vendor.images.length}`}
            />
          ))}
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-playfair font-bold text-zee-yellow mb-2 group-hover:text-amber-500 transition-colors duration-300">
          {vendor.name}
        </h3>
        <p className="text-gray-300 mb-6">{vendor.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-zee-yellow font-semibold">{vendor.price}</span>
          <Link 
            href={isAuthenticated ? `/pre-order?vendor=${vendor.id}` : `/signin?redirect=/pre-order?vendor=${vendor.id}`}
            className="btn-primary py-3 px-6 group-hover:bg-amber-500 group-hover:border-amber-500 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-amber-700/30"
            aria-label={`Pre-order from ${vendor.name}`}
          >
            Pre-Order
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// Add this new component for the countdown display
function CountdownDisplay({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    // Initial calculation
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zee-dark/30 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-zee-yellow/30 transition-all duration-300"
      >
        <div className="text-3xl font-bold text-zee-yellow">{formatNumber(timeLeft.days)}</div>
        <div className="text-sm text-gray-400">Days</div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-zee-dark/30 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-zee-yellow/30 transition-all duration-300"
      >
        <div className="text-3xl font-bold text-zee-yellow">{formatNumber(timeLeft.hours)}</div>
        <div className="text-sm text-gray-400">Hours</div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-zee-dark/30 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-zee-yellow/30 transition-all duration-300"
      >
        <div className="text-3xl font-bold text-zee-yellow">{formatNumber(timeLeft.minutes)}</div>
        <div className="text-sm text-gray-400">Minutes</div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-zee-dark/30 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-zee-yellow/30 transition-all duration-300"
      >
        <div className="text-3xl font-bold text-zee-yellow">{formatNumber(timeLeft.seconds)}</div>
        <div className="text-sm text-gray-400">Seconds</div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dbStatus, setDbStatus] = useState<{
    status: 'loading' | 'connected' | 'error';
    message?: string;
  }>({ status: 'loading' });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  useEffect(() => {
    // Check database connection
    const checkDb = async () => {
      try {
        const res = await fetch('/api/test-db');
        const data = await res.json();
        if (data.status === 'ok') {
          setDbStatus({ status: 'connected' });
        } else {
          setDbStatus({ 
            status: 'error', 
            message: data.error || 'Unknown database error' 
          });
        }
      } catch (error) {
        setDbStatus({ 
          status: 'error', 
          message: error instanceof Error ? error.message : 'Failed to check database' 
        });
      }
    };
    
    checkDb();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          credentials: 'include',
        });
        setIsAuthenticated(response.ok);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <main className="min-h-screen bg-zee-dark relative overflow-hidden">
      <div className="relative">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-zee-dark via-black to-black">
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16">
            <motion.div 
              style={{ y }}
              className="absolute inset-0 z-0"
            >
              <ImageWithFallback
                src="/images/video-poster.jpg"
                alt="Zee's Street Eats Food Trucks"
                className="object-cover object-center scale-105"
                priority
                quality={85}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="container-custom relative z-10 text-center px-4 my-10"
            >
              <div className="max-w-4xl mx-auto">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl sm:text-7xl lg:text-8xl font-playfair font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zee-yellow via-amber-500 to-zee-yellow animate-gradient"
                >
                  Zee's Street Eats
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                  Experience the best street food in Manchester. From spicy tacos to juicy bao buns, we bring the flavors of the world to your neighborhood.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mb-12 bg-zee-dark/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10"
                >
                  <h3 className="text-2xl font-playfair font-bold text-zee-yellow mb-4">
                    {nextEvent.name}
                  </h3>
                  <CountdownDisplay targetDate={nextEvent.date} />
                  <p className="text-gray-400 mt-4">
                    Location: {nextEvent.location}
                  </p>
                  <p className="text-gray-300 mt-2 text-sm">
                    {nextEvent.description}
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10"
                >
                  <Link 
                    href={isAuthenticated ? '/pre-order' : '/signin?redirect=/pre-order'}
                    className="btn-primary text-lg px-8 py-4 w-full sm:w-auto hover:bg-amber-500 hover:border-amber-500 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-amber-700/30"
                    aria-label="Pre-order your food now"
                  >
                    Pre-Order Now
                  </Link>
                  <Link 
                    href="/events" 
                    className="text-gray-200 hover:text-zee-yellow transition-colors duration-300 text-lg px-8 py-4 w-full sm:w-auto border border-zee-yellow/30 hover:border-zee-yellow rounded-lg backdrop-blur-sm bg-zee-dark/40 font-semibold shadow-lg hover:shadow-amber-700/30"
                    aria-label="View upcoming events"
                  >
                    View All Events
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              style={{ opacity }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg
                  className="w-6 h-6 text-zee-yellow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </section>
        </div>

        {/* Vendor Showcase */}
        <section className="section py-20" aria-labelledby="vendor-heading">
          <div className="container-custom">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 id="vendor-heading" className="text-4xl font-playfair font-bold mb-4 text-zee-yellow">Meet The Crew</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our talented team of food truck owners bring their unique flavors and passion to every dish.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  {vendors.map((vendor, index) => (
                    <VendorCard key={vendor.id} vendor={vendor} />
                  ))}
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </section>

        {/* Database Status Indicator - Only visible in production for debugging */}
        {process.env.NODE_ENV === 'production' && (
          <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-full z-50 text-white text-sm flex items-center gap-2 ${
            dbStatus.status === 'connected' ? 'bg-green-600' : 
            dbStatus.status === 'error' ? 'bg-red-600' : 'bg-yellow-600'
          }`}>
            <div className={`w-3 h-3 rounded-full ${
              dbStatus.status === 'connected' ? 'bg-green-300' : 
              dbStatus.status === 'error' ? 'bg-red-300' : 'bg-yellow-300'
            }`}></div>
            {dbStatus.status === 'connected' ? 'Database Connected' : 
             dbStatus.status === 'error' ? `Database Error: ${dbStatus.message?.substring(0, 50)}...` : 
             'Checking Database...'}
          </div>
        )}
      </div>
    </main>
  )
} 