// Require Express and create a router object
const express = require('express');
const router = express.Router();

const downloadController = require('../controllers/download_controller');

// Define a route on the router object
router.route('/:uuid').get(downloadController.downloadFile);

// Export the router object
module.exports = router;