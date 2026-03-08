import Image from 'next/image';
import { useState } from 'react';

type OptimizedImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
};

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 80,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Default sizes based on image purpose (extracted from path)
  const getDefaultDimensions = () => {
    if (src.includes('hero')) {
      return { width: 1920, height: 800 };
    } else if (src.includes('team')) {
      return { width: 400, height: 400 };
    } else {
      return { width: 800, height: 600 };
    }
  };

  const { width: defaultWidth, height: defaultHeight } = getDefaultDimensions();
  const imgWidth = width || defaultWidth;
  const imgHeight = height || defaultHeight;

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: imgWidth, 
        height: imgHeight, 
        backgroundColor: '#f3f4f6',
        overflow: 'hidden'
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill={true}
        quality={quality}
        sizes={sizes}
        style={{ 
          objectFit: 'cover', 
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
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