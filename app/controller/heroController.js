const Heroes = require("../models/Heroes");

const getAllHeroes = async (req, res) => {
  try {
    const heroes = await Heroes.find({});
    res.status(200).json({
      data: heroes,
      success: true,
      message: `${req.method} - request to heroes endpoint`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving heroes",
      error: error.message,
    });
  }
};

const getHeroById = async (req, res) => {
  const { id } = req.params;
  try {
    const hero = await Heroes.findById(id);
    if (!hero) {
      return res.status(404).json({
        success: false,
        message: `Hero with id: ${id} not found`,
      });
    }
    res.status(200).json({
      data: hero,
      success: true,
      message: `${req.method} - request to heroes id: ${id}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving hero",
      error: error.message,
    });
  }
};

const createHero = async (req, res) => {
  const { hero } = req.body;
  try {
    const newHero = await Heroes.create(hero);
    console.log("data:", newHero);
    res.status(200).json({
      success: true,
      message: `${req.method} - request to heroes endpoint`,
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
      message: "Error creating hero",
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
        message: `Hero with id: ${id} not found`,
      });
    }
    res.status(200).json({
      data: hero,
      success: true,
      message: `${req.method} - request to heroes id:${id}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error updating hero information for id:${id}`,
      error: error.message,
    });
  }
};

const deleteHero = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteHero = await Heroes.findByIdAndDelete(id);
    res.status(200).json({
      data: deleteHero,
      success: true,
      message: `${req.method} - request to heroes id:${id}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error deleting hero for id:${id}`,
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
