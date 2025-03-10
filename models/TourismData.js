const mongoose = require("mongoose");

const tourismDataSchema = new mongoose.Schema({
  Country: { type: String, required: true },
  QualityOfLife: { type: Number, default: null },
  Adventure: { type: Number, default: null },
  Heritage: { type: Number, default: null },
  CostOfLivingIndex: { type: Number, default: null },
  RestaurantPriceIndex: { type: Number, default: null },
});

module.exports = mongoose.model("TourismData", tourismDataSchema);
