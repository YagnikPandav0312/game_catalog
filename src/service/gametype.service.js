const gameTypeRepo = require("../repositories/gameType.repository");

async function getGameType() {
  return await gameTypeRepo.getGameType();
}

async function getGameTypeById(game_type_id) {
  return await gameTypeRepo.getGameTypeById(game_type_id);
}

async function createGameType(game_types_name, slug) {
  if (!game_types_name || game_types_name.trim() === "") {
    throw new Error("Game Types Name Is Required");
  }
  return await gameTypeRepo.createGameType(game_types_name, slug);
}

async function updateGameType(id, game_types_name, slug) {
  const result = await gameTypeRepo.updateGameType(id, game_types_name, slug);
  if (!result.success) {
    return null;
  }
  return result;
}

async function deleteGameType(id) {
  const result = await gameTypeRepo.deleteGameType(id);
  if (!result.success) {
    return null;
  }
  return result;
}

module.exports = {
  createGameType,
  getGameType,
  getGameTypeById,
  updateGameType,
  deleteGameType,
};
