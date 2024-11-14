const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const Student = require('./models/Student'); // Adjust path to your Student model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.qid1l.mongodb.net/studentsDB?retryWrites=true&w=majority`)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up Multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');  // Save uploaded files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save file with its original name
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10MB
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(csv)$/)) {
      return cb(new Error('Only CSV files are allowed'), false);
    }
    cb(null, true);
  },
});

// Route for uploading CSV files and inserting data into MongoDB
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Log file received by Multer
    console.log('File received:', req.file);  // This will help to debug if the file is being received correctly

    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).send('No file uploaded');
    }

    const results = [];
    const filePath = path.join(__dirname, 'uploads', req.file.filename); // Get the uploaded file path

    // Log the file path for debugging
    console.log('File path:', filePath);

    fs.createReadStream(filePath)
      .pipe(csv())  // Parse CSV file
      .on('data', (data) => {
        console.log('CSV Data:', data); // Log the data being parsed from CSV
        results.push({
          name: data.name,
          age: parseInt(data.age),
          grade: data.grade,
        });
      })
      .on('end', async () => {
        try {
          await Student.insertMany(results); // Insert parsed data into MongoDB
          res.status(200).send('CSV data uploaded and saved successfully');
        } catch (err) {
          console.error('Error saving data to MongoDB:', err);
          res.status(500).send('Error saving data to MongoDB');
        }
      })
      .on('error', (err) => {
        console.error('Error processing CSV file:', err);
        res.status(500).send('Error processing CSV file');
      });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).send('Error uploading file');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
