const express = require("express");
const router = express.Router();
const logger = require("../middlewares/logger.middleware");

const {
  getGameType,
  getGameTypeById,
  createGameType,
  // updateGameType,
  // deleteGameType,
} = require("../controllers/gametype.controlar");

router.get("/get_game_type", logger, getGameType);
router.get("/get_game_type_by_id", logger, getGameTypeById);
router.post("/create_game_type", logger, createGameType);
// router.put("/update_game_type/:id", logger, updateGameType);
// router.delete("/delete_game_type/:id", logger, deleteGameType);

module.exports = router;
