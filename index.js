const express = require("express");
const bodyParser = require("body-parser");
const downloaderRoutes = require("./routes/downloaderRoutes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rute utama
app.use("/api", downloaderRoutes);
app.get("/", (req, res) => {
  res.json({
    status: true,
    data: {
      message: "make rest-api with nodejs | express",
    },
    endpoints: ["/api/tiktokdl", "/api/igdl", "/api/igstory", "/api/fbdl"],
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
