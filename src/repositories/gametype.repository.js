const pool = require("../config/db");

async function getGameType() {
  const query = `SELECT * FROM get_game_types()`;
  const result = await pool.query(query);
  return result.rows;
}

async function getGameTypeById(id) {
  const result = await pool.query("SELECT * FROM get_game_type_by_id($1)", [
    id,
  ]);
  return result.rows[0];
}

async function createGameType(game_types_name, slug) {
  const result = await pool.query("SELECT create_game_type($1, $2) AS id", [
    game_types_name,
    slug,
  ]);
  return result.rows[0];
}

// async function updateGameType(id, game_types_name, slug) {
//   const result = await pool.query(
//     "SELECT update_game_type($1, $2, $3) AS success",
//     [id, game_types_name, slug],
//   );
//   return result.rows[0];
// }

// async function deleteGameType(id) {
//   const result = await pool.query("SELECT delete_game_type($1) AS success", [
//     id,
//   ]);
//   return result.rows[0];
// }

module.exports = {
  createGameType,
  getGameType,
  getGameTypeById,
  // updateGameType,
  // deleteGameType,
};
