'use client';

import { useState } from 'react';
import ImagePlaceholder from '@/components/ImagePlaceholder';

export default function ImageDemo() {
  const [selectedImage, setSelectedImage] = useState<string>('/images/placeholder.jpg');
  
  // Images from the New folder (4)
  const availableImages = [
    '/images/placeholder.jpg',
    // Add paths to your other images here when you copy them to the public folder
    // For example:
    // '/images/image1.jpg',
    // '/images/image2.webp',
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Image Placeholder Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Current Image</h2>
          <ImagePlaceholder
            src={selectedImage}
            alt="Selected image"
            width={500}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Images</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {availableImages.map((src, index) => (
              <div
                key={index}
                className={`cursor-pointer p-1 rounded ${
                  selectedImage === src ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedImage(src)}
              >
                <ImagePlaceholder
                  src={src}
                  alt={`Image ${index + 1}`}
                  width={150}
                  height={100}
                  className="rounded"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Upload Your Own Image</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p className="text-gray-500 mb-2">Upload a file or paste an image URL</p>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 mb-4
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const url = URL.createObjectURL(e.target.files[0]);
                    setSelectedImage(url);
                  }
                }}
              />
              <p className="text-gray-500 mb-2">OR</p>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter image URL"
                  className="flex-1 border border-gray-300 rounded-l-md px-4 py-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setSelectedImage(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button
                  className="bg-blue-600 text-white rounded-r-md px-4 py-2"
                  onClick={(e) => {
                    const input = e.currentTarget.previousSibling as HTMLInputElement;
                    if (input.value) {
                      setSelectedImage(input.value);
                      input.value = '';
                    }
                  }}
                >
                  Load
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 