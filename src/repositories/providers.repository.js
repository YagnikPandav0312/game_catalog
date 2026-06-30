const pool = require("../config/db");

async function getProviders() {
  const query = `SELECT * FROM get_providers()`;
  const result = await pool.query(query);
  return result.rows;
}

async function getProviderById(game_provider_id) {
  const result = await pool.query(
    "SELECT * FROM providers WHERE provider_id = $1",
    [game_provider_id],
  );
  return result.rows[0];
}

async function createProviders(provider_name, logo) {
  const query = `SELECT * FROM create_providers($1, $2)`;
  const values = [provider_name, logo];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function updateProvider(provider_id, provider_name, logo) {
  const result = await pool.query(
    "SELECT update_providers($1, $2, $3) AS success",
    [provider_id, provider_name, logo],
  );
  return result.rows[0];
}

async function deleteProviders(provider_id) {
  const query = `SELECT delete_providers($1) AS success`;
  const result = await pool.query(query, [provider_id]);
  return result.rows[0]; // { success: true/false }
}

module.exports = {
  getProviders,
  getProviderById,
  createProviders,
  updateProvider,
  deleteProviders,
};
