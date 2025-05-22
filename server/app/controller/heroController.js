const Heroes = require("../models/Heroes");
const Villains = require("../models/Villains");
const messages = require("../utils/messages");

const getAllHeroes = async (req, res) => {
  try {
    const heroes = await Heroes.find({}).populate("enemies").select("-__v");
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
    const hero = await Heroes.findById(id).populate("enemies").select("-__v");
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
