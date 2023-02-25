// Import necessary modules and files
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const dbConnect = require('./config/database');
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
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
