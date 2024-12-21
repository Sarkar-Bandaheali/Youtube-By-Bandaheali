import express from "express";
import fetch from "node-fetch";
import path from "path";

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static("public"));

// API Proxy
app.get("/api/search", async (req, res) => {
  const { text } = req.query;
  if (!text) return res.status(400).json({ error: "Missing search text" });

  try {
    const apiResponse = await fetch(`https://www.dark-yasiya-api.site/search/yt?text=${encodeURIComponent(text)}`);
    const apiData = await apiResponse.json();
    res.json(apiData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from API" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
