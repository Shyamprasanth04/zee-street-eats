// Global placeholder.js - Add to public/images folder
// This script helps generate placeholder images for all missing images

document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit to make sure images have loaded or errored
  setTimeout(() => {
    // Create styled placeholders for any failed images
    document.querySelectorAll('img').forEach(img => {
      if (!img.complete || img.naturalHeight === 0) {
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt') || 'Image Placeholder';
        
        // Determine background color
        let bgColor = '#333333';
        if (src) {
          const path = src.toLowerCase();
          if (path.includes('curry')) bgColor = '#FF9800';
          if (path.includes('noodle')) bgColor = '#2196F3';
          if (path.includes('burger')) bgColor = '#795548';
          if (path.includes('jerk')) bgColor = '#FFEB3B';
          if (path.includes('pizza')) bgColor = '#E53935';
          if (path.includes('dumpling')) bgColor = '#4CAF50';
        }
        
        // Create SVG placeholder
        const width = img.width || 800;
        const height = img.height || 600;
        
        // Extract a nice label from the filename or path
        let label = alt;
        if (src && src.includes('/')) {
          const filename = src.split('/').pop() || '';
          if (filename) {
            label = filename.split('.')[0].replace(/-/g, ' ');
            label = label.split(' ').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
          }
        }
        
        const svgContent = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bgColor}" />
          <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24px" fill="white" text-anchor="middle" dominant-baseline="middle">${label}</text>
        </svg>
        `;
        
        const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
        img.src = dataUrl;
      }
    });
  }, 500);
}); 