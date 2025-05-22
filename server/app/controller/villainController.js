const Villains = require("../models/Villains");
const Heroes = require("../models/Heroes");
const messages = require("../utils/messages");

const getAllVillains = async (req, res) => {
  try {
    const villains = await Villains.find({})
      .populate("archNemesisId", "-__v")
      .select("-__v");
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
