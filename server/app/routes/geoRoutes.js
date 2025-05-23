const router = require("express").Router();
const {
  getALLgeoData,
  getGeoDataById,
  createGeoData,
  updateGeoData,
  deleteGeoData,
} = require("../controller/geoController");

router.get("/", getALLgeoData);

router.post("/", createGeoData);

router.get("/:id", getGeoDataById);

router.put("/:id", updateGeoData);

router.delete("/:id", deleteGeoData);

module.exports = router;
