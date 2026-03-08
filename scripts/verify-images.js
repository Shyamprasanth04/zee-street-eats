const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const images = [
  'taco-titan.jpg',
  'bao-boss.jpg',
  'fry-fiend.jpg',
  'jerk-junkie.jpg'
];

async function verifyImage(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata();
    const fileSize = fs.statSync(imagePath).size / 1024; // Size in KB
    
    console.log(`\nChecking ${path.basename(imagePath)}:`);
    console.log(`Dimensions: ${metadata.width}x${metadata.height}`);
    console.log(`File Size: ${fileSize.toFixed(2)}KB`);
    console.log(`Format: ${metadata.format}`);
    console.log(`Channels: ${metadata.channels}`);
    
    // Check if image meets requirements
    if (metadata.width < 800 || metadata.height < 800) {
      console.log('⚠️ Warning: Image is smaller than recommended 800x800px');
    }
    if (fileSize > 1000) {
      console.log('⚠️ Warning: Image size is larger than recommended 1MB');
    }
    
    return {
      name: path.basename(imagePath),
      width: metadata.width,
      height: metadata.height,
      size: fileSize,
      format: metadata.format
    };
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error.message);
    return null;
  }
}

async function verifyAllImages() {
  console.log('Verifying all images...');
  const results = [];
  
  for (const image of images) {
    const imagePath = path.join(__dirname, '../public/images', image);
    const result = await verifyImage(imagePath);
    if (result) results.push(result);
  }
  
  console.log('\nSummary:');
  results.forEach(result => {
    console.log(`\n${result.name}:`);
    console.log(`- Dimensions: ${result.width}x${result.height}`);
    console.log(`- Size: ${result.size.toFixed(2)}KB`);
    console.log(`- Format: ${result.format}`);
  });
}

verifyAllImages().catch(console.error); 