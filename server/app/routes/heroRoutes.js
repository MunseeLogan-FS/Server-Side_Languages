const router = require("express").Router();
const {
  createHero,
  getAllHeroes,
  updateHero,
  deleteHero,
  getHeroById,
} = require("../controller/heroController");

router.get("/", getAllHeroes);

router.post("/", createHero);

router.get("/:id", getHeroById);

router.put("/:id", updateHero);

router.delete("/:id", deleteHero);

module.exports = router;
