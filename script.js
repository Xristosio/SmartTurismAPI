const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const tourismRoutes = require("./routes/tourismRoutes");
const env = require("./config");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/tourism", tourismRoutes);

// Start the server
const PORT = env.PORT_SERVICE1;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
