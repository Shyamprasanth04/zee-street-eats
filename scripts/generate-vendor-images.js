const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directory if it doesn't exist
const vendorDir = path.join(__dirname, '../public/images/vendors');
if (!fs.existsSync(vendorDir)) {
  fs.mkdirSync(vendorDir, { recursive: true });
}

// Define all images we need to create
const vendorImages = [
  // Curry King
  { filename: 'curry-king.jpg', name: 'Curry King', color: '#FF9800' },
  { filename: 'chicken-tikka.jpg', name: 'Chicken Tikka', color: '#FF9800' },
  { filename: 'lamb-rogan.jpg', name: 'Lamb Rogan', color: '#FF9800' },
  
  // Noodle Ninja
  { filename: 'noodle-ninja.jpg', name: 'Noodle Ninja', color: '#2196F3' },
  { filename: 'pad-thai.jpg', name: 'Pad Thai', color: '#2196F3' },
  { filename: 'ramen.jpg', name: 'Ramen', color: '#2196F3' },
  
  // Burger Beast
  { filename: 'burger-beast.jpg', name: 'Burger Beast', color: '#795548' },
  { filename: 'beast-burger.jpg', name: 'Beast Burger', color: '#795548' },
  { filename: 'veggie-beast.jpg', name: 'Veggie Beast', color: '#795548' },
  
  // Jerk Junkie
  { filename: 'jerk-junkie.jpg', name: 'Jerk Junkie', color: '#FFEB3B' },
  { filename: 'jerk-chicken.jpg', name: 'Jerk Chicken', color: '#FFEB3B' },
  { filename: 'curry-goat.jpg', name: 'Curry Goat', color: '#FFEB3B' },
  
  // Pizza Prince
  { filename: 'pizza-prince.jpg', name: 'Pizza Prince', color: '#E53935' },
  { filename: 'northern-special.jpg', name: 'Northern Special', color: '#E53935' },
  { filename: 'truffle-shuffle.jpg', name: 'Truffle Shuffle', color: '#E53935' },
  
  // Dumpling Duke
  { filename: 'dumpling-duke.jpg', name: 'Dumpling Duke', color: '#4CAF50' },
  { filename: 'pork-dumplings.jpg', name: 'Pork Dumplings', color: '#4CAF50' },
  { filename: 'veggie-dumplings.jpg', name: 'Veggie Dumplings', color: '#4CAF50' }
];

// Function to create a placeholder image
function createPlaceholderImage(filename, name, color) {
  // Create canvas
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Draw gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, darkenColor(color, 30));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add pattern for texture
  ctx.save();
  ctx.globalAlpha = 0.05;
  for (let i = 0; i < width; i += 20) {
    for (let j = 0; j < height; j += 20) {
      ctx.fillStyle = j % 40 === 0 ? '#FFF' : '#000';
      ctx.fillRect(i, j, 10, 10);
    }
  }
  ctx.restore();
  
  // Draw main text
  ctx.fillStyle = 'white';
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.fillText(name, width / 2, height / 2 - 30);
  
  // Draw secondary text
  ctx.font = '30px Arial';
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillText('Placeholder Image', width / 2, height / 2 + 40);
  
  // Save image
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
  fs.writeFileSync(path.join(vendorDir, filename), buffer);
  console.log(`Created ${filename}`);
}

// Helper to darken a color by a certain percentage
function darkenColor(hex, percent) {
  // Convert hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  
  // Darken
  r = Math.floor(r * (100 - percent) / 100);
  g = Math.floor(g * (100 - percent) / 100);
  b = Math.floor(b * (100 - percent) / 100);
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Create all placeholder images
vendorImages.forEach(image => {
  createPlaceholderImage(image.filename, image.name, image.color);
});

console.log('All placeholder images created successfully.'); 