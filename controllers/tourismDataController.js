const populateDB = require("../services/populateDB");
const tourismService = require("../services/tourismService");
const { validationResult } = require("express-validator");

const populateDatabase = async (req, res) => {
  try {
    await populateDB();
    res.status(200).json({ message: "Database populated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllCountries = async (req, res) => {
  const result = await tourismService.getAllCountries();
  if (!result.success) {
    return res.status(404).json({ message: result.message });
  }
  res.status(200).json({
    message: "Countries retrieved successfully",
    data: result.data,
  });
};

const deleteCountry = async (req, res) => {
  const { country } = req.params;
  const result = await tourismService.deleteCountry(country);
  if (!result.success) {
    return res.status(404).json({ message: result.message });
  }
  res.status(200).json({
    message: `${result.data.Country} deleted successfully`,
    data: result.data,
  });
};

const updateCountry = async (req, res) => {
  const { country } = req.params;
  const updatedData = req.body;
  const result = await tourismService.updateCountry(country, updatedData);
  if (!result.success) {
    return res.status(404).json({ message: result.message });
  }
  res.status(200).json({
    message: "Country updated successfully",
    oldData: result.oldData,
    newData: result.newData,
  });
};

const createCountry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const countryData = req.body;
  const result = await tourismService.createCountry(countryData);
  if (!result.success) {
    return res.status(400).json({ message: result.message });
  }
  res.status(201).json({
    message: `${result.data.Country} created successfully`,
    data: result.data,
  });
};

const filterCountries = async (req, res) => {
  const { criterion, type, limit } = req.query;
  const result = await tourismService.filterCountries(criterion, type, limit);
  if (!result.success) {
    return res.status(400).json({ message: result.message });
  }
  res.status(200).json({
    message: "Countries filtered successfully",
    data: result.data,
  });
};

// Export all controller methods
module.exports = {
  populateDatabase,
  getAllCountries,
  deleteCountry,
  updateCountry,
  createCountry,
  filterCountries,
};
