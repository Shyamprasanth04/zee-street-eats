'use client';

import OptimizedImage from './OptimizedImage';

export default function ImageUsageExample() {
  return (
    <div className="space-y-8 py-8">
      <h1 className="text-3xl font-bold mb-6">About Page Images</h1>
      
      {/* Hero Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Hero Banner (optimized from 3.2MB, 5506×3671)</h2>
        <OptimizedImage 
          src="/images/about/hero.jpg"
          alt="About Us Hero"
          width={1200}
          height={500}
          priority={true}
          className="rounded-lg shadow-md"
        />
        <p className="mt-2 text-sm text-gray-500">
          Using Next.js Image optimization: Resized, compressed to 80% quality, responsive sizing
        </p>
      </section>
      
      {/* Other About Sections */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Beginning</h2>
          <OptimizedImage 
            src="/images/about/beginning.jpg"
            alt="Our Beginning"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Journey</h2>
          <OptimizedImage 
            src="/images/about/journey.jpg"
            alt="Our Journey"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
      </section>
      
      {/* Mission Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <OptimizedImage 
          src="/images/about/mission.jpg"
          alt="Our Mission"
          width={800}
          height={400}
          className="rounded-lg shadow-md"
        />
      </section>
      
      {/* Team Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <OptimizedImage 
              src="/images/about/team/zee-khan.jpg"
              alt="Zee Khan"
              width={250}
              height={250}
              className="rounded-full mx-auto shadow-md"
            />
            <h3 className="mt-4 text-xl font-medium">Zee Khan</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          
          {/* Team Member 2 */}
          <div className="text-center">
            <OptimizedImage 
              src="/images/about/team/sarah-chen.jpg"
              alt="Sarah Chen"
              width={250}
              height={250}
              className="rounded-full mx-auto shadow-md"
            />
            <h3 className="mt-4 text-xl font-medium">Sarah Chen</h3>
            <p className="text-gray-600">Head of Operations</p>
          </div>
          
          {/* Team Member 3 */}
          <div className="text-center">
            <OptimizedImage 
              src="/images/about/team/marcus-rodriguez.jpg"
              alt="Marcus Rodriguez"
              width={250}
              height={250}
              className="rounded-full mx-auto shadow-md"
            />
            <h3 className="mt-4 text-xl font-medium">Marcus Rodriguez</h3>
            <p className="text-gray-600">Lead Developer</p>
          </div>
        </div>
      </section>
    </div>
  );
} 