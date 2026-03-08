'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  fill?: boolean
  style?: React.CSSProperties
}

export default function ImageWithFallback({
  src,
  alt,
  className,
  priority,
  quality,
  sizes,
  fill = true,
  style
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [error, setError] = useState(false)

  // Extract name for placeholder
  const extractPlaceholderText = () => {
    // For vendor images, extract the name from the path
    if (src.includes('/vendors/')) {
      const filename = src.split('/').pop() || '';
      const name = filename.split('.')[0].replace(/-/g, ' ');
      return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    return alt;
  }

  // Determine background color based on the image path
  const getBgColor = () => {
    const path = src.toLowerCase();
    if (path.includes('curry')) return '#FF9800';
    if (path.includes('noodle')) return '#2196F3';
    if (path.includes('burger')) return '#795548';
    if (path.includes('jerk')) return '#FFEB3B';
    if (path.includes('pizza')) return '#E53935';
    return '#333333';
  }

  return (
    <div className="relative w-full h-full">
      {error ? (
        <div 
          className={`w-full h-full flex items-center justify-center ${className}`}
          style={{ backgroundColor: getBgColor() }}
        >
          <span className="text-white font-bold text-center px-2">
            {extractPlaceholderText()}
          </span>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={imgSrc}
            alt={alt}
            className={className}
            priority={priority}
            quality={quality}
            sizes={sizes}
            fill={fill}
            style={{ objectFit: 'cover', ...style }}
            onError={() => {
              setError(true);
            }}
            onLoad={() => {
              // Image loaded successfully
            }}
          />
        </div>
      )}
    </div>
  )
} 