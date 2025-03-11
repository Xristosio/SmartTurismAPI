const express = require("express");
const { body, query, param } = require("express-validator");
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

router.get(
  "/filter",
  [
    query("criterion")
      .notEmpty()
      .withMessage("Criterion is required")
      .isIn([
        "CostOfLivingIndex",
        "RestaurantPriceIndex",
        "QualityOfLife",
        "Adventure",
        "Heritage",
      ])
      .withMessage("Invalid criterion"),
    query("type")
      .optional()
      .isIn(["highest", "lowest"])
      .withMessage("Type must be 'highest' or 'lowest'"),
    query("limit")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Limit must be a positive integer"),
  ],
  filterCountries
);

router.put(
  "/update/:country",
  [
    param("country")
      .notEmpty()
      .withMessage("Country name is required")
      .trim()
      .escape(),
    body("QualityOfLife").optional().isNumeric(),
    body("Adventure").optional().isNumeric(),
    body("Heritage").optional().isNumeric(),
    body("CostOfLivingIndex").optional().isNumeric(),
    body("RestaurantPriceIndex").optional().isNumeric(),
  ],
  updateCountry
);

router.delete(
  "/delete/:country",
  [
    param("country")
      .notEmpty()
      .withMessage("Country name is required")
      .trim()
      .escape(),
  ],
  deleteCountry
);

router.post(
  "/create",
  [
    body("Country").notEmpty().withMessage("Country is required"),
    body("QualityOfLife")
      .isNumeric()
      .withMessage("QualityOfLife must be a number"),
    body("Adventure").isNumeric().withMessage("Adventure must be a number"),
    body("Heritage").isNumeric().withMessage("Heritage must be a number"),
    body("CostOfLivingIndex")
      .isNumeric()
      .withMessage("CostOfLivingIndex must be a number"),
    body("RestaurantPriceIndex")
      .isNumeric()
      .withMessage("RestaurantPriceIndex must be a number"),
  ],
  createCountry
);

module.exports = router;
