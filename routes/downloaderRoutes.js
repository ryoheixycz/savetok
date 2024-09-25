const express = require('express');
const router = express.Router();
const downloaderController = require('../controllers/downloaderController');

// Rute untuk mendownload video TikTok menggunakan metode GET
router.get('/tiktok', downloaderController.downloadTikTokVideo);

module.exports = router;
