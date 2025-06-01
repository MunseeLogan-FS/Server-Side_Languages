const Heroes = require("../models/Heroes");
const Villains = require("../models/Villains");
const messages = require("../utils/messages");

const getAllHeroes = async (req, res) => {
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
    // console.log("Final query:", queryObj);

    let query = Heroes.find(queryObj);

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

    if (!req.query.select || req.query.select.includes("enemies")) {
      query = query.populate("enemies", "-__v");
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    query.skip(skip).limit(limit);

    const heroes = await query;
    if (heroes.length === 0) {
      return res.status(404).json({
        success: false,
        message: messages.NOT_FOUND_ALL,
      });
    }

    res.status(200).json({
      data: heroes,
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

const getHeroById = async (req, res) => {
  const { id } = req.params;
  try {
    const hero = await Heroes.findById(id)
      .populate("enemies", "-__v")
      .select("-__v");
    if (!hero) {
      return res.status(404).json({
        success: false,
        message: messages.NOT_FOUND(id),
      });
    }
    res.status(200).json({
      data: hero,
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

const createHero = async (req, res) => {
  const { hero } = req.body;
  try {
    const newHero = await Heroes.create(hero);
    console.log("data:", newHero);
    res.status(201).json({
      data: newHero,
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
      message: messages.CREATE_ERROR || "Error creating hero",
      error: error.message,
    });
  }
};

const updateHero = async (req, res) => {
  const { id } = req.params;
  try {
    const hero = await Heroes.findByIdAndUpdate(id, req.body, { new: true });
    if (!hero) {
      return res.status(404).json({
        success: false,
        message: messages.NOT_FOUND(id),
      });
    }
    res.status(200).json({
      data: hero,
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

const deleteHero = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedHero = await Heroes.findByIdAndDelete(id);
    if (!deletedHero) {
      return res.status(404).json({
        success: false,
        message: messages.NOT_FOUND(id),
      });
    }
    res.status(200).json({
      data: deletedHero,
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
  createHero,
  getAllHeroes,
  updateHero,
  deleteHero,
  getHeroById,
};
