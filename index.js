const express = require("express");
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
    endpoints: ["/api/tiktokdl", "/api/igdl", "/api/igstory", "/api/fbdl", "/api/ytdl"],
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
