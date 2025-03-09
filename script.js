const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { populateDatabase } = require("./controllers/tourismDataController");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.post("/api/populate", populateDatabase);

// Start the server
const PORT = process.env.PORT_SERVICE1 || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
