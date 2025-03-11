const TourismData = require("../models/TourismData");

const getAllCountries = async () => {
  try {
    const countries = await TourismData.find();
    if (countries.length === 0) {
      return { success: false, message: "No countries found" };
    }
    return { success: true, data: countries };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

/**
 * @param {String} Countryname to search.
 */
const deleteCountry = async (country) => {
  try {
    const response = await TourismData.findOneAndDelete({ Country: country });
    if (!response) {
      return { success: false, message: `Country named ${country} not found` };
    }
    return { success: true, data: response };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

/**
 * @param {String} Countryname to search.
 * @param {Object} updatedData given to call body.
 */
const updateCountry = async (country, updatedData) => {
  try {
    const countryDetails = await TourismData.findOne({ Country: country });
    if (!countryDetails) {
      return { success: false, message: `Country named ${country} not found` };
    }

    const updatedCountry = await TourismData.findOneAndUpdate(
      { Country: country },
      updatedData,
      { new: true }
    );

    return { success: true, oldData: countryDetails, newData: updatedCountry };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

/**
 * @param {Object} countryData the necessary fields to create a country.
 */
const createCountry = async (countryData) => {
  try {
    const { Country } = countryData;

    const existingCountry = await TourismData.findOne({
      Country: { $regex: new RegExp(`^${Country}$`, "i") },
    });

    if (existingCountry) {
      return { success: false, message: "Country already exists" };
    }

    const newCountry = new TourismData(countryData);
    const response = await newCountry.save();
    return { success: true, data: response };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

/**
 * @param {String} criterion field to search .
 * @param {number} type highest or lowest.
 * @param {number} limit records that will return.
 */
const filterCountries = async (criterion, type, limit) => {
  try {
    const rankingFields = ["QualityOfLife", "Adventure", "Heritage"];
    const costFields = ["CostOfLivingIndex", "RestaurantPriceIndex"];

    let sortOrder;
    if (rankingFields.includes(criterion)) {
      sortOrder = type === "highest" ? 1 : -1;
    } else if (costFields.includes(criterion)) {
      sortOrder = type === "highest" ? -1 : 1;
    }

    const query = TourismData.find({ [criterion]: { $ne: null } }).sort({
      [criterion]: sortOrder,
    });

    if (limit) {
      query.limit(parseInt(limit));
    }

    const filteredCountries = await query.exec();
    return { success: true, data: filteredCountries };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

module.exports = {
  getAllCountries,
  deleteCountry,
  updateCountry,
  createCountry,
  filterCountries,
};
