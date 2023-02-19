// Require Express and create a router object
const express = require('express');
const router = express.Router();

const downloadController = require('../controllers/file_download');
console.log("hello");

// Define a route on the router object
router.route('/:uuid').get(downloadController.fileDownload);

// Export the router object
module.exports = router;