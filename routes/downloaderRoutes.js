const express = require("express");
const router = express.Router();
const downloaderController = require("../controllers/downloaderController");

// Rute untuk mendownload video TikTok menggunakan metode GET
router.get("/tiktokdl", downloaderController.downloadTikTokVideo);
router.get("/igdl", downloaderController.downloadInstagramPost);
router.get("/igstory", downloaderController.downloadInstagramStory);
router.get("/fbdl", downloaderController.downloadFacebookPost);

module.exports = router;
