'use client';

import Image from 'next/image';

export default function AboutImagesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">About Page Images (Optimized)</h1>
      
      {/* Hero Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Hero Banner</h2>
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-md">
          <Image 
            src="/images/about/hero.jpg"
            alt="About Us Hero"
            fill
            priority={true}
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
            quality={85}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Next.js automatically optimizes this 3.2MB image on-the-fly
        </p>
      </section>
      
      {/* Other About Sections */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Beginning</h2>
          <div className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-md">
            <Image 
              src="/images/about/beginning.jpg"
              alt="Our Beginning"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Journey</h2>
          <div className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-md">
            <Image 
              src="/images/about/journey.jpg"
              alt="Our Journey"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-md">
          <Image 
            src="/images/about/mission.jpg"
            alt="Our Mission"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 1024px"
          />
        </div>
      </section>
      
      {/* Team Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="relative w-[250px] h-[250px] mx-auto rounded-full overflow-hidden shadow-md">
              <Image 
                src="/images/about/team/zee-khan.jpg"
                alt="Zee Khan"
                fill
                style={{ objectFit: 'cover' }}
                sizes="250px"
              />
            </div>
            <h3 className="mt-4 text-xl font-medium">Zee Khan</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          
          {/* Team Member 2 */}
          <div className="text-center">
            <div className="relative w-[250px] h-[250px] mx-auto rounded-full overflow-hidden shadow-md">
              <Image 
                src="/images/about/team/sarah-chen.jpg"
                alt="Sarah Chen"
                fill
                style={{ objectFit: 'cover' }}
                sizes="250px"
              />
            </div>
            <h3 className="mt-4 text-xl font-medium">Sarah Chen</h3>
            <p className="text-gray-600">Head of Operations</p>
          </div>
          
          {/* Team Member 3 */}
          <div className="text-center">
            <div className="relative w-[250px] h-[250px] mx-auto rounded-full overflow-hidden shadow-md">
              <Image 
                src="/images/about/team/marcus-rodriguez.jpg"
                alt="Marcus Rodriguez"
                fill
                style={{ objectFit: 'cover' }}
                sizes="250px"
              />
            </div>
            <h3 className="mt-4 text-xl font-medium">Marcus Rodriguez</h3>
            <p className="text-gray-600">Lead Developer</p>
          </div>
        </div>
      </section>
    </div>
  );
} 