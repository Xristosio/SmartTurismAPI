// controllers/tourismDataController.js
const populateDB = require("../services/populateDB");

const populateDatabase = async (req, res) => {
  try {
    await populateDB();
    res.status(200).json({ message: "Database populated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { populateDatabase };
