const express = require("express");
const router = express.Router();
const heroRoutes = require("./heroRoutes");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: `${req.method} - Request made`,
    availableRoutes: ["/heroes", "/villains"],
  });
});

router.use("/heroes", heroRoutes);

module.exports = router;
