const express = require("express");
const router = express.Router();
const geoRoutes = require("./geoRoutes");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: `${req.method} - Request made`,
    availableRoutes: ["/heroes", "/villains"],
  });
});
//localhost:3000/api/v1/geo-data/
router.use("/geo-data", geoRoutes);

module.exports = router;
