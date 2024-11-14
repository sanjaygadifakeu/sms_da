require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const Student = require('./models/Student'); // Assuming you have a Student model

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

const upload = multer({ storage });

// Route for uploading CSV files and inserting data into MongoDB
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const results = [];
  const filePath = path.join(__dirname, 'uploads', req.file.filename);

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      // Assuming CSV contains columns: name, age, grade
      results.push({
        name: data.name,
        age: parseInt(data.age),
        grade: data.grade,
      });
    })
    .on('end', async () => {
      try {
        // Insert parsed data into MongoDB
        await Student.insertMany(results);
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
});

// Import Routes
const studentsRoute = require('./routes/students');
app.use('/students', studentsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
