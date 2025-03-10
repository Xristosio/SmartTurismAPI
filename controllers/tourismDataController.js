const populateDB = require("../services/populateDB");
const TourismData = require("../models/TourismData");

const populateDatabase = async (req, res) => {
  try {
    await populateDB();
    res.status(200).json({ message: "Database populated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllCountries = async (req, res) => {
  try {
    const countries = await TourismData.find();

    if (countries.length === 0 || countries == null) {
      return res.status(404).json({ message: "No countries found" });
    }
    res.status(200).json(countries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const { country } = req.params;

    const response = await TourismData.findOneAndDelete({ Country: country });
    if (response == null) {
      return res
        .status(404)
        .json({ message: `There is no Country named ${country}` });
    }
    res
      .status(200)
      .json({ message: `${response.Country} deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCountry = async (req, res) => {
  try {
    const { country } = req.params;
    const updatedData = req.body;
    const countryDetails = await TourismData.findOne({
      Country: country,
    });

    const updatedCountry = await TourismData.findOneAndUpdate(
      { Country: country },
      updatedData,
      { new: true }
    );

    if (!updatedCountry) {
      return res.status(404).json({ error: "Country not found" });
    }

    res.status(200).json({
      message: "Country updated successfully",
      oldData: countryDetails,
      newdata: updatedCountry,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCountry = async (req, res) => {
  try {
    const { Country } = req.body;
    console.log(Country);

    const existingCountry = await TourismData.findOne({ Country });
    console.log(existingCountry);
    if (existingCountry) {
      return res.status(400).json({ message: "Country already exists" });
    }

    // Validate the request body
    if (
      !Country ||
      !req.body.QualityOfLife ||
      !req.body.Adventure ||
      !req.body.Heritage ||
      !req.body.CostOfLivingIndex ||
      !req.body.RestaurantPriceIndex
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCountry = new TourismData(req.body);
    const response = await newCountry.save();

    res.status(201).json({
      message: `${response.Country} created successfully`,
      data: response,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const filterCountries = async (req, res) => {
  try {
    const { criterion, type, limit } = req.query;

    // Validate the criterion
    const validCriteria = [
      "CostOfLivingIndex",
      "RestaurantPriceIndex",
      "QualityOfLife",
      "Adventure",
      "Heritage",
    ];
    if (!validCriteria.includes(criterion)) {
      return res.status(400).json({ message: "Invalid criterion" });
    }

    // Define the sort order
    let sortOrder = 1; // Default to ascending
    if (type === "highest") {
      sortOrder = -1; // Descending for highest
    }

    // Build the query to exclude documents where the criterion field is null
    const query = TourismData.find({ [criterion]: { $ne: null } }).sort({
      [criterion]: sortOrder,
    });
    // Apply limit if provided
    if (limit) {
      query.limit(parseInt(limit));
    }

    // Execute the query
    const filteredCountries = await query.exec();

    // Return the results
    res.status(200).json({
      message: "Countries filtered successfully",
      data: filteredCountries,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
