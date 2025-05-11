const express = require("express");
const router = express.Router();

const authors = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
  },
  {
    id: 2,
    name: "Jane Doe",
    age: 25,
  },
];

// localhost:3000/api/v1/authors
router.get("/", (req, res) => {
  res.status(200).json({
    message: "This is the API v1 authors",
    success: true,
    data: authors,
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  //find an object by id
  const author = authors.find((author) => author.id == id);
  res.status(200).json({
    message: "This is the API v1 authors",
    success: true,
    data: author,
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const { author } = req.body;
  //make an id for the author
  authors.push({ id: authors.length + 1, ...author });
  console.log("author", author);

  res.status(200).json({
    message: "This is the create API v1 authors post",
    success: true,
    data: authors[authors.length - 1],
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  //find an object by id and update it
  authors.splice(id - 1, 1, {
    id: parseInt(id),
    ...req.body.author,
  });

  res.status(200).json({
    message: "This is the API v1 authors PUT",
    success: true,
    data: authors[id - 1],
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  //find an object by id and remove it for the array
  authors.splice(id - 1, 1);
  console.log(id);
  res.status(200).json({
    message: "This is the API v1 authors PUT",
    success: true,
  });
});

module.exports = router;
