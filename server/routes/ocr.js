const express = require('express'); 
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const router = express.Router();

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '../ocr/uploads/');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Save to the specified upload directory
  },
  filename: (req, file, cb) => {
    cb(null, 'latest.jpg');  // Always overwrite with the same filename
  }
});

const upload = multer({ storage });

// POST endpoint to handle image upload and OCR processing
router.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = path.join(uploadDir, 'latest.jpg');  // Path to the uploaded image
  const scriptPath = path.resolve(__dirname, '../ocr/main.py');  // Path to the Python OCR script

  const command = `python "${scriptPath}" "${imagePath}"`;
  console.log('Executing command:', command);

  // Execute the Python script for OCR processing
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('OCR execution error:', stderr);
      return res.status(500).json({ error: 'OCR processing failed', details: stderr });
    }

    console.log('OCR executed successfully. Output:', stdout);

    // Path to the generated JSON result
    const resultPath = path.resolve(__dirname, '../ocr/ocr_word_info.json');

    // Read the OCR result JSON file
    fs.readFile(resultPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Failed to read OCR result JSON:', err);
        return res.status(500).json({ error: 'Failed to read OCR result' });
      }

      try {
        const result = JSON.parse(data);
        res.json({ words: result });  // Send the parsed JSON data to the frontend
      } catch (parseErr) {
        console.error('Failed to parse OCR result JSON:', parseErr);
        res.status(500).json({ error: 'Failed to parse OCR result' });
      }
    });
  });
});

module.exports = router;