const express = require("express");
require('dotenv').config();
const downloaderRoutes = require("./routes/downloaderRoutes");

const app = express();

// Rute utama
app.use("/api", downloaderRoutes);
app.get("/", (req, res) => {
  res.json({
    status: true,
    data: {
      message: "make rest-api with nodejs | express",
    },
    endpoints: ["/api/tiktokdl", "/api/igdl", "/api/igstory", "/api/fbdl", "/api/ytdl","/api/twtdl"],
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
