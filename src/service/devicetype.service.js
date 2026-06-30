const repo = require("../repositories/deviceType.repository");

async function getDeviceTypes() {
  return await repo.getDeviceTypes();
}

async function getDeviceTypeById(id) {
  return await repo.getDeviceTypeById(id);
}

async function createDeviceType(name, slug) {
  // if (!name || name.trim() === "") {
  //   throw new Error("Device type name is required");
  // }
  return await repo.createDeviceType(name, slug);
}

async function updateDeviceType(id, name, slug) {
  const result = await repo.updateDeviceType(id, name, slug);
  if (!result.success) {
    return null;
  }
  return result;
}

async function deleteDeviceType(id) {
  const result = await repo.deleteDeviceType(id);
  if (!result.success) {
    return null;
  }
  return result;
}

module.exports = {
  getDeviceTypes,
  getDeviceTypeById,
  createDeviceType,
  updateDeviceType,
  deleteDeviceType,
};
