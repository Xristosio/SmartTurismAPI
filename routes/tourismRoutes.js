const express = require("express");
const router = express.Router();
const {
  populateDatabase,
  getAllCountries,
  deleteCountry,
  updateCountry,
  createCountry,
  filterCountries,
} = require("../controllers/tourismDataController");

// Routes
router.post("/populate", populateDatabase);
router.get("/getAllCountries", getAllCountries);
router.delete("/delete/:country", deleteCountry);
router.put("/update/:country", updateCountry);
router.post("/create", createCountry);
router.get("/filter", filterCountries);

module.exports = router;
