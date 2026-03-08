// Placeholder Image Generator for Vendor Images
// This script creates placeholder images for each vendor when real images are not available

document.addEventListener('DOMContentLoaded', function() {
  // Find all ImageWithFallback components that reference vendor images
  const images = document.querySelectorAll('img[src*="/images/vendors/"]');
  
  images.forEach(img => {
    const src = img.getAttribute('src');
    const filename = src.split('/').pop();
    const vendorName = getVendorNameFromFilename(filename);
    
    // Create canvas to generate placeholder
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // Fill with gradient based on vendor type
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    
    if (filename.includes('curry')) {
      // Curry King - Orange/Red gradient
      gradient.addColorStop(0, '#FF9800');
      gradient.addColorStop(1, '#F44336');
    } else if (filename.includes('noodle')) {
      // Noodle Ninja - Blue/Green gradient
      gradient.addColorStop(0, '#2196F3');
      gradient.addColorStop(1, '#4CAF50');
    } else if (filename.includes('burger')) {
      // Burger Beast - Brown/Red gradient
      gradient.addColorStop(0, '#795548');
      gradient.addColorStop(1, '#D32F2F');
    } else if (filename.includes('jerk')) {
      // Jerk Junkie - Yellow/Orange gradient
      gradient.addColorStop(0, '#FFEB3B');
      gradient.addColorStop(1, '#FF5722');
    } else if (filename.includes('pizza')) {
      // Pizza Prince - Red/Yellow gradient
      gradient.addColorStop(0, '#E53935');
      gradient.addColorStop(1, '#FFC107');
    } else if (filename.includes('dumpling')) {
      // Dumpling Duke - Green/Teal gradient
      gradient.addColorStop(0, '#4CAF50');
      gradient.addColorStop(1, '#009688');
    } else {
      // Default gradient
      gradient.addColorStop(0, '#9C27B0');
      gradient.addColorStop(1, '#2196F3');
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(vendorName, 400, 250);
    
    ctx.font = '30px Arial';
    ctx.fillText(filename, 400, 320);
    
    // Replace the image src with the canvas data URL
    img.src = canvas.toDataURL('image/jpeg');
  });
  
  function getVendorNameFromFilename(filename) {
    if (filename.includes('curry-king')) return 'Curry King';
    if (filename.includes('chicken-tikka')) return 'Curry King - Chicken Tikka';
    if (filename.includes('lamb-rogan')) return 'Curry King - Lamb Rogan';
    
    if (filename.includes('noodle-ninja')) return 'Noodle Ninja';
    if (filename.includes('pad-thai')) return 'Noodle Ninja - Pad Thai';
    if (filename.includes('ramen')) return 'Noodle Ninja - Ramen';
    
    if (filename.includes('burger-beast')) return 'Burger Beast';
    if (filename.includes('beast-burger')) return 'Burger Beast - Signature';
    if (filename.includes('veggie-beast')) return 'Burger Beast - Veggie';
    
    if (filename.includes('jerk-junkie')) return 'Jerk Junkie';
    if (filename.includes('jerk-chicken')) return 'Jerk Junkie - Chicken';
    if (filename.includes('curry-goat')) return 'Jerk Junkie - Curry Goat';
    
    if (filename.includes('pizza-prince')) return 'Pizza Prince';
    if (filename.includes('northern-special')) return 'Pizza Prince - Northern Special';
    if (filename.includes('truffle-shuffle')) return 'Pizza Prince - Truffle Shuffle';
    
    if (filename.includes('dumpling-duke')) return 'Dumpling Duke';
    if (filename.includes('pork-dumplings')) return 'Dumpling Duke - Pork';
    if (filename.includes('veggie-dumplings')) return 'Dumpling Duke - Veggie';
    
    return 'Vendor Placeholder';
  }
}); 