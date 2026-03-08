import Image from 'next/image';
import { useState } from 'react';

type ImagePlaceholderProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  fallbackSrc?: string;
};

export default function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  className = '',
  objectFit = 'cover',
  priority = false,
  fallbackSrc = '/images/placeholder.jpg',
}: ImagePlaceholderProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || 'auto', 
        backgroundColor: '#f3f4f6' // Light gray placeholder background
      }}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill={true}
        style={{ 
          objectFit, 
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        onError={() => setImgSrc(fallbackSrc)}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
      )}
    </div>
  );
} 