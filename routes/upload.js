// Require Express and create a router object
const express = require('express');
const router = express.Router();

const uploadController = require('../controllers/upload_controller')

// Define a route on the router object
router.route('/upload').post(uploadController.uploadfile);

// Export the router object
module.exports = router;
