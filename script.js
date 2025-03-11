const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const tourismRoutes = require("./routes/tourismRoutes");
const env = require("./config");

dotenv.config();

const app = express();

// MongoDB
connectDB();

app.use(express.json());

// General routes
app.use("/api/v1/tourism", tourismRoutes);

const PORT = env.PORT_SERVICE1;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
