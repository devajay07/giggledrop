// Import necessary modules and files
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
require('dotenv').config();
const uploadFile = require('./routes/upload');
const downloadFile = require('./routes/download');
const fileDownload = require('./routes/file_download');
const generateQr = require('./routes/qrCode');

// Initialize Express app
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from public folder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
const dbConnect = ()=>{
    const url = process.env.DATABASE_URL.replace('<password>', process.env.DATABASE_PASSWORD);
    mongoose.set('strictQuery', false);
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, })
      .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT || 3000, () => {
       console.log(`Server running on port 3000`);
  });

      })
      .catch((error) => {
        console.error('Error connecting to MongoDB', error);
      });
}

dbConnect();

// Route for homepage
app.get('/', (req, res) => {
  res.render('index');
});

app.use('/api/files', uploadFile);
app.use('/files', downloadFile);
app.use('/files/download', fileDownload);
app.use('/qrCode', generateQr);


// Start server