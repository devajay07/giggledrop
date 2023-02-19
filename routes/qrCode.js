// Require Express and create a router object
const express = require('express');
const router = express.Router();

const qrCodeController = require('../controllers/qrCode_controller');

// Define a route on the router object
router.route('/generate').get(qrCodeController.generateQr);

// Export the router object
module.exports = router;