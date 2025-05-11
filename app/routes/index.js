const express = require("express");
const router = express.Router();
const authorsRoute = require("../routes/authors");

// localhost:3000/api/v1
router.get("/", (req, res) => {
  res.status(200).json({
    message: "This is the API v1",
    success: true,
  });
});

// localhost:3000/api/v1/authors
router.use("/authors", authorsRoute);

module.exports = router;
