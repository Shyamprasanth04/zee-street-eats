const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Create events directory if it doesn't exist
const eventsDir = path.join(__dirname, '../public/images/events');
if (!fs.existsSync(eventsDir)) {
  fs.mkdirSync(eventsDir, { recursive: true });
}

// Image URLs and their target filenames
const images = [
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&h=1080&q=80',
    filename: 'hero-banner.jpg',
    width: 1920,
    height: 1080
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&h=600&q=80',
    filename: 'northern-fest.jpg',
    width: 800,
    height: 600
  },
  {
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&h=600&q=80',
    filename: 'summer-market.jpg',
    width: 800,
    height: 600
  },
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&h=600&q=80',
    filename: 'food-truck-fest.jpg',
    width: 800,
    height: 600
  }
];

// Function to download and process an image
async function downloadAndProcessImage(image) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(eventsDir, image.filename);
    
    // Download the image
    https.get(image.url, (response) => {
      const chunks = [];
      
      response.on('data', (chunk) => chunks.push(chunk));
      
      response.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        
        try {
          // Process the image with sharp
          await sharp(buffer)
            .resize(image.width, image.height, {
              fit: 'cover',
              position: 'center'
            })
            .jpeg({
              quality: 85,
              progressive: true
            })
            .toFile(filePath);
            
          console.log(`✅ Successfully processed ${image.filename}`);
          resolve();
        } catch (error) {
          console.error(`❌ Error processing ${image.filename}:`, error);
          reject(error);
        }
      });
    }).on('error', (error) => {
      console.error(`❌ Error downloading ${image.filename}:`, error);
      reject(error);
    });
  });
}

// Download and process all images
async function processAllImages() {
  console.log('🚀 Starting image download and processing...');
  
  for (const image of images) {
    try {
      await downloadAndProcessImage(image);
    } catch (error) {
      console.error(`Failed to process ${image.filename}`);
    }
  }
  
  console.log('✨ All images processed successfully!');
}

// Run the script
processAllImages(); 