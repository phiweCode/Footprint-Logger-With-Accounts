const express = require("express");
const router = express.Router();
const {
  getCH4GWPDataController,
  getDataController,
  getInfoController,
  getMetadataController,
  getHundredYearGWPSController,
  getRegionClassificationController,
  getSectorClassificationController,
  getEmissionFactorsController
} = require("../controllers/carbonDataControllers");

router.get("/ch4_gwps", getCH4GWPDataController);
router.get("/data", getDataController);
router.get("/info", getInfoController);
router.get("/metadata", getMetadataController);
router.get("/hundred_yr_gwps", getHundredYearGWPSController);
router.get("/region_classification", getRegionClassificationController);
router.get("/sector_classification", getSectorClassificationController);
router.get("/emission_factors", getEmissionFactorsController)

module.exports = router;
