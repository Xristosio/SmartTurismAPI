const fs = require("fs");
const path = require("path");
const TourismData = require("../models/TourismData");

const populateDB = async () => {
  try {
    // Read the JSON file
    const filePath = path.join(__dirname, "../data/tourismData.json");
    const data = fs.readFileSync(filePath, "utf8");
    const tourismData = JSON.parse(data);

    // Transform data to match the schema
    const transformedData = tourismData.map((item) => ({
      Country: item.Country,
      QualityOfLife: item["Quality of Life"],
      Adventure: item.Adventure,
      Heritage: item.Heritage,
      CostOfLivingIndex: item["Cost of Living Index"],
      RestaurantPriceIndex: item["Restaurant Price Index"],
    }));

    // Insert data into MongoDB
    await TourismData.insertMany(transformedData);
    console.log("Database populated successfully");
  } catch (err) {
    console.error("Error populating database:", err);
  }
};

module.exports = populateDB;
