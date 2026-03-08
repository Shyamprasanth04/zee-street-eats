import React from 'react';
import Image from 'next/image';

interface ImagePlaceholderProps {
  width?: number;
  height?: number;
  text?: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  width = 800,
  height = 600,
  text = 'Image Placeholder',
  className = '',
  bgColor = '#333',
  textColor = '#fff'
}) => {
  // Function to generate SVG data URL
  const generatePlaceholderSvg = () => {
    const svgContent = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bgColor}" />
        <text 
          x="50%" 
          y="50%" 
          font-family="Arial, sans-serif" 
          font-size="${width > 200 ? 36 : 20}px" 
          font-weight="bold"
          fill="${textColor}" 
          text-anchor="middle" 
          dominant-baseline="middle"
        >
          ${text}
        </text>
      </svg>
    `;
    
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      <Image
        src={generatePlaceholderSvg()}
        alt={text}
        width={width}
        height={height}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default ImagePlaceholder; 