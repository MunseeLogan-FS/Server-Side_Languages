const router = require("express").Router();
const {
  createVillain,
  getAllVillains,
  updateVillain,
  deleteVillain,
  getVillainById,
} = require("../controller/villainController");

router.get("/", getAllVillains);

router.post("/", createVillain);

router.get("/:id", getVillainById);

router.put("/:id", updateVillain);

router.delete("/:id", deleteVillain);

module.exports = router;
