const pool = require("../config/db");

async function getProviders() {
  const query = `SELECT * FROM get_providers()`;
  const result = await pool.query(query);
  return result.rows;
}

async function getProviderById(game_provider_id) {
  const query = `SELECT * FROM get_provider_by_id($1)`;
  const values = [game_provider_id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function createProviders(provider_name, slug, logo) {
  const query = `SELECT * FROM create_providers($1, $2, $3)`;
  const values = [provider_name, slug, logo];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function updateProvider(provider_id, provider_name, slug, logo) {
  const query = `SELECT * FROM update_providers($1, $2, $3, $4) AS success`;
  const values = [provider_id, provider_name, slug, logo];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function deleteProviders(provider_id) {
  const query = `SELECT delete_providers($1) AS success`;
  const values = [provider_id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  getProviders,
  getProviderById,
  createProviders,
  updateProvider,
  deleteProviders,
};
