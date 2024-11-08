const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, Volontarion project!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});