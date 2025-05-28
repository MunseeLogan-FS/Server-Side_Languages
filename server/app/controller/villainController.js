const Villains = require("../models/Villains");
const Heroes = require("../models/Heroes");
const messages = require("../utils/messages");

const getAllVillains = async (req, res) => {
  try {
    const excludeFields = ["sort", "page", "limit", "select"];
    const queryObj = {};

    Object.keys(req.query).forEach((key) => {
      if (excludeFields.includes(key)) return;
      const match = key.match(/^([^[]+)(?:\[(gt|gte|lt|lte|eq|ne)\])?$/);
      if (match) {
        const field = match[1];
        const operator = match[2];

        if (operator) {
          queryObj[field] = queryObj[field] || {};
          queryObj[field][`$${operator}`] = req.query[key];
        } else {
          queryObj[key] = req.query[key];
        }
        console.log(queryObj);
      }
    });

    let query = Villains.find(queryObj);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("name");
    }
    if (req.query.select) {
      let selectFields = req.query.select.split(",").join(" ");
      if (!selectFields.includes("_id")) {
        selectFields += " -_id";
      }
      query = query.select(selectFields);
    } else {
      query = query.select("-__v");
    }

    if (!req.query.select || req.query.select.includes("archNemesisId")) {
      query = query.populate("archNemesisId", "-__v");
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    query.skip(skip).limit(limit);

    const villains = await query;

    if (villains.length === 0) {
      return res.status(404).json({
        success: false,
        message: messages.NOT_FOUND_ALL,
      });
    }

    res.status(200).json({
      data: villains,
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

const getVillainById = async (req, res) => {
  const { id } = req.params;
  try {
    const villain = await Villains.findById(id)
      .populate("archNemesisId", "-__v")
      .select("-__v");
    if (!villain) {
      return res.status(404).json({
        success: false,
        message: messages.NOT_FOUND(id),
      });
    }
    res.status(200).json({
      data: villain,
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

const createVillain = async (req, res) => {
  try {
    const { villain } = req.body;

    const hero = await Heroes.findById(villain.archNemesisId);
    if (!hero) {
      return res.status(404).json({
        success: false,
        message: messages.NOT_FOUND(villain.archNemesisId),
      });
    }

    villain.archNemesisId = hero._id;
    const newVillain = new Villains(villain);
    hero.enemies.push(newVillain._id);

    await Promise.all([newVillain.save(), hero.save()]);

    res.status(201).json({
      data: newVillain,
      success: true,
      message: messages.CREATE_SUCCESS,
    });
  } catch (error) {
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

const updateVillain = async (req, res) => {
  const { id } = req.params;
  try {
    const villain = await Villains.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!villain) {
      return res.status(404).json({
        success: false,
        message: messages.NOT_FOUND(id),
      });
    }
    res.status(200).json({
      data: villain,
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

const deleteVillain = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVillain = await Villains.findByIdAndDelete(id);
    res.status(200).json({
      data: deletedVillain,
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
  createVillain,
  getAllVillains,
  updateVillain,
  deleteVillain,
  getVillainById,
};
