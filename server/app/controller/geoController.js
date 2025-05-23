const Heroes = require("../models/GeoData");
const messages = require("../utils/messages");
const { getGeoData } = require("../utils/fetchFunc");
const GeoData = require("../models/GeoData");

//if you think you are not getting the correct data, check the the lat and lon that the api returned.
// the api may change the lat and lon that you send
//This function checks for saved data in the database and if it is not found, it fetches the data from the API.
const getALLgeoData = async (req, res) => {
  try {
    const query = req.query;
    const { lat, lon } = query;
    const oldData = await GeoData.find(query);
    console.log(oldData);
    if (oldData.length > 0) {
      return res.status(200).json({
        data: oldData,
        fromCache: true,
        success: true,
        message: messages.RETRIEVE_SUCCESS,
      });
    }

    // console.log("query:", query);
    // console.log(lat, lon);
    const geoData = await getGeoData(lat, lon);
    res.status(200).json({
      data: geoData,
      fromCache: false,
      success: true,
      message: messages.RETRIEVE_SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.RETRIEVE_ERROR,
      error: error.message,
    });
  }
};

//gets data from the database by id
const getGeoDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const geo = await GeoData.findById(id).select("-__v");
    if (!geo) {
      return res.status(404).json({
        success: false,
        message: messages.NOT_FOUND(id),
      });
    }
    res.status(200).json({
      data: geo,
      success: true,
      message: messages.RETRIEVE_SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.RETRIEVE_ERROR,
      error: error.message,
    });
  }
};

// the api may change the lat and lon that you send
// this function fetches the data from the API and saves the data to the database.
const createGeoData = async (req, res) => {
  try {
    const query = req.query;

    const { lat, lon } = query;
    console.log("query:", query);
    const geoData = await getGeoData(lat, lon);
    const newGeo = await GeoData.create(geoData);

    res.status(201).json({
      data: newGeo,
      success: true,
      message: messages.CREATE_SUCCESS,
    });
  } catch (error) {
    console.log("error:", error);
    if (error.name === "ValidationError") {
      return res.status(422).json({
        success: false,
        message: messages.VALIDATION_ERROR,
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: messages.CREATE_ERROR,
      error: error.message,
    });
  }
};

// this function updates the data in the database by id
const updateGeoData = async (req, res) => {
  const { id } = req.params;
  try {
    const geo = await GeoData.findByIdAndUpdate(id, req.body, { new: true });
    if (!geo) {
      return res.status(404).json({
        success: false,
        message: messages.NOT_FOUND(id),
      });
    }
    res.status(200).json({
      data: geo,
      success: true,
      message: messages.UPDATE_SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.UPDATE_ERROR(id),
      error: error.message,
    });
  }
};
// this function deletes the data in the database by id
const deleteGeoData = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGeo = await GeoData.findByIdAndDelete(id);
    if (!deletedGeo) {
      return res.status(404).json({
        success: false,
        message: messages.NOT_FOUND(id),
      });
    }
    res.status(200).json({
      data: deletedGeo,
      success: true,
      message: messages.DELETE_SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.DELETE_ERROR(id),
      error: error.message,
    });
  }
};

module.exports = {
  getALLgeoData,
  getGeoDataById,
  createGeoData,
  updateGeoData,
  deleteGeoData,
};
