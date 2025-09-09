const {
  getCH4GWPData,
  getData,
  getInfo,
  getMetadata,
  getHundredYearGWPS,
  getRegionClassification,
  getSectorClassification,
  getEmissionFactors
} = require("../services/carbonDataServices");

const getCH4GWPDataController = async (req, res) => {
  try {
    const results = await getCH4GWPData();

    if (!results)
      return res.status(200).json({
        message: "No resources found!",
      });

    return res.status(200).json({
      message: "Success",
      data: results,
    });
  } catch (error) {
    throw Error(error.message);
  }
};

const getDataController = async (req, res) => {
  try {
    const results = await getData();

    if (!results)
      return res.status(200).json({
        message: "No data found!",
      });

    return res.status(200).json({
      message: "Success",
      data: results,
    });
  } catch (error) {
    console.error(error.message);
  }
};

const getInfoController = async (req, res) => {
  try {
    const results = await getInfo();
    if (!results)
      return res.status(200).json({
        message: "No data found!",
      });

    return res.status(200).json({
      message: "Success",
      data: results,
    });
  } catch (error) {
    throw Error(error.message);
  }
};

const getMetadataController = async (req, res) => {
  try {
    const results = await getMetadata();
    if (!results)
      return res.status(200).json({
        message: "No data found!",
      });

    return res.status(200).json({
      message: "Success",
      data: results,
    });
  } catch (error) {
    throw Error(error.message);
  }
};

const getHundredYearGWPSController = async (req, res) => {
  try {
    const results = await getHundredYearGWPS();
    if (!results)
      return res.status(200).json({
        message: "No data found!",
      });

    return res.status(200).json({
      message: "Success",
      data: results,
    });
  } catch (error) {
    throw Error(error.message);
  }
};

const getRegionClassificationController = async (req, res) => {
  try {
    const results = await getRegionClassification();
    if (!results)
      return res.status(200).json({
        message: "No data found!",
      });

    return res.status(200).json({
      message: "Success",
      data: results,
    });
  } catch (error) {
    throw Error(error.message);
  }
};

const getSectorClassificationController = async (req, res) => {
  try { 
    const argFields = ["fossil_bio", "sector_title", "description", "subsector_title"]
    const results = await getSectorClassification({argFields});
    if (!results)
      return res.status(200).json({
        message: "No data found!",
      });

    return res.status(200).json({
      message: "Success",
      data: results,
    });
  } catch (error) {
    throw Error(error.message);
  }
}; 

const getEmissionFactorsController = async (req, res) => { 
  try {
      const results = await getEmissionFactors()
      if(!results)
      return res.status(200).json({
        message: "No data found!",
      });

    return res.status(200).json({
      message: "Success",
      data: results,
    });
  } catch (error) {
    throw Error(error.message);
  }
}

module.exports = {
  getCH4GWPDataController,
  getDataController,
  getInfoController,
  getMetadataController,
  getHundredYearGWPSController,
  getRegionClassificationController,
  getSectorClassificationController,
  getEmissionFactorsController
};
