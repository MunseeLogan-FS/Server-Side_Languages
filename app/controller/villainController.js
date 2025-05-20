const Villains = require("../models/Villains");

const getAllVillains = async (req, res) => {
  try {
    const villains = await Villains.find({});
    res.status(200).json({
      data: villains,
      success: true,
      message: `${req.method} - request to villains endpoint`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving villains",
      error: error.message,
    });
  }
};

const getVillainById = async (req, res) => {
  const { id } = req.params;
  try {
    const villain = await Villains.findById(id);
    if (!villain) {
      return res.status(404).json({
        success: false,
        message: `Villain with id: ${id} not found`,
      });
    }
    res.status(200).json({
      data: villain,
      success: true,
      message: `${req.method} - request to villains id: ${id}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving villain",
      error: error.message,
    });
  }
};

const createVillain = async (req, res) => {
  const { villain } = req.body;
  try {
    const newVillain = await Villains.create(villain);
    console.log("data:", newVillain);
    res.status(201).json({
      success: true,
      message: `${req.method} - request to villains endpoint`,
    });
  } catch (error) {
    console.log("error:", error);
    if (error.name === "ValidationError") {
      return res.status(422).json({
        success: false,
        message: "Validation error",
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Error creating villain",
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
        message: `Villain with id: ${id} not found`,
      });
    }
    res.status(200).json({
      data: villain,
      success: true,
      message: `${req.method} - request to villains id:${id}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error updating villain information for id:${id}`,
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
      message: `${req.method} - request to villains id:${id}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error deleting villain for id:${id}`,
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
