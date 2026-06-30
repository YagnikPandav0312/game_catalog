const gameTypeRepo = require("../repositories/gameType.repository");

async function getGameType() {
  const result = await gameTypeRepo.getGameType();
  return result;
}

async function getGameTypeById(id) {
  return await gameTypeRepo.getGameTypeById(id);
}

async function createGameType(game_types_name, slug) {
  if (!game_types_name || game_types_name.trim() === "") {
    throw new Error("Game Types Name Is Required");
  }
  const result = await gameTypeRepo.createGameType(game_types_name, slug);
  return result;
}

// async function updateGameType(id, game_types_name, slug) {
//   return await repo.updateGameType(id, game_types_name, slug);
// }

// async function deleteGameType(id) {
//   return await repo.deleteGameType(id);
// }

module.exports = {
  createGameType,
  getGameType,
  getGameTypeById,
  // updateGameType,
  // deleteGameType,
};
