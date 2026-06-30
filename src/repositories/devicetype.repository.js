const pool = require("../config/db");

async function getDeviceTypes() {
  const query = `SELECT * FROM get_device_types()`;
  const result = await pool.query(query);
  return result.rows;
}

async function getDeviceTypeById(id) {
  const query = `SELECT * FROM get_device_type_by_id($1)`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function createDeviceType(name, slug) {
  const query = `SELECT * FROM create_device_type($1, $2)`;
  const values = [name, slug];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function updateDeviceType(id, name, slug) {
  const query = `SELECT * FROM update_device_type($1, $2, $3) AS success`;
  const values = [id, name, slug];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function deleteDeviceType(id) {
  const query = `SELECT delete_device_type($1) AS success`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

module.exports = {
  getDeviceTypes,
  getDeviceTypeById,
  createDeviceType,
  updateDeviceType,
  deleteDeviceType,
};
