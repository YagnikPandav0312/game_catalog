const pool = require("../config/db");

async function getGameType() {
  const query = `SELECT * FROM get_game_types()`;
  const result = await pool.query(query);
  return result.rows;
}

async function getGameTypeById(id) {
  const query = "SELECT * FROM get_game_type_by_id($1)";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function createGameType(game_types_name, slug) {
  const query = "SELECT create_game_type($1, $2) AS id";
  const values = [game_types_name, slug];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function updateGameType(id, game_types_name, slug) {
  const query = "SELECT update_game_type($1, $2, $3) AS success";
  const values = [id, game_types_name, slug];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function deleteGameType(id) {
  const query = "SELECT delete_game_type($1) AS success";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  createGameType,
  getGameType,
  getGameTypeById,
  updateGameType,
  deleteGameType,
};
