const router = require("express").Router();
const {
  createAuthor,
  getAllAuthors,
  updateAuthor,
  deleteAuthor,
  getAuthorById,
} = require("./controller/authorController");

router.get("/", getAllAuthors);

router.post("/", createAuthor);

router.get("/:id", getAuthorById);

router.put("/:id", updateAuthor);

router.delete("/:id", deleteAuthor);

module.exports = router;
