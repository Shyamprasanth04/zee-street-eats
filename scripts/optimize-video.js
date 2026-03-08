const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')

const videoPath = path.join(__dirname, '../public/videos/food-truck.mp4')
const tempPath = path.join(__dirname, '../public/videos/food-truck-temp.mp4')

// Check if input file exists
if (!fs.existsSync(videoPath)) {
  console.error('Video file not found')
  process.exit(1)
}

// Optimize video using ffmpeg
const command = `ffmpeg -i "${videoPath}" -vcodec libx264 -crf 28 -preset medium -acodec aac -b:a 128k "${tempPath}"`

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('Error optimizing video:', error)
    return
  }
  
  // Replace original with optimized version
  fs.unlinkSync(videoPath)
  fs.renameSync(tempPath, videoPath)
  
  console.log('Video optimized successfully!')
  console.log('New size:', fs.statSync(videoPath).size / 1024 / 1024, 'MB')
}) 